import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const ErrorDisplay = ({ error }) => (
  <AnimatePresence>
    {error && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 5 }}
        className="mt-2 p-3 bg-red-900/60 border border-red-700/70 rounded-md text-red-300 text-sm flex items-center gap-2"
      >
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <span>{error}</span>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ErrorDisplay;