import React from 'react';
import { Link } from 'react-router-dom';

function AuthPage({ title, children, buttonText, buttonLink }) {
  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="title">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default AuthPage;
