import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

export function Message() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  useEffect(() => {
    socket.on("receive_message", (data) => setMessageReceived(data.message));
  }, [socket]);

  return (
    <div style={{ alignItems: "center" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          placeholder="Room number..."
          onChange={(e) => setRoom(e.target.value)}
        />

        <button onClick={joinRoom}>Join Room</button>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          placeholder="Message..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>

      <div style={{ textAlign: "center" }}>
        <h1>Message:</h1>
        {messageReceived}
      </div>
    </div>
  );

  function joinRoom() {
    if (room === "") return;
    socket.emit("join_room", room);
  }

  function sendMessage() {
    socket.emit("send_message", { message, room });
  }
}
