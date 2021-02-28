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
  onComplete(): void;
  playerTagOptions: PlayerTagOption[];
  display: boolean;
}

interface PlayerTagItemProp {
  tag: PlayerTagOption;
  selected: boolean;
  onClick(playerTag: string): void;
}

const PlayerTagItem: React.FC<PlayerTagItemProp> = (props: PlayerTagItemProp) => {
  return (
    <div className={`playerTagItem ${props.selected ? 'playerTagItem_selected' : ''}`} onClick={() => props.onClick(props.tag.value)}>
      <span>{props.tag.label}</span>
    </div>
  );
}

const PlayerTagSettingSection: React.FC<PlayerTagSettingSectionProps> = (props: PlayerTagSettingSectionProps) => {
  const playerOptions = props.playerTagOptions.map((option, index) => (
    <PlayerTagItem
      key={index}
      tag={option}
      onClick={props.desiredPlayerTagChanged}
      selected={props.desiredPlayerTag === option.value}
    />
  ));

  return (
    <section className={`gameLobbySection ${props.display ? '' : 'd-none'}`}>
      <Form>
        <Form.Group as={Row}>
          <Col>
            <Form.Label>Select your player tag</Form.Label>
              {playerOptions}
          </Col>
        </Form.Group>

        <Form.Row>
          <Col>
            <Button
              variant="primary"
              onClick={props.onComplete}
            >
              Done
          </Button>
          </Col>
        </Form.Row>
      </Form>
    </section>
  );
}

export default PlayerTagSettingSection;