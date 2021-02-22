import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


interface PlayerTagOption {
  label: string,
  value: string,
}

interface PlayerTagSettingSectionProps {
  desiredPlayerTag: string;
  desiredPlayerTagChanged(tag: string): void;
  playerTagOptions: PlayerTagOption[];
}

const PlayerTagSettingSection: React.FC<PlayerTagSettingSectionProps> = (props: PlayerTagSettingSectionProps) => {
  const playerOptions = props.playerTagOptions.map((option, index) => (
    <Form.Check
      key={index}
      type="radio"
      label={option.label}
      name={option.label}
      onChange={() => props.desiredPlayerTagChanged(option.value)}
      checked={props.desiredPlayerTag === option.value}
    />
  ));

  return (
    <section className="mainGameLobbySection">
      <h1>XandO</h1>
      <Form>
        <Form.Group as={Row}>
          <Col sm={10}>
            {playerOptions}
          </Col>
        </Form.Group>
      </Form>
    </section>
  );
}

export default PlayerTagSettingSection;