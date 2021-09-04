import React from "react";
import { Game, GamePlayer, O_TAG, Player, PlayerTag, X_TAG } from "../../application/types";




interface PlayerProps {
  tag: PlayerTag;
  isSystemPlayer: boolean;
  isPlayerTurn: boolean;
  playerName: string;
}

const PlayerScore: React.FC<PlayerProps> = (props: PlayerProps) => {
  const className =
    `player player-${props.tag.toLocaleLowerCase()} ${props
      .isSystemPlayer ? 'system-player' : ''} ${props
        .isPlayerTurn ? 'player-has-turn' : ''}`;

    const playerName = (props.playerName.length > 6) ? `${props.playerName.slice(0, 6)}...` : props.playerName;

  return (
    <div className={className}>
      <span>{`${playerName} (${props.tag})`}</span>
    </div>
  );
}

interface Props {
  systemPlayer?: Player;
  game?: Game;
}

const ScoreBoardSection: React.FC<Props> = (props: Props) => {
  if (!props.game) return (null);

  const playerX = props.game.playerX;
  const playerO = props.game.playerO;


  return (
    <section className="scoreBoard">
      <PlayerScore
        tag={X_TAG}
        isSystemPlayer={props.systemPlayer.id === playerX.id}
        isPlayerTurn={props.game.currentPlayerTurn === X_TAG}
        playerName={playerX.playerName}
      />
      <PlayerScore
        tag={O_TAG}
        isSystemPlayer={props.systemPlayer.id === playerO.id}
        isPlayerTurn={props.game.currentPlayerTurn === O_TAG}
        playerName={playerO.playerName}
      />
    </section>
  );
}

export default ScoreBoardSection;