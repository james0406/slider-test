import React from 'react';

import Carousel from 'components/carousel';
import Slider from 'components/slider';
import Item from 'components/slider/Item';
import 'styles/scss/components/carousel/__item.scss';

const numbers = [1, 2, 3, 4];

function App() {
  return (
    <div className="App">
      <Carousel width="300px" height="150px">
        {numbers.map((number, index) => (
          <div className="carousel__item" key={index}>
            {number}
          </div>
        ))}
      </Carousel>
      <Slider width="1000px" height="264px">
        <Item />
        <Item />
      </Slider>
    </div>
  );
}

export default App;
