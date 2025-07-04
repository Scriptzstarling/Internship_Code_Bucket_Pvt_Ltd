import React from "react";
import { Clock, Trophy, Users } from "lucide-react";

function TopicSelection(props) {
  const topics = props.topics; // All quiz topics from parent
  const onSelectTopic = props.onSelectTopic; // Function to call when user selects a topic

  return (
    <div className="min-h-screen bg-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-700 mb-2">Quiz Master</h1>
          <p className="text-base text-gray-700">
            Choose a topic and test your knowledge!
          </p>

          <div className="flex justify-center items-center gap-4 mt-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>10 sec per question</span>
            </div>
            <div className="flex items-center gap-1">
              <Trophy size={16} />
              <span>10 questions</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>1 student only</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic) => {
            return (
              <div
                key={topic.id}
                onClick={() => onSelectTopic(topic)} // when card is clicked.....start quiz
                className="bg-white p-4 rounded-lg shadow hover:shadow-md cursor-pointer transform hover:scale-105 transition duration-300 border hover:border-blue-400"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{topic.icon}</div>

                  <h3 className="text-lg font-semibold text-blue-700 mb-1">
                    {topic.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3">
                    {topic.questions.length} Questions
                  </p>

                  <button className="bg-blue-600 text-white text-sm px-3 py-2 rounded hover:bg-blue-700 transition">
                    Start Quiz
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TopicSelection;
