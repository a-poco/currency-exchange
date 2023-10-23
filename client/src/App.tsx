import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import CountryInfo from './pages/CountryInfo';
import Login from './pages/Login';

const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      {isAuthenticated ? (
        <CountryInfo onAuthenticated={setIsAuthenticated} />
      ) : (
        <Login onAuthenticated={setIsAuthenticated} />
      )}
    </QueryClientProvider>
  );
}

export default App;
