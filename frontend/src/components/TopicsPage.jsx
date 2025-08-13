import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Rocket, Satellite, Stars, Building, Zap } from 'lucide-react';
import { spaceQuizData } from '../mock';

const TopicsPage = ({ onTopicSelect }) => {
  const iconMap = {
    1: <Rocket className="w-8 h-8" />,
    2: <Satellite className="w-8 h-8" />,
    3: <Stars className="w-8 h-8" />,
    4: <Building className="w-8 h-8" />,
    5: <Zap className="w-8 h-8" />
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-container">
          {[...Array(100)].map((_, i) => (
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

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            Space Quiz Challenge
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
            Test your knowledge about space exploration, ISRO's achievements, and the future of space technology
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {spaceQuizData.topics.map((topic) => (
            <Card 
              key={topic.id} 
              className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer group"
              onClick={() => onTopicSelect(topic.id)}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                  {iconMap[topic.id]}
                </div>
                <CardTitle className="text-2xl text-white group-hover:text-blue-300 transition-colors duration-300">
                  {topic.title}
                </CardTitle>
                <CardDescription className="text-slate-300 text-base leading-relaxed">
                  {topic.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTopicSelect(topic.id);
                  }}
                >
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-slate-400 text-lg">
            Ready to explore the cosmos? Choose a topic to begin your journey!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopicsPage;