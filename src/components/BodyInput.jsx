import React from 'react';
import { motion } from 'framer-motion';
import { tabContentVariants } from './tabContentVariants';

const BodyInput = ({ body, onBodyChange, method }) => (
  <motion.div
    key="body-content"
    variants={tabContentVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="absolute top-0 left-0 right-0 h-full flex flex-col"
  >
    <textarea
      placeholder='Enter request body (JSON format for POST/PUT/PATCH)'
      value={body}
      onChange={(e) => onBodyChange(e.target.value)}
      disabled={['GET', 'DELETE', 'HEAD', 'OPTIONS'].includes(method)}
      className={`flex-grow bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200 resize-none font-mono custom-scrollbar ${
        (['GET', 'DELETE', 'HEAD', 'OPTIONS'].includes(method)) ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      rows={8}
    />
  </motion.div>
);

export default BodyInput;