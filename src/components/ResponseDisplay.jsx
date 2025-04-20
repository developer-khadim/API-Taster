import React from 'react';
import { motion } from 'framer-motion';
import { Copy } from 'lucide-react';
import { formatHeaders } from './formatHeaders';

const ResponseDisplay = ({ response, onCopyToClipboard }) => (
  <motion.div
    key="response-content"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex-grow flex flex-col gap-3"
  >
    <div>
      <h3 className="text-sm font-semibold text-gray-400 mb-1 flex justify-between items-center">
        Headers
        <motion.button 
          onClick={() => onCopyToClipboard(formatHeaders(response.headers), 'Headers')} 
          className="text-gray-500 hover:text-blue-400 transition duration-200 p-1 rounded hover:bg-gray-700" 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }} 
          aria-label="Copy headers" 
          title="Copy Headers"
        >
          <Copy className="w-4 h-4" />
        </motion.button>
      </h3>
      <pre className="text-xs bg-gray-900 p-2 rounded-md overflow-x-auto max-h-32 text-gray-300 font-mono whitespace-pre-wrap break-all custom-scrollbar">
        {formatHeaders(response.headers)}
      </pre>
    </div>

    <div className="flex-grow flex flex-col">
      <h3 className="text-sm font-semibold text-gray-400 mb-1 flex justify-between items-center">
        Body
        <motion.button 
          onClick={() => onCopyToClipboard(response.body, 'Body')} 
          className="text-gray-500 hover:text-blue-400 transition duration-200 p-1 rounded hover:bg-gray-700" 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }} 
          aria-label="Copy body" 
          title="Copy Body"
        >
          <Copy className="w-4 h-4" />
        </motion.button>
      </h3>
      <pre className="flex-grow text-xs bg-gray-900 p-3 rounded-md overflow-auto text-gray-300 font-mono whitespace-pre-wrap break-all custom-scrollbar">
        {response.body}
      </pre>
    </div>
  </motion.div>
);

export default ResponseDisplay;