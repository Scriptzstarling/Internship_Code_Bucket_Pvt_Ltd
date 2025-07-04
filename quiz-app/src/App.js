import React, { useState, useEffect } from 'react';
import TopicSelection from './components/TopicSelection';
import Quiz from './components/Quiz';
import Results from './components/Results';
import quizData from './data/quizData.json'

function App() {
   
  const [currentView, setCurrentView] = useState('topics');
 
  const [selectedTopic, setSelectedTopic] = useState(null);

  
  const [quizResults, setQuizResults] = useState(null);

  
  const [topics, setTopics] = useState([]);

   
  useEffect(() => {
    const loadTopics = async () => {
      try {
        //  fetching data 
        await new Promise((resolve) => setTimeout(resolve, 500));
        setTopics(quizData.topics);
      } catch (err) {
        console.error("Error loading quiz data:", err);
      }
    };

    loadTopics();
  }, []);

  //selects a topic
  function handleTopicSelect(topic) {
    setSelectedTopic(topic);
    setCurrentView('quiz');
  }

  //finishes quiz
  function handleQuizComplete(results) {
    setQuizResults(results);
    setCurrentView('results');
  }

  //clicks Retake
  function handleRetakeQuiz() {
    setCurrentView('quiz');
    setQuizResults(null);
  }

  //go back to topic list
  function handleBackToTopics() {
    setCurrentView('topics');
    setSelectedTopic(null);
    setQuizResults(null);
  }

  //screen based on currentView state
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
      
      return (
        <TopicSelection
          topics={topics}
          onSelectTopic={handleTopicSelect}
        />
      );
    }
  }

  
  return (
    <div className="App">
      {renderCurrentView()}
    </div>
  );
}

export default App;

