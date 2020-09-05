import React from "react";
import AnimateHeight from "react-animate-height";

import ChatBubble from "./ChatBubble";

class Chat extends React.Component {
  state = {
    height: 0,
  };

  componentWillReceiveProps(nextProps) {
    const { open } = nextProps;
    this.setState({
      height: open ? "auto" : 0,
    });
  }

  render() {
    const { height } = this.state;
    const { messages, isTyping } = this.props;

    const writingMessage = { text: "...", owner: "AI" };

    return (
      <AnimateHeight height={height} style={{ margin: "0 auto" }}>
        <div className="chat-feed">
          {isTyping ? (
            <ChatBubble message={writingMessage} key={"hello"} />
          ) : null}

          {messages.map((message) => (
            <ChatBubble message={message} key={message.id} />
          ))}
        </div>
      </AnimateHeight>
    );
  }
}

function ChatWrapper({ messages = [], isTyping }) {
  const hasMessages = messages.length > 0;
  return <Chat open={hasMessages} messages={messages} isTyping={isTyping} />;
}

export default ChatWrapper;
