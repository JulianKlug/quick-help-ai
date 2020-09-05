import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import ChatWrapper from "./ChatWrapper";
import QuestionInput from "./QuestionInput";

import respond from "../apiCalls";

// Test Function For Chat
// async function respond() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("new message");
//     }, 1000);
//   });
// }

const USER = "USER";
const AI = "AI";

function buildQuestionHistory(feed) {
  let questionHistory = [];
  for (let i = 0; i < feed.length; i += 2) {
    questionHistory.push({
      q: feed[i].text,
      a: feed[i + 1].text,
    });
  }
  return questionHistory;
}

function buildMessage({ text, owner }) {
  if (!text || !owner) throw new Error("Text nad owner required!");
  return {
    id: uuidv4(),
    text,
    owner,
  };
}

export default function Header() {
  const [feed, setFeed] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleNewQuestion = async (question) => {
    const userMessage = buildMessage({ text: question, owner: USER });
    console.log(userMessage);
    setFeed((feed) => [userMessage, ...feed]);
    setIsTyping(true);

    const questionHistory = buildQuestionHistory(feed);
    await respond(userMessage.text, questionHistory).then((res) => {
      const aiMessage = buildMessage({ text: res, owner: AI });
      setFeed((feed) => [aiMessage, ...feed]);
      setIsTyping(false);
    });
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

        <div style={{ width: "80vw" }}>
          <QuestionInput
            feed={feed}
            onNewQuestion={handleNewQuestion}
            disabled={isTyping}
          />
          <div style={{ overflow: "hidden" }}>
            <ChatWrapper messages={feed} isTyping={isTyping} />
          </div>
          <div style={{ padding: "2em" }}>
            <span>Nicht gefunden was du suchts? Frag mal nach Reto.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
