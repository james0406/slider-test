import React from 'react';

import 'styles/scss/components/slider/__item.scss';
import testImage from 'img/img-featured-02.png';

function Item() {
  return (
    <div className="slider__item">
      <img src={testImage} className="slider__item-image" />
      <div className="slider__item-container">
        <div className="slider__item-title">CryptoDozer 2.0</div>
        <div className="slider__item-content">
          All that is left to do now is to start collectiong our crypto dolls
          and earning ETH!
        </div>
      </div>
    </div>
  );
}

export default Item;
