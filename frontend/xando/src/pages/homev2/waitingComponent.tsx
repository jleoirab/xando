import React, { ChangeEvent } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

interface WaitingComponentProps {}


const WaitingComponent: React.FC<WaitingComponentProps> = (props: WaitingComponentProps) => {
  return (
    <section className="home-section starting-point-section">
      <h1>Starting...</h1>
    </section>
  );
}

export default WaitingComponent;