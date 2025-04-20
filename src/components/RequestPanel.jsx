import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Send, Loader2 } from 'lucide-react';
import { panelVariants } from './panelVariants';
import RequestTabs from './RequestTabs';
import ErrorDisplay from './ErrorDisplay';

const RequestPanel = ({ 
  url, 
  method, 
  headers, 
  body, 
  loading, 
  error, 
  activeTab, 
  onUrlChange, 
  onMethodChange, 
  onHeaderChange, 
  onAddHeader, 
  onRemoveHeader, 
  onBodyChange, 
  onSendRequest, 
  setActiveTab 
}) => (
  <motion.div
    className="w-full md:w-1/2 bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl p-4 md:p-6 border border-gray-700/50 flex flex-col gap-4"
    variants={panelVariants}
    initial="hidden"
    animate="visible"
    whileHover={{ scale: 1.01, z: 5, transition: { duration: 0.2 } }}
    style={{ transformStyle: "preserve-3d" }}
  >
    <h2 className="text-xl font-semibold text-gray-300 border-b border-gray-600 pb-2 mb-2">Request</h2>

    <div className="flex flex-col sm:flex-row gap-2">
      <div className="relative flex-shrink-0 sm:w-32">
        <motion.select
          value={method}
          onChange={(e) => onMethodChange(e.target.value)}
          className="w-full appearance-none bg-gray-700 border border-gray-600 rounded-md py-2 pl-3 pr-8 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          whileFocus={{ scale: 1.05 }}
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>PATCH</option>
          <option>DELETE</option>
          <option>OPTIONS</option>
          <option>HEAD</option>
        </motion.select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
      <motion.input
        type="text"
        placeholder="Enter API endpoint URL (e.g., https://api.example.com/users)"
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        className="flex-grow bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        whileFocus={{ scale: 1.02, z: 10 }}
        style={{ transformStyle: "preserve-3d" }}
      />
    </div>

    <RequestTabs
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      headers={headers}
      body={body}
      onHeaderChange={onHeaderChange}
      onAddHeader={onAddHeader}
      onRemoveHeader={onRemoveHeader}
      onBodyChange={onBodyChange}
      method={method}
    />

    <motion.button
      onClick={onSendRequest}
      disabled={loading || !url}
      className={`mt-auto w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2.5 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`}
      whileHover={{ scale: 1.03, y: -2, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)" }}
      whileTap={{ scale: 0.98, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" /> Sending...
        </>
      ) : (
        <>
          <Send className="w-5 h-5" /> Send Request
        </>
      )}
    </motion.button>

    <ErrorDisplay error={error} />
  </motion.div>
);

export default RequestPanel;