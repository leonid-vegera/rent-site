import React from 'react';
import './ElementInfo.scss';

export function ElementInfo({ element }) {
  const { price, heading, description, address } = element;
  return (
    <div className='element-info'>
      <section className="element-info__container">
        <div className="element-info__image">
          <div className="element-info__sum">
            {price} грн / доба
          </div>
        </div>

        <div className="element-info__text">
          <h2 className="element-info__title">
            {heading}
          </h2>
          <p className="element-info__description">
            {description}
          </p>
          <p className="element-info__address">
            {address.code} {address.city} {address.street}
          </p>
        </div>

      </section>
    </div>
  );
}
