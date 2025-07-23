import React, { useEffect, useState } from "react";

const API_BASE = "https://chattest-backend-a.azurewebsites.net/api";



function App() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const fetchMessages = async () => {
    const res = await fetch(`${API_BASE}/messages`);
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000); // Poll every 2s
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSending(true);
    await fetch(`${API_BASE}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message }),
    });
    setMessage("");
    setSending(false);
    fetchMessages();
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <h2 className="text-center mb-4">chatTest React Chat</h2>
      <form onSubmit={handleSubmit} className="mb-3 d-flex gap-2">
        <input
          className="form-control"
          style={{ maxWidth: 120 }}
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          className="form-control"
          placeholder="Type a message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary" disabled={sending}>
          Send
        </button>
      </form>
      <div style={{ maxHeight: 300, overflowY: "auto", background: "#fff", borderRadius: 8, boxShadow: "0 1px 3px #ccc", padding: 8 }}>
        {messages.map((m) => (
          <div key={m.id} className="border-bottom py-1 px-2 d-flex">
            <strong className="me-2">{m.name}:</strong>
            <span>{m.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
