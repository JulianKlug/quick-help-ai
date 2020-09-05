import React from "react";
import Chat from "./Chat";

export default function Header() {
  return (
    <div
      style={{
        fontWeight: "200",
        background: "#d40037",
        height: "500px",
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
        <Chat />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <label>Du kannst mich alles fragen</label>
          <input placeholder="Du kannst mich alles fragen" />
        </div>

        <span>Nicht gefunden was du suchts? Frag mal nach Reto.</span>
      </div>
    </div>
  );
}
