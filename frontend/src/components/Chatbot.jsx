import { useState } from 'react';
import axios from 'axios';

export default function Chatbot({ token }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/products/api/chat/',
        { message: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((prev) => [...prev, { user: input, bot: res.data.response }]);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [...prev, { user: input, bot: 'Oops! Something went wrong.' }]);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative bg-gray-100"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-vector/chat-bot-vector-logo-design-concept_418020-241.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Chatbot Card */}
      <div className="relative flex flex-col max-w-xl w-full h-[90vh] bg-gradient-to-br from-indigo-800 to-indigo-900 rounded-2xl shadow-2xl z-10 p-6 text-gray-100">
        <header className="text-center font-extrabold text-3xl tracking-wide mb-4 select-none">
          Chatbot Assistant
        </header>

        <main
          className="flex-1 overflow-y-auto p-3 space-y-5 bg-indigo-900 bg-opacity-40 rounded-lg scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-indigo-900"
          style={{ scrollBehavior: 'smooth' }}
        >
          {messages.length === 0 && (
            <p className="text-center italic opacity-60 select-none">
              Start the conversation by typing below...
            </p>
          )}
          {messages.map((msg, i) => (
            <div key={i} className="flex flex-col space-y-2">
              <div className="self-end max-w-xs bg-indigo-600 bg-opacity-80 rounded-xl px-5 py-3 shadow-lg break-words text-white font-medium leading-relaxed">
                <p>
                  <strong>You:</strong> {msg.user}
                </p>
              </div>
              <div className="self-start max-w-xs bg-white bg-opacity-90 text-indigo-900 rounded-xl px-5 py-3 shadow-md break-words font-sans leading-relaxed">
                <p>
                  <strong>Bot:</strong> {msg.bot}
                </p>
              </div>
            </div>
          ))}
        </main>

        <footer className="mt-5 flex gap-3">
          <textarea
            className="flex-1 rounded-xl border border-indigo-600 px-5 py-3 resize-none focus:outline-none focus:ring-4 focus:ring-indigo-400 bg-indigo-800 bg-opacity-60 placeholder-indigo-300 text-gray-100 font-medium transition duration-300"
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here... (Shift + Enter for new line)"
            spellCheck={false}
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl px-7 font-semibold shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-500"
            aria-label="Send message"
            type="button"
          >
            Send
          </button>
        </footer>
      </div>
    </div>
  );
}
