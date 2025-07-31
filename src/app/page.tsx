import { Quiz } from '@/components/quiz';
import questions from '@/data/quiz-data.json';

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center">
      <Quiz questions={questions} />
    </main>
  );
}
