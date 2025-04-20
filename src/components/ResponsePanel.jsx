import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle } from 'lucide-react';
import { panelVariants } from './panelVariants';
import ResponseDisplay from './ResponseDisplay';

const ResponsePanel = ({ response, loading, copySuccess, onCopyToClipboard }) => (
  <motion.div
    className="w-full md:w-1/2 bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl p-4 md:p-6 border border-gray-700/50 flex flex-col"
    variants={panelVariants}
    initial="hidden"
    animate="visible"
    transition={{ delay: 0.1 }}
    whileHover={{ scale: 1.01, z: 5, transition: { duration: 0.2 } }}
    style={{ transformStyle: "preserve-3d" }}
  >
    <div className="flex justify-between items-center border-b border-gray-600 pb-2 mb-2">
      <h2 className="text-xl font-semibold text-gray-300">Response</h2>
      <AnimatePresence>
        {response && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`text-sm font-medium px-2.5 py-1 rounded-full ${
              response.ok ? 'bg-green-700/80 text-green-100' : 'bg-red-700/80 text-red-100'
            }`}
          >
            Status: {response.status} {response.statusText}
          </motion.span>
        )}
      </AnimatePresence>
    </div>

    <div className="flex-grow flex flex-col min-h-[200px] relative">
      <AnimatePresence>
        {copySuccess && (
          <motion.span 
            key="copy-success" 
            initial={{ opacity: 0, y: 5 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -5 }} 
            className="text-xs text-green-400 flex items-center absolute right-0 top-0"
          >
            <CheckCircle className="inline w-3.5 h-3.5 mr-1" /> {copySuccess}
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div 
            key="loading" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-800/50 rounded-b-lg"
          >
            <Loader2 className="w-8 h-8 animate-spin mr-2" /> <span>Loading response...</span>
          </motion.div>
        )}
        
        {!loading && !response && (
          <motion.div 
            key="placeholder" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="flex-grow flex items-center justify-center text-gray-500"
          >
            <span>Send a request to see the response here.</span>
          </motion.div>
        )}
        
        {response && !loading && (
          <ResponseDisplay response={response} onCopyToClipboard={onCopyToClipboard} />
        )}
      </AnimatePresence>
    </div>
  </motion.div>
);

export default ResponsePanel;