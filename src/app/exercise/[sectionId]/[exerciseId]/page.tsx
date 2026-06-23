'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import { sections } from '../../../../data/exercises';
import { useExercise } from '../../../../hooks/useExercise';
import { useProgress } from '../../../../hooks/useProgress';

import Sidebar from '../../../../components/layout/Sidebar';
import Header from '../../../../components/layout/Header';
import BottomBar from '../../../../components/layout/BottomBar';

import InstructionCard from '../../../../components/exercise/InstructionCard';
import CodeEditor from '../../../../components/exercise/CodeEditor';
import MarkdownPreview from '../../../../components/exercise/MarkdownPreview';
import SuccessBanner from '../../../../components/exercise/SuccessBanner';
import ErrorBanner from '../../../../components/exercise/ErrorBanner';
import HintCard from '../../../../components/exercise/HintCard';

interface PageProps {
  params: Promise<{
    sectionId: string;
    exerciseId: string;
  }>;
}

export default function ExercisePage({ params }: PageProps) {
  const router = useRouter();
  
  // Desempaquetar los parámetros dinámicos
  const { sectionId, exerciseId } = use(params);

  // Buscar sección y ejercicio activos
  const currentSection = sections.find((s) => s.id === sectionId);
  const currentExercise = currentSection?.exercises.find((e) => e.id === exerciseId);

  // Generar lista plana de ejercicios para navegación
  const allExercises = sections.flatMap((s) =>
    s.exercises.map((e) => ({
      ...e,
      sectionId: s.id,
      sectionTitle: s.title,
    }))
  );

  const currentIndex = allExercises.findIndex((e) => e.id === exerciseId);
  const totalCount = allExercises.length;
  const currentFlatExercise = allExercises[currentIndex];

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < totalCount - 1;

  const prevExercise = hasPrev ? allExercises[currentIndex - 1] : null;
  const nextExercise = hasNext ? allExercises[currentIndex + 1] : null;

  // Cargar estado de progreso
  const { completedExercises, streak, xp } = useProgress();

  // Inicializar hook del ejercicio
  const {
    currentCode,
    setCurrentCode,
    status,
    attempts,
    showHint,
    setShowHint,
    feedback,
    detailedError,
    verify,
    resetExercise,
  } = useExercise(currentExercise || allExercises[0]);

  // Si el ejercicio no existe, redirigir
  if (!currentExercise || !currentSection) {
    router.push('/exercise/encabezados/encabezados-1');
    return null;
  }

  // Manejo de navegación
  const handlePrev = () => {
    if (prevExercise) {
      router.push(`/exercise/${prevExercise.sectionId}/${prevExercise.id}`);
    }
  };

  const handleNext = () => {
    if (nextExercise) {
      router.push(`/exercise/${nextExercise.sectionId}/${nextExercise.id}`);
    }
  };

  // Función para ejecutar la validación
  const handleVerify = () => {
    const userHtml = document.getElementById('user-preview')?.innerHTML || '';
    const expectedHtml = document.getElementById('expected-preview')?.innerHTML || '';
    verify(userHtml, expectedHtml);
  };

  return (
    <div className="h-screen overflow-hidden flex bg-[#0D1117] text-[#E6EDF3] font-sans selection:bg-[#4A90D9] selection:text-white">
      {/* Sidebar de navegación */}
      <Sidebar />

      {/* Área de contenido principal */}
      <main className="flex-grow flex flex-col h-full relative min-w-0">
        {/* Header superior */}
        {/* <Header
          sectionTitle={currentSection.title}
          exerciseTitle={currentExercise.title}
          currentIndex={currentIndex + 1}
          totalIndex={totalCount}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={hasPrev}
          hasNext={hasNext}
        /> */}

        {/* Contenido dinámico */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar pb-24">
          <div className="max-w-5xl mx-auto space-y-6">
            {status === 'success' ? (
              /* Pantalla de Éxito */
              <SuccessBanner
                exerciseTitle={currentExercise.title}
                xp={currentExercise.xp}
                completedCount={completedExercises.length}
                totalCount={totalCount}
                streak={streak}
                userCode={currentCode}
                explanation={currentExercise.explanation}
              />
            ) : (
              /* Pantalla de Edición / Error */
              <>
                {/* Tarjeta de Instrucciones */}
                <InstructionCard
                  title={currentExercise.title}
                  instructions={currentExercise.instructions}
                  hasHint={!!currentExercise.hint}
                  onToggleHint={() => setShowHint(!showHint)}
                  showHint={showHint}
                />

                {/* Banner de error */}
                {status === 'error' && (
                  <ErrorBanner
                    feedback={feedback}
                    detailedError={detailedError}
                    userCode={currentCode}
                  />
                )}

                {/* Editor y Vista Previa split */}
                <div className="flex flex-col md:flex-row gap-6 min-h-[380px] h-[calc(100vh-380px)] md:h-[450px]">
                  <CodeEditor
                    code={currentCode}
                    onChange={setCurrentCode}
                    status={status}
                    errorMessage={feedback}
                    isGfm={currentSection.spec === 'gfm'}
                  />
                  <MarkdownPreview
                    code={currentCode}
                    status={status}
                    isGfm={currentSection.spec === 'gfm'}
                  />
                </div>

                {/* Tarjeta de pista — se monta aquí pero se renderiza como portal mediante position:fixed */}
                {showHint && currentExercise.hint && (
                  <HintCard
                    hint={currentExercise.hint}
                    expectedSyntax={currentExercise.expectedOutput}
                    attempts={attempts}
                    onClose={() => setShowHint(false)}
                  />
                )}
              </>
            )}
          </div>
        </div>

        {/* Hidden preview to render the expected markdown for DOM comparison */}
        <div style={{ display: 'none' }} id="expected-preview">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {currentExercise.expectedOutput || ' '}
          </ReactMarkdown>
        </div>

        {/* Bottom bar de acciones */}
        <BottomBar
          status={status}
          onVerify={handleVerify}
          onNext={handleNext}
          onPrev={handlePrev}
          onReset={resetExercise}
          nextExerciseTitle={nextExercise?.title}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      </main>
    </div>
  );
}
