import React from 'react';

const footerStyle = {
  textAlign: 'center',
  padding: '1rem',
  backgroundColor: '#fff',
  color: '#000',
  borderTop: 'none',
  bottom: 0,
  width: '100%',
};

const linkStyle = {
  textDecoration: 'none',
  marginLeft: '0.5rem',
  transition: 'color 0.3s ease',
};

const asmaLinkStyle = {
  ...linkStyle,
  color: '#ff69b4', // Light pink color
};

const muzzammilLinkStyle = {
  ...linkStyle,
  color: '#87cefa', // Light blue color
};

const repoLinkStyle = {
  ...linkStyle,
  color: '#000000',
};

const Footer = () => (
  <footer style={footerStyle}>
    <p style={{ margin: '0.5rem 0' }}>
      MERN Stack Project by 
      <a href="https://github.com/asmaumar2004" target="_blank" rel="noopener noreferrer" style={asmaLinkStyle}>
        Asma
      </a> & 
      <a href="https://github.com/abdurrehman022" target="_blank" rel="noopener noreferrer" style={muzzammilLinkStyle}>
        Muzzammil
      </a>
    </p>
    <p style={{ margin: '0.5rem 0' }}>
      &copy; 2024 Pakistani Recipe Roulette. All rights reserved. | 
      <a href="https://github.com/abdurrehman022/PakistaniRecipeRoulette" target="_blank" rel="noopener noreferrer" style={repoLinkStyle}>
        GitHub Repository
      </a>
    </p>
  </footer>
);

export default Footer;