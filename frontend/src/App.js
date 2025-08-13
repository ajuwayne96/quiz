import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopicsPage from "./components/TopicsPage";
import QuestionPage from "./components/QuestionPage";
import { Toaster } from "./components/ui/toaster";

function App() {
  const [currentView, setCurrentView] = useState('topics');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleTopicSelect = (topicId) => {
    setSelectedTopic(topicId);
    setCurrentQuestionIndex(0);
    setCurrentView('question');
  };

  const handleBackToTopics = () => {
    setCurrentView('topics');
    setSelectedTopic(null);
    setCurrentQuestionIndex(0);
  };

  const handleNextQuestion = () => {
    const topic = require('./mock').spaceQuizData.topics.find(t => t.id === selectedTopic);
    if (currentQuestionIndex < topic.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed, go back to topics
      handleBackToTopics();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            currentView === 'topics' ? (
              <TopicsPage onTopicSelect={handleTopicSelect} />
            ) : (
              <QuestionPage 
                topicId={selectedTopic}
                questionIndex={currentQuestionIndex}
                onBack={handleBackToTopics}
                onNext={handleNextQuestion}
                onPrevious={handlePreviousQuestion}
              />
            )
          } />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;