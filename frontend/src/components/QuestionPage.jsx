import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { spaceQuizData } from '../mock';

const QuestionPage = ({ topicId, questionIndex, onBack, onNext, onPrevious }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  
  const topic = spaceQuizData.topics.find(t => t.id === topicId);
  const question = topic?.questions[questionIndex];
  const isLastQuestion = questionIndex >= topic?.questions.length - 1;
  const isFirstQuestion = questionIndex === 0;

  if (!topic || !question) {
    return <div>Question not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-container">
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="star absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={onBack}
            variant="outline" 
            className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50 hover:border-blue-400 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Topics
          </Button>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">{topic.title}</h2>
            <p className="text-blue-300">Question {questionIndex + 1} of {topic.questions.length}</p>
          </div>
          
          <div className="w-32"></div> {/* Spacer for balance */}
        </div>

        {/* Question Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700 shadow-2xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl text-white leading-relaxed mb-4">
                {question.question}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Answer Section */}
              <div className="text-center">
                <Button 
                  onClick={() => setShowAnswer(!showAnswer)}
                  className={`mb-6 px-8 py-3 text-lg font-semibold transition-all duration-300 ${
                    showAnswer 
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500'
                  }`}
                >
                  {showAnswer ? (
                    <>
                      <EyeOff className="w-5 h-5 mr-2" />
                      Hide Answer
                    </>
                  ) : (
                    <>
                      <Eye className="w-5 h-5 mr-2" />
                      Show Answer
                    </>
                  )}
                </Button>

                {showAnswer && (
                  <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border border-green-700/50 rounded-lg p-6 animate-fadeIn">
                    <h3 className="text-xl font-semibold text-green-300 mb-2">Answer:</h3>
                    <p className="text-2xl text-white font-medium">{question.answer}</p>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-8">
                <Button 
                  onClick={onPrevious}
                  disabled={isFirstQuestion}
                  variant="outline"
                  className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <div className="flex space-x-2">
                  {topic.questions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === questionIndex 
                          ? 'bg-blue-400 scale-125' 
                          : 'bg-slate-600'
                      }`}
                    />
                  ))}
                </div>

                <Button 
                  onClick={onNext}
                  disabled={isLastQuestion}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {isLastQuestion ? 'Complete' : 'Next'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default QuestionPage;