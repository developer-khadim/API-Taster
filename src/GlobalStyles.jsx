import React from 'react';

const GlobalStyles = () => (
  <style jsx global>{`
    /* Add perspective class to a parent container */
    .perspective { 
      perspective: 1000px; 
    }
    
    /* Custom Scrollbars (applied using class now) */
    .custom-scrollbar::-webkit-scrollbar { 
      width: 8px; 
      height: 8px; 
    }
    
    .custom-scrollbar::-webkit-scrollbar-track { 
      background: #1a202c; 
      border-radius: 10px; 
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb { 
      background-color: #4a5568; 
      border-radius: 10px; 
      border: 2px solid #1a202c; 
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { 
      background-color: #718096; 
    }
    
    .custom-scrollbar { 
      scrollbar-width: thin; 
      scrollbar-color: #4a5568 #1a202c; 
    }
    
    /* Minor adjustments */
    pre { 
      min-height: 50px; 
    }
    
    /* Ensure body scrollbar uses custom style if needed */
    body::-webkit-scrollbar { 
      width: 8px; 
    }
    
    body::-webkit-scrollbar-track { 
      background: #1f2937; 
    }
    
    body::-webkit-scrollbar-thumb { 
      background-color: #4b5563; 
      border-radius: 10px; 
    }
    
    body::-webkit-scrollbar-thumb:hover { 
      background-color: #6b7280; 
    }
    
    body { 
      scrollbar-width: thin; 
      scrollbar-color: #4b5563 #1f2937; 
    }
  `}</style>
);

export default GlobalStyles;