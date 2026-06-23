import { redirect } from 'next/navigation';

export default function Home() {
  // Redirigir automáticamente al primer ejercicio
  redirect('/exercise/encabezados/encabezados-1');
}
