import React, { useState } from "react";
import ChatWrapper from "./Chat";

export default function Header() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessages([...messages, question]);
    setQuestion("");
  };

  return (
    <div
      style={{
        fontWeight: "200",
        background: "#d40037",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        padding: "0 1em",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1
          style={{ marginTop: "5em", fontWeight: "lighter", fontSize: "3rem" }}
        >
          Wie kann ich dir helfen?
        </h1>

        <ChatWrapper messages={messages} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <label>Du kannst mich alles fragen</label>
            <input
              placeholder="Du kannst mich alles fragen"
              name="question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
            />
            <div>
              <button type="submit">Los!</button>
            </div>
          </form>
        </div>
        <span>Nicht gefunden was du suchts? Frag mal nach Reto.</span>
      </div>
    </div>
  );
}
