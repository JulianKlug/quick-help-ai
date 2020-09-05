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
    const { messages } = this.props;

    return (
      <AnimateHeight height={height} style={{ margin: "0 auto" }}>
        <div className="chat-feed">
          {messages.map((message) => (
            <ChatBubble message={message} key={message.id} />
          ))}
        </div>
      </AnimateHeight>
    );
  }
}

function ChatWrapper({ messages = [] }) {
  const hasMessages = messages.length > 0;
  console.log(hasMessages);
  return <Chat open={hasMessages} messages={messages} />;
}

export default ChatWrapper;
