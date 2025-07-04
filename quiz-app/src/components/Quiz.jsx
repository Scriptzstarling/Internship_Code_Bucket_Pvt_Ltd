import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Clock, CheckCircle } from "lucide-react";

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

    return () => clearInterval(interval);
  }, [currentQuestion]);

  function selectAnswer(index) {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: index });
  }

  function goToNextQuestion() {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(10);
      setShowTimeWarning(false);
    } else {
      finishQuiz();
    }
  }

  function goToPreviousQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setTimeLeft(10);
      setShowTimeWarning(false);
    }
  }

  function finishQuiz() {
    const results = [];

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const selected = selectedAnswers[i];
      const correct = q.correctAnswer;

      results.push({
        question: q.question,
        correctAnswer: correct,
        selectedAnswer: selected,
        isCorrect: selected === correct,
      });
    }

    const score = results.filter((q) => q.isCorrect).length;

    onComplete({
      results,
      score,
      totalQuestions,
    });
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-blue-100 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded p-4 mb-4 shadow">
          <div className="flex justify-between items-center mb-3">
            <button
              onClick={onBack}
              className="text-blue-600 flex items-center gap-1 text-sm"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <h2 className="text-lg font-bold text-blue-800">
              {topic.name} Quiz
            </h2>
            <p className="text-sm text-gray-500">
              Q {currentQuestion + 1} of {totalQuestions}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="bg-blue-600 h-2 rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Timer */}
          <div className="flex justify-center mt-3">
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded text-sm ${
                showTimeWarning
                  ? "bg-red-200 text-red-700"
                  : "bg-blue-200 text-blue-800"
              }`}
            >
              <Clock size={16} />
              <span>{timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded p-4 shadow mb-4">
          <h3 className="text-base font-semibold text-center mb-3">
            {currentQ.question}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => selectAnswer(index)}
                className={`border p-3 rounded text-left transition ${
                  selectedAnswers[currentQuestion] === index
                    ? "border-blue-500 bg-blue-100 text-blue-800"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 border rounded-full flex items-center justify-center text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {selectedAnswers[currentQuestion] === index && (
                    <CheckCircle size={16} />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={goToPreviousQuestion}
            disabled={currentQuestion === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded text-sm ${
              currentQuestion === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            }`}
          >
            <ArrowLeft size={16} />
            Prev
          </button>

          <div className="flex gap-1">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i === currentQuestion
                    ? "bg-blue-600"
                    : selectedAnswers[i] !== undefined
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>

          <button
            onClick={
              currentQuestion === totalQuestions - 1
                ? finishQuiz
                : goToNextQuestion
            }
            className="flex items-center gap-2 px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            {currentQuestion === totalQuestions - 1 ? "Finis" : "Next"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
