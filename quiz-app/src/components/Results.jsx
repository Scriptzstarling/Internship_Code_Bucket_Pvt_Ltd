import React from 'react';
import { Trophy, RotateCcw, Home, CheckCircle, XCircle } from 'lucide-react';

function Results(props) {
  const score = props.results.score;
  const totalQuestions = props.results.totalQuestions;
  const questionResults = props.results.results;

  const percentage = Math.round((score / totalQuestions) * 100);

  // Decide score color based on percentage
  function getScoreColor() {
    if (percentage >= 80) return 'text-green-600';
    else if (percentage >= 60) return 'text-yellow-600';
    else return 'text-red-600';
  }

  // Give message based on score
  function getScoreMessage() {
    if (percentage >= 80) return 'Excellent!';
    else if (percentage >= 60) return 'Good Job!';
    else return 'Keep Trying!';
  }

  return (
    <div className="min-h-screen bg-blue-100 p-4">
      <div className="max-w-3xl mx-auto">

        {/* Summary Box */}
        <div className="bg-white rounded p-6 mb-6 text-center shadow">
          <Trophy size={64} className={`mx-auto mb-4 ${getScoreColor()}`} />
          <h2 className="text-2xl font-bold text-blue-800 mb-2">Quiz Complete!</h2>
          <p className={`text-4xl font-bold mb-2 ${getScoreColor()}`}>
            {score} / {totalQuestions}
          </p>
          <p className="text-lg text-gray-600 mb-2">{getScoreMessage()}</p>
          <p className="text-gray-500">You scored {percentage}%</p>

          {/* Buttons */}
          <div className="mt-6 flex gap-3 justify-center flex-wrap">
            <button
              onClick={props.onRetake}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <RotateCcw size={18} /> Retake Quiz
            </button>

            <button
              onClick={props.onBackToTopics}
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white flex items-center gap-2"
            >
              <Home size={18} /> Back to Topics
            </button>
          </div>
        </div>

        {/* Review Answers */}
        <div className="bg-white rounded p-6 shadow">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Review Your Answers</h3>

          <div className="space-y-4">
            {questionResults.map((item, index) => {
              const selected = item.selectedAnswer;
              const correct = item.correctAnswer;
              const isCorrect = item.isCorrect;

              // Decide card color based on correct or wrong
              const cardClass = isCorrect
                ? "border-green-300 bg-green-50"
                : "border-red-300 bg-red-50";

              return (
                <div key={index} className={`p-4 rounded border ${cardClass}`}>
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle size={20} className="text-green-600 mt-1" />
                    ) : (
                      <XCircle size={20} className="text-red-600 mt-1" />
                    )}

                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">
                        Question {index + 1}: {item.question}
                      </h4>

                      {selected !== undefined ? (
                        <p className={isCorrect ? "text-green-700" : "text-red-700"}>
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
