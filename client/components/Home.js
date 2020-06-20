import React from 'react';
import {Row, Button} from 'reactstrap';

const HomePage = () => {
  return (
    <div className="home-page-view">
      <h3 className="title-home-page">Welcome to Pandemic Essentials!</h3>
      <Row className="home-page-row-button">
        <Button href="./products" size="lg" className="button-view-products">
          What do you need today?
        </Button>
      </Row>
      <Row className="row-image-center">
        <img
          className="home-page-image-size"
          src="/home-page-image.svg"
          alt="HomePageImage"
        />
      </Row>
    </div>
  );
};

export default HomePage;
