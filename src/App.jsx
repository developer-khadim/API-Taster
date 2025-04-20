import React, { useState, useCallback } from 'react';
import RequestPanel from './components/RequestPanel';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import GlobalStyles from './GlobalStyles';
import ResponsePanel from './components/ResponsePanel';


export default function App() {
  // State variables
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState([{ id: Date.now(), key: '', value: '' }]);
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('body');
  const [copySuccess, setCopySuccess] = useState('');

  // Header Management Callbacks
  const handleHeaderChange = useCallback((id, field, value) => {
    setHeaders(prevHeaders =>
      prevHeaders.map(header =>
        header.id === id ? { ...header, [field]: value } : header
      )
    );
  }, []);

  const addHeader = useCallback(() => {
    setHeaders(prevHeaders => [
      ...prevHeaders,
      { id: Date.now(), key: '', value: '' },
    ]);
  }, []);

  const removeHeader = useCallback((id) => {
    setHeaders(prevHeaders => prevHeaders.filter(header => header.id !== id));
  }, []);

  // API Call Logic
  const handleSendRequest = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    setCopySuccess('');
    
    const requestHeaders = headers.reduce((acc, h) => { 
      if (h.key.trim() && h.value.trim()) acc[h.key.trim()] = h.value.trim(); 
      return acc; 
    }, {});
    
    if (!url || (!url.startsWith('http://') && !url.startsWith('https://'))) { 
      setError('Invalid URL. Please include http:// or https://'); 
      setLoading(false); 
      return; 
    }
    
    let requestBodyContent = body;
    if ((method === 'POST' || method === 'PUT' || method === 'PATCH') && body.trim()) { 
      try { 
        JSON.parse(body); 
      } catch (e) { 
        setError('Invalid JSON in Request Body.'); 
        setLoading(false); 
        return; 
      } 
    } else if (['GET', 'DELETE', 'HEAD', 'OPTIONS'].includes(method)) { 
      requestBodyContent = null; 
    }

    try {
      const result = await mockApiCall(url, method, requestHeaders, requestBodyContent);
      setResponse(result);
      if (!result.ok) { 
        try { 
          const resBody = JSON.parse(result.body); 
          setError(resBody.error || result.statusText || 'An error occurred'); 
        } catch { 
          setError(result.statusText || 'An error occurred'); 
        } 
      }
    } catch (err) {
      console.error("API Call Error:", err);
      const errorMessage = err.message || 'An unexpected error occurred during the request.';
      setError(errorMessage);
      setResponse({ 
        status: 500, 
        statusText: 'Client Error', 
        headers: {}, 
        body: JSON.stringify({ error: errorMessage }, null, 2), 
        ok: false 
      });
    } finally {
      setLoading(false);
    }
  }, [url, method, headers, body]);

  // Response Copy Logic
  const copyToClipboard = useCallback((text, type) => {
    if (!navigator.clipboard) { 
      setCopySuccess('Failed: Clipboard API unavailable'); 
      return; 
    }
    
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopySuccess(`${type} copied!`);
        setTimeout(() => setCopySuccess(''), 2000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        setCopySuccess(`Failed to copy ${type}`);
        setTimeout(() => setCopySuccess(''), 2000);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 font-sans p-4 md:p-8 flex flex-col perspective">
      <AppHeader />

      <div className="flex-grow flex flex-col md:flex-row gap-4 md:gap-6">
        <RequestPanel
          url={url}
          method={method}
          headers={headers}
          body={body}
          loading={loading}
          error={error}
          activeTab={activeTab}
          onUrlChange={setUrl}
          onMethodChange={setMethod}
          onHeaderChange={handleHeaderChange}
          onAddHeader={addHeader}
          onRemoveHeader={removeHeader}
          onBodyChange={setBody}
          onSendRequest={handleSendRequest}
          setActiveTab={setActiveTab}
        />
        
        <ResponsePanel
          response={response}
          loading={loading}
          copySuccess={copySuccess}
          onCopyToClipboard={copyToClipboard}
        />
      </div>

      <AppFooter />
      <GlobalStyles />
    </div>
  );
}