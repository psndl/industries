"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface QuizProps {
  questions: QuizQuestion[];
}

export function Quiz({ questions }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
  };

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  const getButtonClasses = (option: string) => {
    if (!isAnswered) {
      return 'hover:bg-accent/20';
    }
    if (option === currentQuestion.correctAnswer) {
      return 'bg-success text-success-foreground hover:bg-success/90 border-green-500';
    }
    if (option === selectedAnswer) {
      return 'bg-destructive text-destructive-foreground hover:bg-destructive/90 border-red-500';
    }
    return 'opacity-60';
  };

  return (
    <div className="w-full max-w-3xl p-4">
      <Card className="border-border/60 shadow-xl rounded-2xl">
        <CardHeader className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-headline font-bold text-primary">QuizWhiz</h1>
            <CardDescription className="text-lg">
              {currentQuestionIndex + 1} / {questions.length}
            </CardDescription>
          </div>
          <Progress value={progress} className="w-full h-2" />
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
            {currentQuestion.question}
          </CardTitle>
          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options.map((option) => (
              <Button
                key={option}
                variant="outline"
                className={cn(
                  'h-auto py-3 px-4 text-left justify-start whitespace-normal transition-all duration-200 rounded-lg text-base',
                  isAnswered ? 'cursor-not-allowed' : 'transform hover:scale-[1.02]',
                  selectedAnswer === option && !isAnswered ? 'ring-2 ring-primary' : '',
                  getButtonClasses(option)
                )}
                onClick={() => handleAnswerSelect(option)}
                disabled={isAnswered}
              >
                {option}
              </Button>
            ))}
          </div>
          {isAnswered && (
            <div className="mt-6 p-5 rounded-lg bg-secondary/70 border border-border/60 animate-in fade-in-50 duration-500">
              <h3 className="text-lg font-bold mb-2 text-primary">
                {selectedAnswer === currentQuestion.correctAnswer ? "That's Correct!" : "Not Quite..."}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between p-6 bg-secondary/30 rounded-b-2xl">
          <Button
            onClick={() => goToQuestion(currentQuestionIndex - 1)}
            disabled={currentQuestionIndex === 0}
            variant="ghost"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={() => goToQuestion(currentQuestionIndex + 1)}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next Question
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
