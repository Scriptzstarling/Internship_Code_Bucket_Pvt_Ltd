import React from 'react';
import { Trophy, RotateCcw, Home, CheckCircle, XCircle } from 'lucide-react';

function Results(props) {
  const score = props.results.score;
  const totalQuestions = props.results.totalQuestions;
  const questionResults = props.results.results;

  const percentage = Math.round((score / totalQuestions) * 100);

  function getScoreColor() {
    if (percentage >= 80) {
      return 'text-green-600';
    } else if (percentage >= 60) {
      return 'text-yellow-600';
    } else {
      return 'text-red-600';
    }
  }

  function getScoreMessage() {
    if (percentage >= 80) {
      return 'Excellent!';
    } else if (percentage >= 60) {
      return 'Good Job!';
    } else {
      return 'Keep Trying!';
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="max-w-4xl mx-auto">

        {/* Score Summary Box */}
        <div className="bg-white rounded-lg shadow p-6 mb-6 text-center">

          <Trophy size={64} className={`mx-auto mb-4 ${getScoreColor()}`} />

          <h2 className="text-2xl font-bold text-blue-800 mb-2">
            Quiz Complete!
          </h2>

          <p className={`text-5xl font-bold mb-2 ${getScoreColor()}`}>
            {score}/{totalQuestions}
          </p>

          <p className="text-xl text-gray-600 mb-2">
            {getScoreMessage()}
          </p>

          <p className="text-gray-500">
            You scored {percentage}%
          </p>

          {/* Buttons */}
          <div className="mt-6 flex gap-4 justify-center">

            <button
              onClick={props.onRetake}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700"
            >
              <RotateCcw size={20} />
              Retake Quiz
            </button>

            <button
              onClick={props.onBackToTopics}
              className="flex items-center gap-2 border-2 border-blue-600 text-blue-600 px-5 py-3 rounded hover:bg-blue-600 hover:text-white"
            >
              <Home size={20} />
              Back to Topics
            </button>

          </div>
        </div>

        {/* Answer Review Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">
            Review Your Answers
          </h3>

          <div className="space-y-4">
            {questionResults.map((item, index) => {
              const selected = item.selectedAnswer;
              const correct = item.correctAnswer;
              const isCorrect = item.isCorrect;

              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle size={20} className="text-green-600 mt-1" />
                    ) : (
                      <XCircle size={20} className="text-red-600 mt-1" />
                    )}

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Question {index + 1}: {item.question}
                      </h4>

                      {selected !== undefined ? (
                        <p className={`mb-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          Your answer: Option {String.fromCharCode(65 + selected)}
                        </p>
                      ) : (
                        <p className="text-gray-600">No answer selected</p>
                      )}

                      {!isCorrect && (
                        <p className="text-green-700">
                          Correct answer: Option {String.fromCharCode(65 + correct)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}

export default Results;
