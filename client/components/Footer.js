import React from 'react';
import {Col} from 'reactstrap';
import {GoMarkGithub} from 'react-icons/go';
import {AiOutlineLinkedin} from 'react-icons/ai';
import {FaRegCopyright} from 'react-icons/fa';

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <Col className="footer-col">
          <span className="footer-title">Pandemic Essentials</span>
          <span className="description">
            We are proud to have all essentials in stock to survive a world
            pandemic with reasonable prices
          </span>
          <div className="github-box">
            <a
              className="github"
              href="https://github.com/2004-GraceShopperProject-NY/GraceShopper"
            >
              {' '}
              GitHub <GoMarkGithub color="black" size={32} />
            </a>
          </div>
          <span className="year">June 2020</span>
        </Col>
        <Col className="footer-col-2">
          <span className="copyright">
            <FaRegCopyright size={23} />Copyright:
          </span>
          <a
            href="https://www.linkedin.com/in/morozovaanna/"
            className="copyright-name"
          >
            <AiOutlineLinkedin size={25} />Anna Morozova
          </a>
          <a
            href="https://www.linkedin.com/in/conniehlok/"
            className="copyright-name"
          >
            <AiOutlineLinkedin size={25} />Connie Lok
          </a>
          <a
            href="https://www.linkedin.com/in/edadenizci/"
            className="copyright-name"
          >
            <AiOutlineLinkedin size={25} />Eda Deniz
          </a>
          <a
            href="https://www.linkedin.com/in/jennifer-y-b6392bb9/"
            className="copyright-name"
          >
            <AiOutlineLinkedin size={25} />Jennifer Yang
          </a>
        </Col>
      </footer>
    </div>
  );
};

export default Footer;
