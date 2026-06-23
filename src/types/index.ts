export interface Exercise {
  id: string;
  sectionId: string;
  title: string;
  instructions: string;
  hint: string;
  initialCode: string;
  expectedOutput: string; // El HTML normalized esperado
  acceptedPatterns?: string[]; // Expresiones regulares (en string) para verificar sintaxis markdown específica
  forbiddenPatterns?: string[]; // Patrones prohibidos
  explanation: string;
  xp: number;
}

export interface Section {
  id: string;
  title: string;
  spec: 'commonmark' | 'gfm';
  icon: string; // Emoji o nombre de icono
  exercises: Exercise[];
}

export interface UserProgress {
  completedExercises: string[]; // List of exercise IDs
  currentStreak: number;
  totalXp: number;
  lastCompletedDate?: string;
}
