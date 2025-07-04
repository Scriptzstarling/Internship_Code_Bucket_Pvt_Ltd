import React from 'react';
import { Trophy, RotateCcw, Home, CheckCircle, XCircle } from 'lucide-react';

function Results(props) {
  // 🧠 Get quiz data from parent component
  const score = props.results.score; // How many correct answers
  const totalQuestions = props.results.totalQuestions; // Total questions in quiz
  const questionResults = props.results.results; // All question answers (correct or wrong)

  // ✅ Calculate how much % user scored
  const percentage = Math.round((score / totalQuestions) * 100);

  // 🎨 Function to return color based on percentage
  function getScoreColor() {
    if (percentage >= 80) {
      return 'text-green-600'; // Green for high score
    } else if (percentage >= 60) {
      return 'text-yellow-600'; // Yellow for average
    } else {
      return 'text-red-600'; // Red for low score
    }
  }

  // 💬 Function to return message based on score
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
    <div className="min-h-screen bg-blue-100 p-4">
      <div className="max-w-3xl mx-auto">

        {/* 🎉 Score card area */}
        <div className="bg-white rounded p-6 mb-6 text-center shadow">

          {/* 🏆 Big trophy icon with color */}
          <Trophy size={64} className={`mx-auto mb-4 ${getScoreColor()}`} />

          {/* 📝 Heading */}
          <h2 className="text-2xl font-bold text-blue-800 mb-2">Quiz Complete!</h2>

          {/* 📊 Final score out of total */}
          <p className={`text-4xl font-bold mb-2 ${getScoreColor()}`}>
            {score} / {totalQuestions}
          </p>

          {/* 👍 Message like Excellent or Good Job */}
          <p className="text-lg text-gray-600 mb-2">{getScoreMessage()}</p>

          {/* 🧮 Show % also */}
          <p className="text-gray-500">You scored {percentage}%</p>

          {/* 🔁 Buttons to retry or go back */}
          <div className="mt-6 flex gap-3 justify-center flex-wrap">
            {/* 🔄 Retake Quiz Button */}
            <button
              onClick={props.onRetake}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <RotateCcw size={18} /> Retake Quiz
            </button>

            {/* 🏠 Back to Topics Button */}
            <button
              onClick={props.onBackToTopics}
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white flex items-center gap-2"
            >
              <Home size={18} /> Back to Topics
            </button>
          </div>
        </div>

        {/* 🔍 Review All Questions Area */}
        <div className="bg-white rounded p-6 shadow">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Review Your Answers</h3>

          {/* Go through each question result */}
          <div className="space-y-4">
            {questionResults.map((item, index) => {
              const selected = item.selectedAnswer; // what user picked
              const correct = item.correctAnswer;   // correct one
              const isCorrect = item.isCorrect;     // true or false

              // 📦 Give different color box based on answer correctness
              const cardClass = isCorrect
                ? "border-green-300 bg-green-50"
                : "border-red-300 bg-red-50";

              return (
                <div key={index} className={`p-4 rounded border ${cardClass}`}>
                  <div className="flex items-start gap-3">

                    {/* ✅ Show green tick or ❌ red cross */}
                    {isCorrect ? (
                      <CheckCircle size={20} className="text-green-600 mt-1" />
                    ) : (
                      <XCircle size={20} className="text-red-600 mt-1" />
                    )}

                    <div>
                      {/* 🔢 Show question number and text */}
                      <h4 className="font-medium text-gray-800 mb-1">
                        Question {index + 1}: {item.question}
                      </h4>

                      {/* 🧑‍🎓 Show user's selected answer */}
                      {selected !== undefined ? (
                        <p className={isCorrect ? "text-green-700" : "text-red-700"}>
                          Your answer: Option {String.fromCharCode(65 + selected)}
                        </p>
                      ) : (
                        <p className="text-gray-600">No answer selected</p>
                      )}

                      {/* ✅ If user got it wrong, show correct answer */}
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
