import { useEffect, useState } from "react";
import io from "socket.io-client";

import "./App.css";

const url = "http://localhost:3000";
const socket = io(url);

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    socket.emit("register", "agent");
    socket.on("status", ({ message }) => setLastMessage(message));
  }, []);

  const handleSendMessage = () => {
    socket.emit("Hello");
  };

  return (
    <>
      <h1>Agent Chat</h1>
      <div className="status">{`Connected: ${isConnected}`}</div>
      <div className="chat"></div>
      <input
        type="text"
        onChange={(e) => setLastMessage(e.target.data)}
        value={lastMessage!}
        className="message"
        placeholder="Type a message..."
      ></input>
      <button className="send" onClick={handleSendMessage}>
        Send
      </button>
    </>
  );
}

export default App;
