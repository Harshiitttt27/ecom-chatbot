
import { useState } from 'react';
import Chatbot from './components/Chatbot';
import Login from './components/Login';

function App() {
  const [token, setToken] = useState(null);

  return token ? <Chatbot token={token} /> : <Login setToken={setToken} />;
}

export default App;