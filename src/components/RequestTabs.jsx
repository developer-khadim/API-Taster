import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeadersInput from './HeadersInput';
import BodyInput from './BodyInput';

const RequestTabs = ({ 
  activeTab, 
  setActiveTab,
  headers, 
  body, 
  onHeaderChange, 
  onAddHeader, 
  onRemoveHeader, 
  onBodyChange, 
  method 
}) => (
  <>
    <div className="flex border-b border-gray-600">
      {['headers', 'body'].map(tab => (
        <motion.button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`relative py-2 px-4 text-sm font-medium transition-colors duration-200 ${
            activeTab === tab ? 'text-blue-400' : 'text-gray-400 hover:text-gray-200'
          }`}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          {tab === 'headers' ? `Headers (${headers.filter(h => h.key.trim() && h.value.trim()).length})` : 'Body (JSON)'}
          {activeTab === tab && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
              layoutId="underline"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </div>

    <div className="relative flex-grow min-h-[200px]">
      <AnimatePresence mode="wait">
        {activeTab === 'headers' && (
          <HeadersInput
            headers={headers}
            onHeaderChange={onHeaderChange}
            onAddHeader={onAddHeader}
            onRemoveHeader={onRemoveHeader}
          />
        )}
        {activeTab === 'body' && (
          <BodyInput
            body={body}
            onBodyChange={onBodyChange}
            method={method}
          />
        )}
      </AnimatePresence>
    </div>
  </>
);

export default RequestTabs;