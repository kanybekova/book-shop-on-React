// import { Carousel } from 'bootstrap';
import React from 'react';
import { Carousel } from 'react-bootstrap';
import CarouselPhoto from '../img/carouselBody.jpg'
import CarouselPhoto1 from '../img/carouselBody1.jpg'

const Slider = () => {
    return (
        <div>
            <Carousel>
                <Carousel.Item >
                    <img className="d-block w-100" src={CarouselPhoto} alt="Winter" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={CarouselPhoto1} alt="Winter" />
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default Slider;