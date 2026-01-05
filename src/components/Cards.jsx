import React from 'react';
import { Card, Button } from 'react-bootstrap';

function FeatureCard({ title, iconName, onAction, className, description }) {
  return (
    <Card className={`feature-card text-white text-center py-4 ${className}`}>
      <Card.Body className="d-flex flex-column align-items-center justify-content-center">
        {/*Icons Bootstrap*/}
        <i className={`bi bi-${iconName} mb-4 feature-icon`}></i>
        
        <Card.Title className="h5 tracking-wider mb-3">{title}</Card.Title>

        {/*Div do hover*/}
        <div className="hover-content">
          <p className="card-description mb-4">{description}</p>
          <Button onClick={onAction} className="px-4 explorer-btn">EXPLORAR</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default FeatureCard;