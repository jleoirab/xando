import React from "react";

interface WaitingLobbySectionProps {
}

const WaitingLobbySection: React.FC<WaitingLobbySectionProps> = (props: WaitingLobbySectionProps) => {
  return (
    <section className={`gameBoard`}>
      <p>Waiting for other player to join...</p>
    </section>
  );
}

export default WaitingLobbySection;