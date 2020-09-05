import React, { useState } from "react";

function QuestionInput({ messages, onNewQuestion }) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onNewQuestion(question);
    setQuestion("");
  };

  return (
    <>
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
    </>
  );
}

export default QuestionInput;
