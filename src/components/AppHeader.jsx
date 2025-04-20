import React from 'react';
import { Linkedin, Github } from 'lucide-react';

const AppHeader = () => (
  <header className=" flex items-center justify-between mb-6 md:mb-8">
    <h1 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse">
      API Taster Tool
    </h1>
   
    <div className="flex justify-center gap-4 mt-4">
      <a 
        href="https://www.linkedin.com/in/khadim-ali12/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-blue-500 transition-colors"
      >
        <Linkedin size={20} />
      </a>
      <a 
        href="https://github.com/developer-khadim" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <Github size={20} />
      </a>
    </div>
    <p className="text-center text-gray-400 mt-1 text-sm md:text-base">
      Test your API endpoints with ease.
    </p>
  </header>
);

export default AppHeader;