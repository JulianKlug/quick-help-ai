import React from "react";

function ChatBubble({ message }) {
  const { text, owner } = message;

  let positionContainer = "message-left ";
  let positionBubble = "message-bubble-left";
  if (owner === "AI") {
    positionContainer = "message-right";
    positionBubble = "message-bubble-right";
  }
  console.log("received: ", message);
  return (
    <>
      <div className={`message-container ${positionContainer}`}>
        <div className={`message-bubble ${positionBubble}`}>
          <span>{text}</span>
        </div>
      </div>
    </>
  );
}

export default ChatBubble;
