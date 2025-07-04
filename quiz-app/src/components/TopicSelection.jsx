import React from 'react';
import { Clock, Trophy, Users } from 'lucide-react';

function TopicSelection(props) {
  const topics = props.topics;
  const onSelectTopic = props.onSelectTopic;

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="max-w-4xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-800 mb-3">Quiz Master</h1>
          <p className="text-lg text-gray-600">Choose a topic and test your knowledge!</p>

          {/* Info row */}
          <div className="flex justify-center items-center gap-4 mt-5 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>10 seconds per question</span>
            </div>
            <div className="flex items-center gap-1">
              <Trophy size={16} />
              <span>10 questions</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>One student only</span>
            </div>
          </div>
        </div>

        {/* Topics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => {
            return (
              <div
                key={topic.id}
                onClick={() => onSelectTopic(topic)}
                className="bg-white p-5 rounded-lg shadow-md cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-blue-300"
              >
                <div className="text-center">
                  {/* Icon */}
                  <div className="text-3xl mb-3">{topic.icon}</div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">{topic.name}</h3>

                  {/* Question Count */}
                  <p className="text-gray-600 mb-4">{topic.questions.length} Questions</p>

                  {/* Start Button */}
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    
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
