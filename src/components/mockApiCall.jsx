export const mockApiCall = async (url, method, headers, body) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (!url || !url.startsWith('http')) {
      return { 
        status: 400, 
        statusText: 'Bad Request', 
        headers: { 'content-type': 'application/json' }, 
        body: JSON.stringify({ error: 'Invalid URL format. Please include http:// or https://' }, null, 2), 
        ok: false 
      };
    }
    try {
      let responseBody = {};
      if (method === 'GET') {
        responseBody = { message: `Successfully fetched data from ${url}`, data: [{ id: 1, name: 'Test Item' }] };
      } else if (method === 'POST') {
         const parsedRequestBody = body && body.trim() ? JSON.parse(body) : {};
         responseBody = { message: `Successfully posted data to ${url}`, received: parsedRequestBody };
      } else {
          responseBody = { message: `Request with method ${method} sent to ${url}` };
      }
      return { 
        status: 200, 
        statusText: 'OK', 
        headers: { 
          'content-type': 'application/json', 
          'x-powered-by': 'React API Taster', 
          'date': new Date().toUTCString() 
        }, 
        body: JSON.stringify(responseBody, null, 2), 
        ok: true 
      };
    } catch (error) {
       if (error instanceof SyntaxError && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
           return { 
             status: 400, 
             statusText: 'Bad Request', 
             headers: { 'content-type': 'application/json' }, 
             body: JSON.stringify({ error: 'Invalid JSON in request body', details: error.message }, null, 2), 
             ok: false 
           };
       }
       console.error("Mock API Error:", error);
       return { 
         status: 500, 
         statusText: 'Internal Server Error', 
         headers: { 'content-type': 'application/json' }, 
         body: JSON.stringify({ error: 'An error occurred processing the mock request', details: error.message }, null, 2), 
         ok: false 
       };
    }
  };
  