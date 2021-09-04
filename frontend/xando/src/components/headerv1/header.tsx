import React from "react";
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";

import './header.css'

interface HeaderProps {}

export const HeaderV1: React.FC<HeaderProps> = (props: HeaderProps) => {
  return (
    <Container fluid className="header-v1">
      <div className="logo-text">
        <Link to="/">
          <span className="logo-text-x">X</span>
          <span className="logo-text-n">n</span>
          <span className="logo-text-o">O</span>
        </Link>
      </div>
    </Container>
  );
}
