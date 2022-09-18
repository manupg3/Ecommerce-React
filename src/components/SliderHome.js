import React from 'react';
import Carousel from 'nuka-carousel';
import img1slider from '../assets/img/slider1.jpg'
import img3slider from '../assets/img/slider3.png'

class SliderHome extends React.Component {
  render() {
    return (
      <Carousel 
      wrapAround={true}
      slidesToShow={1}
      animation='Fade'
      adaptiveHeight={false}
      autoplay={true}
      >
        <img src={img1slider} alt="img" />
        <img src={img3slider} alt="img" />
      </Carousel>
    );
  }
}
export default SliderHome