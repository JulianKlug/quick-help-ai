import React, { useState } from "react";

function QuestionInput({ onNewQuestion, disabled }) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (question === "") return;
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
          paddingBottom: "1em",
        }}
      >
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <div>
            <label>Du kannst mich alles fragen</label>
            <input
              placeholder={disabled ? "" : "Du kannst mich alles fragen"}
              name="question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              disabled={disabled}
            />

            <button
              style={{ marginLeft: "1em" }}
              type="submit"
              disabled={disabled}
            >
              Senden
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default QuestionInput;
