/*
🚀 AI-Powered EdTech Platform - Frontend Only
===============================================

Setup Instructions:
1. Place a 3D avatar model at `/public/avatar.glb` (or use a simple placeholder)
2. All dependencies are installed via npm
3. Run `npm run dev` to start the development server
4. Backend integration points marked with "// TODO: Connect backend here"

Features:
- 3D AI Teacher Avatar with Three.js
- Interactive Course Explorer (DSA in C++)
- Monaco Code Editor for Assignments  
- Real-time Chat Interface
- Progress Tracking with Charts
- Dark theme with neon accents
*/

import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Text } from "@react-three/drei";
import Editor from '@monaco-editor/react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  BookOpen, MessageCircle, Code, BarChart3, User, Play, 
  Send, Settings, CheckCircle, Star, Brain, Zap 
} from 'lucide-react';

// =====================================
// 3D AI Teacher Avatar Component
// =====================================
function Professor3D({ isTeaching, currentMessage }) {
  const AvatarModel = () => {
    // TODO: Connect backend here - Load actual 3D model
    // const { scene } = useGLTF('/avatar.glb');
    
    return (
      <group position={[0, -1, 0]}>
        {/* Placeholder 3D Avatar - Replace with actual GLB model */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.8, 1, 0.5]} />
          <meshStandardMaterial color="#8B5CF6" />
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#F3E8FF" />
        </mesh>
        {/* Animated glow effect when teaching */}
        {isTeaching && (
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[1.2, 1.4, 0.8]} />
            <meshStandardMaterial 
              color="#8B5CF6" 
              transparent 
              opacity={0.3}
              emissive="#8B5CF6"
              emissiveIntensity={0.5}
            />
          </mesh>
        )}
      </group>
    );
  };

  return (
    <div className="relative h-96 bg-gray-900 rounded-2xl overflow-hidden border border-violet-500/20">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, 10]} intensity={0.5} color="#8B5CF6" />
        <Suspense fallback={null}>
          <AvatarModel />
        </Suspense>
        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />
      </Canvas>
      
      {/* Speech Bubble Overlay */}
      <AnimatePresence>
        {isTeaching && currentMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute top-4 left-4 right-4 bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-violet-500/30"
          >
            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-violet-400 mt-1 flex-shrink-0" />
              <p className="text-gray-200 text-sm leading-relaxed">{currentMessage}</p>
            </div>
            <div className="absolute -bottom-2 left-6 w-4 h-4 bg-gray-800 border-b border-r border-violet-500/30 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// =====================================
// Navigation Component
// =====================================
function Navbar({ activeSection, setActiveSection }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'assignments', label: 'Code', icon: Code },
    { id: 'chat', label: 'AI Tutor', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-teal-400 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-teal-400 bg-clip-text text-transparent">
              EduAI
            </span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  activeSection === id
                    ? 'bg-violet-500/20 text-violet-400 shadow-lg shadow-violet-500/25'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:block text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

// =====================================
// Course Explorer Component
// =====================================
function CourseExplorer({ onStartLesson, setTeachingState }) {
  // Hardcoded course data
  const courseData = {
    title: "Data Structures & Algorithms in C++",
    description: "Master DSA fundamentals with AI-powered personalized learning",
    modules: [
      {
        id: 1,
        title: "Arrays & Strings",
        description: "Learn array manipulation, string processing, and optimization techniques",
        lessons: 8,
        difficulty: "Beginner",
        progress: 75,
        topics: ["Array Basics", "Two Pointers", "Sliding Window", "String Algorithms"]
      },
      {
        id: 2,
        title: "Linked Lists",
        description: "Master pointer manipulation and dynamic data structures",
        lessons: 6,
        difficulty: "Intermediate", 
        progress: 45,
        topics: ["Singly Linked List", "Doubly Linked List", "Cycle Detection", "Reversal"]
      },
      {
        id: 3,
        title: "Trees & Graphs",
        description: "Explore hierarchical structures and graph algorithms",
        lessons: 12,
        difficulty: "Advanced",
        progress: 20,
        topics: ["Binary Trees", "BST", "Tree Traversal", "Graph BFS/DFS"]
      }
    ]
  };

  const difficultyColors = {
    "Beginner": "from-green-500 to-teal-400",
    "Intermediate": "from-yellow-500 to-orange-400", 
    "Advanced": "from-red-500 to-pink-400"
  };

  const handleTeachMe = (module) => {
    const teachingMessage = `Let's explore ${module.title}! I'll guide you through ${module.topics[0]} with practical examples and hands-on coding exercises.`;
    setTeachingState(true, teachingMessage);
    onStartLesson(module);
  };

  return (
    <div className="space-y-6">
      {/* Course Header */}
      <div className="bg-gradient-to-br from-violet-900/40 to-teal-900/40 rounded-2xl p-6 border border-violet-500/20">
        <h2 className="text-2xl font-bold text-white mb-2">{courseData.title}</h2>
        <p className="text-gray-300 mb-4">{courseData.description}</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">4.9/5 Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-teal-400" />
            <span className="text-sm text-gray-300">26 Lessons</span>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseData.modules.map((module) => (
          <motion.div
            key={module.id}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-violet-500/50 transition-all duration-300"
          >
            {/* Module Header */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                <span className={`px-2 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${difficultyColors[module.difficulty]} text-white`}>
                  {module.difficulty}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-3">{module.description}</p>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{module.progress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${module.progress}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="bg-gradient-to-r from-violet-500 to-teal-400 h-2 rounded-full"
                  />
                </div>
              </div>

              {/* Topics */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Key Topics:</p>
                <div className="flex flex-wrap gap-2">
                  {module.topics.slice(0, 2).map((topic, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-lg">
                      {topic}
                    </span>
                  ))}
                  {module.topics.length > 2 && (
                    <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-lg">
                      +{module.topics.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => handleTeachMe(module)}
              className="w-full bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Teach Me This
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// =====================================
// Code Assignment Component  
// =====================================
function CodeAssignment() {
  const [code, setCode] = useState(`#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Write your solution here
    vector<int> arr = {1, 2, 3, 4, 5};
    
    // TODO: Implement array reversal
    
    return 0;
}`);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = async () => {
    setIsRunning(true);
    // TODO: Connect backend here - POST to /api/grade_code
    setTimeout(() => {
      setOutput(`✅ Compilation Successful!
📊 Test Cases: 8/10 Passed
⚡ Time Complexity: O(n) - Good!
💾 Space Complexity: O(1) - Excellent!

Output:
Array: [5, 4, 3, 2, 1]
Reversed successfully!

💡 Feedback: Great work! Consider edge cases like empty arrays.`);
      setIsRunning(false);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-full">
      {/* Problem Description */}
      <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-semibold text-white mb-4">Array Reversal Challenge</h3>
        <div className="space-y-4 text-gray-300">
          <p>
            <strong className="text-violet-400">Problem:</strong> Given an array of integers, 
            reverse it in-place without using extra space.
          </p>
          <div>
            <strong className="text-teal-400">Example:</strong>
            <div className="bg-gray-800 rounded-lg p-3 mt-2 font-mono text-sm">
              Input: [1, 2, 3, 4, 5]<br/>
              Output: [5, 4, 3, 2, 1]
            </div>
          </div>
          <div>
            <strong className="text-yellow-400">Constraints:</strong>
            <ul className="list-disc list-inside mt-2 text-sm space-y-1">
              <li>1 ≤ array length ≤ 10⁴</li>
              <li>-10⁹ ≤ array[i] ≤ 10⁹</li>
              <li>Must solve in O(1) extra space</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Code Editor & Output */}
      <div className="space-y-4">
        {/* Editor */}
        <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-white">C++ Editor</span>
            </div>
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 disabled:from-gray-600 disabled:to-gray-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
            >
              <Play className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
              {isRunning ? 'Running...' : 'Run Code'}
            </button>
          </div>
          <Editor
            height="300px"
            defaultLanguage="cpp"
            value={code}
            onChange={(value) => setCode(value)}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: 'on'
            }}
          />
        </div>

        {/* Output Panel */}
        {output && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-white">Execution Result</span>
            </div>
            <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">{output}</pre>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// =====================================
// Chatbot Component
// =====================================
function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi! I'm your AI tutor. I can help you understand DSA concepts, debug code, or explain algorithms. What would you like to learn today?",
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // TODO: Connect backend here - POST to /api/chat
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        sender: 'bot',
        text: "That's a great question! Let me break it down for you:\n\n1. **Time Complexity**: This refers to how the runtime grows as input size increases.\n2. **Space Complexity**: This measures additional memory usage.\n\nFor arrays, accessing an element is O(1), while searching unsorted arrays is O(n). Would you like me to explain any specific algorithm?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[600px] bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-700/50">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-700/50">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-pink-500 rounded-full flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-white">AI Tutor</h3>
          <p className="text-xs text-gray-400">Online • Ready to help</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              message.sender === 'user'
                ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white'
                : 'bg-gradient-to-br from-violet-600/20 to-purple-600/20 text-gray-200 border border-violet-500/30'
            }`}>
              <p className="whitespace-pre-wrap">{message.text}</p>
              <p className="text-xs opacity-70 mt-2">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-700/50">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about algorithms, data structures, or code..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-violet-500 focus:outline-none transition-colors"
          />
          <button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white p-3 rounded-xl transition-all duration-300"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// =====================================
// Progress Chart Component
// =====================================
function ProgressChart() {
  const [difficulty, setDifficulty] = useState('Intermediate');
  
  // Sample progress data
  const weeklyProgress = [
    { day: 'Mon', hours: 2.5, problems: 8 },
    { day: 'Tue', hours: 3.2, problems: 12 },
    { day: 'Wed', hours: 1.8, problems: 6 },
    { day: 'Thu', hours: 4.1, problems: 15 },
    { day: 'Fri', hours: 2.9, problems: 10 },
    { day: 'Sat', hours: 5.2, problems: 18 },
    { day: 'Sun', hours: 3.6, problems: 13 }
  ];

  const topicDistribution = [
    { name: 'Arrays', value: 35, color: '#8B5CF6' },
    { name: 'Trees', value: 25, color: '#10B981' },
    { name: 'Graphs', value: 20, color: '#F59E0B' },
    { name: 'DP', value: 20, color: '#EF4444' }
  ];

  const difficulties = ['Beginner', 'Intermediate', 'Interview-Prep'];

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('userDifficulty', difficulty);
  }, [difficulty]);

  return (
    <div className="space-y-6">
      {/* Difficulty Selector */}
      <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-semibold text-white mb-4">Learning Personalization</h3>
        <div className="flex gap-2">
          {difficulties.map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                difficulty === level
                  ? 'bg-gradient-to-r from-violet-600 to-violet-500 text-white shadow-lg shadow-violet-500/25'
                  : 'bg-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-700'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <h4 className="text-lg font-semibold text-white mb-4">Weekly Progress</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyProgress}>
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#8B5CF6', strokeWidth: 2, fill: '#1F2937' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Topic Distribution */}
        <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <h4 className="text-lg font-semibold text-white mb-4">Focus Areas</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topicDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {topicDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            {topicDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-gray-300">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Problems Solved', value: '142', color: 'from-violet-500 to-purple-500' },
          { label: 'Study Hours', value: '28.5', color: 'from-teal-500 to-green-500' },
          { label: 'Current Streak', value: '12 days', color: 'from-yellow-500 to-orange-500' },
          { label: 'Accuracy', value: '87%', color: 'from-pink-500 to-rose-500' }
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50 text-center"
          >
            <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
              {stat.value}
            </div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// =====================================
// Main App Component
// =====================================
function App() {
  const [activeSection, setActiveSection] = useState('learn');
  const [isTeaching, setIsTeaching] = useState(false);
  const [teachingMessage, setTeachingMessage] = useState('');
  const [selectedLesson, setSelectedLesson] = useState(null);

  const setTeachingState = (teaching, message = '') => {
    setIsTeaching(teaching);
    setTeachingMessage(message);
    if (teaching && message) {
      // Auto-hide teaching state after 8 seconds
      setTimeout(() => {
        setIsTeaching(false);
        setTeachingMessage('');
      }, 8000);
    }
  };

  const handleStartLesson = (module) => {
    setSelectedLesson(module);
    setActiveSection('learn');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ProgressChart />
              </div>
              <div className="space-y-6">
                <Professor3D isTeaching={isTeaching} currentMessage={teachingMessage} />
                <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                  <h4 className="text-lg font-semibold text-white mb-3">Quick Actions</h4>
                  <div className="space-y-3">
                    <button 
                      onClick={() => setActiveSection('learn')}
                      className="w-full bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300"
                    >
                      Continue Learning
                    </button>
                    <button 
                      onClick={() => setActiveSection('assignments')}
                      className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300"
                    >
                      Practice Coding
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'learn':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Learning Hub</h2>
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3">
                <CourseExplorer onStartLesson={handleStartLesson} setTeachingState={setTeachingState} />
              </div>
              <div>
                <Professor3D isTeaching={isTeaching} currentMessage={teachingMessage} />
              </div>
            </div>
          </div>
        );

      case 'assignments':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Code Assignments</h2>
            <CodeAssignment />
          </div>
        );

      case 'chat':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">AI Tutor Chat</h2>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <Chatbot />
              </div>
              <div>
                <Professor3D isTeaching={isTeaching} currentMessage={teachingMessage} />
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Your Progress</h2>
            <ProgressChart />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-violet-950">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;