import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Clock, CheckCircle } from 'lucide-react';

function Quiz(props) {
  const topic = props.topic;
  const onComplete = props.onComplete;
  const onBack = props.onBack;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(10);
  const [showTimeWarning, setShowTimeWarning] = useState(false);

  const questions = topic.questions;
  const totalQuestions = questions.length;

  useEffect(() => {
    // Timer to update countdown
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          goToNextQuestion();
          return 10;
        }

        if (prevTime <= 3) {
          setShowTimeWarning(true);
        } else {
          setShowTimeWarning(false);
        }

        return prevTime - 1;
      });
    }, 1000);

    // Cleanup when question changes
    return () => clearInterval(interval);
  }, [currentQuestion]);

  // When user selects an answer
  function selectAnswer(index) {
    const newAnswers = {
      ...selectedAnswers,
      [currentQuestion]: index,
    };
    setSelectedAnswers(newAnswers);
  }

  // Go to next question or finish quiz
  function goToNextQuestion() {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(10);
      setShowTimeWarning(false);
    } else {
      finishQuiz();
    }
  }

  // Go to previous question
  function goToPreviousQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setTimeLeft(10);
      setShowTimeWarning(false);
    }
  }

  // Calculate results and send to parent
  function finishQuiz() {
    const results = [];

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const selected = selectedAnswers[i];
      const correct = question.correctAnswer;

      results.push({
        question: question.question,
        correctAnswer: correct,
        selectedAnswer: selected,
        isCorrect: selected === correct,
      });
    }

    const correctCount = results.filter((q) => q.isCorrect).length;

    onComplete({
      results: results,
      score: correctCount,
      totalQuestions: totalQuestions,
    });
  }

  const currentQ = questions[currentQuestion];
  const answered = selectedAnswers[currentQuestion] !== undefined;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="max-w-4xl mx-auto">

        {/* Header Box */}
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={onBack}
              className="text-blue-600 flex items-center gap-1"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <h2 className="text-xl font-bold text-blue-800">
              {topic.name} Quiz
            </h2>

            <div className="text-sm text-gray-500">
              Q {currentQuestion + 1} of {totalQuestions}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
            <div
              className="h-2 rounded-full bg-blue-600"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Timer */}
          <div className="flex justify-center mb-4">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded ${
                showTimeWarning
                  ? 'bg-red-100 text-red-600'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              <Clock size={18} />
              <span>{timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white p-6 rounded-lg shadow mb-4">
          <h3 className="text-lg font-semibold text-center mb-4">
            {currentQ.question}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQ.options.map((option, index) => {
              return (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  className={`border p-3 rounded text-left ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-blue-500 bg-blue-100 text-blue-800'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 border rounded-full flex items-center justify-center font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {selectedAnswers[currentQuestion] === index && (
                      <CheckCircle size={18} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={goToPreviousQuestion}
            disabled={currentQuestion === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              currentQuestion === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
            }`}
          >
            <ArrowLeft size={18} />
            Prev
          </button>

          {/* Dots for progress */}
          <div className="flex gap-1">
            {questions.map((q, i) => {
              return (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i === currentQuestion
                      ? 'bg-blue-600'
                      : selectedAnswers[i] !== undefined
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                ></div>
              );
            })}
          </div>

          <button
            onClick={
              currentQuestion === totalQuestions - 1
                ? finishQuiz
                : goToNextQuestion
            }
            className="flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            {currentQuestion === totalQuestions - 1 ? 'Finish' : 'Next'}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
