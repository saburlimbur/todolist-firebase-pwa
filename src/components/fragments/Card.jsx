import React from 'react';

function Card({ className, children }) {
  return <article className={className}>{children}</article>;
}

function Header({ className, children }) {
  return <header className={className}>{children}</header>;
}

function Body({ className, children }) {
  return <div className={className}>{children}</div>;
}

function Footer({ className, children, onClick }) {
  return (
    <footer className={className} onClick={onClick}>
      {children}
    </footer>
  );
}

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

export default Card;
