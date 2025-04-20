import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { tabContentVariants } from './tabContentVariants';

const HeadersInput = ({ headers, onHeaderChange, onAddHeader, onRemoveHeader }) => (
  <motion.div
    key="headers-content"
    variants={tabContentVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="absolute top-0 left-0 right-0 space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar"
  >
    {headers.map((header, index) => (
      <motion.div
        key={header.id}
        className="flex gap-2 items-center"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <input 
          type="text" 
          placeholder="Key" 
          value={header.key} 
          onChange={(e) => onHeaderChange(header.id, 'key', e.target.value)} 
          className="flex-1 bg-gray-700 border border-gray-600 rounded-md py-1 px-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
        />
        <input 
          type="text" 
          placeholder="Value" 
          value={header.value} 
          onChange={(e) => onHeaderChange(header.id, 'value', e.target.value)} 
          className="flex-1 bg-gray-700 border border-gray-600 rounded-md py-1 px-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
        />
        <motion.button 
          onClick={() => onRemoveHeader(header.id)} 
          className="text-gray-500 hover:text-red-500 transition duration-200 p-1 rounded-full hover:bg-gray-600" 
          whileHover={{ scale: 1.1, rotate: 45 }} 
          whileTap={{ scale: 0.9 }} 
          aria-label="Remove header"
        >
          <Settings className="w-4 h-4" />
        </motion.button>
      </motion.div>
    ))}
    <motion.button 
      onClick={onAddHeader} 
      className="text-sm text-blue-400 hover:text-blue-300 transition duration-200 mt-2" 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }}
    >
      + Add Header
    </motion.button>
  </motion.div>
);

export default HeadersInput;