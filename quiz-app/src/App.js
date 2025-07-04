import React, { useState, useEffect } from 'react';
import TopicSelection from './components/TopicSelection';
import Quiz from './components/Quiz';


function App() {
  // Keep track of which screen is being shown
  const [currentView, setCurrentView] = useState('topics');

  // Store the selected topic when user picks one
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Store quiz result after finishing the quiz
  const [quizResults, setQuizResults] = useState(null);

  // All topic data
  const [topics, setTopics] = useState([]);

  // Load quiz data once when app starts
  useEffect(() => {
    const loadTopics = async () => {
      try {
        // Simulate fetching data (could be an API)
        await new Promise((resolve) => setTimeout(resolve, 500));
        setTopics(quizData.topics);
      } catch (err) {
        console.error("Error loading quiz data:", err);
      }
    };

    loadTopics();
  }, []);

  // When user selects a topic
  function handleTopicSelect(topic) {
    setSelectedTopic(topic);
    setCurrentView('quiz');
  }

  // When user finishes quiz
  function handleQuizComplete(results) {
    setQuizResults(results);
    setCurrentView('results');
  }

  // When user clicks "Retake"
  function handleRetakeQuiz() {
    setCurrentView('quiz');
    setQuizResults(null);
  }

  // When user wants to go back to topic list
  function handleBackToTopics() {
    setCurrentView('topics');
    setSelectedTopic(null);
    setQuizResults(null);
  }

  // Show the screen based on currentView state
  function renderCurrentView() {
    if (currentView === 'topics') {
      return (
        <TopicSelection
          topics={topics}
          onSelectTopic={handleTopicSelect}
        />
      );
    } else if (currentView === 'quiz') {
      return (
        <Quiz
          topic={selectedTopic}
          onComplete={handleQuizComplete}
          onBack={handleBackToTopics}
        />
      );
    } else if (currentView === 'results') {
      return (
        <Results
          results={quizResults}
          onRetake={handleRetakeQuiz}
          onBackToTopics={handleBackToTopics}
        />
      );
    } else {
      // Just in case no view is set
      return (
        <TopicSelection
          topics={topics}
          onSelectTopic={handleTopicSelect}
        />
      );
    }
  }

  // App main return
  return (
    <div className="App">
      {renderCurrentView()}
    </div>
  );
}

export default App;

