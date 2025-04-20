import React from 'react';
import { motion } from 'framer-motion';

 const AppFooter = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5, duration: 0.5 }}
    className="text-center text-gray-500 text-xs mt-6 md:mt-8"
  >
    Powered by Khadim.AI
  </motion.footer>
);

export default AppFooter;