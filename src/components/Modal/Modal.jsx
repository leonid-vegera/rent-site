import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Modal.scss'

export function Modal({ closeModal, addAdvertisement }) {
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [verticalCoordinate, setVerticalCoordinate] = useState('');
  const [horizontalCoordinate, setHorizontalCoordinate] = useState('');
  const [price, setPrice] = useState('');
  const [pictures, setPictures] = useState([]);

  const newAdvert = {
    id: uuidv4(),
    heading,
    description,
    address: {
      code,
      city,
      street,
    },
    coordinates: [+verticalCoordinate, +horizontalCoordinate],
    price,
    pictures,
  }

  const handleCoordinates = (data, callback) => {
    if (/[0-9\\.,:]/.test(data)) {
      callback(data)
    }
  }

  const handleCode = (data, callback) => {
    if (/[0-9]/.test(data)) {
      callback(data)
    }
  }

  const handlePictureChange = (event) => {
    const selectedPictures = Array.from(event.target.files);
    const imageFiles = [];

    selectedPictures.forEach((picture) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        imageFiles.push(base64String);
      };
      reader.readAsDataURL(picture);
    });

    setPictures(imageFiles);
  };

  return (
    <div className='modal' onClick={closeModal}>
        <form
          action="#"
          method="post"
          className="modal__container"
          onClick={(event) => event.stopPropagation()}
          onSubmit={(event) => addAdvertisement(event, newAdvert)}
        >
          <h1 className="modal__title">Додайте дані про об'єкт нерухомості</h1>

          <section className="modal__section heading">
            <label className="heading__text" htmlFor='title'>
              Заголовок
            </label>
            <input
              type="text"
              className="heading__input"
              required={true}
              id="title"
              name="title"
              placeholder="Додайте короткий опис"
              value={heading}
              onChange={(event) => {
                setHeading(event.target.value)
              }}
            />
          </section>

          <section className="modal__section heading">
            <label className="heading__text" htmlFor='description'>
              Опис
            </label>
            <textarea
              className="heading__input"
              required={true}
              id="description"
              name="description"
              value={description}
              placeholder="Додайте розлогішу інформацію про приміщення"
              onChange={(event) => {
                setDescription(event.target.value)
              }}
            >
              Додайте розлогішу інформацію про приміщення
            </textarea>
          </section>

          <section className="modal__section heading" id="address">
            <div className="heading__text">
              Адреса
            </div>
            <input
              type="text"
              className="heading__input"
              placeholder="Додайте індекс"
              name="code"
              value={code}
              onChange={(event) => {
                handleCode(event.target.value, setCode)
              }}
            />
            <input
              type="text"
              className="heading__input"
              placeholder="Додайте місто"
              required={true}
              name="city"
              value={city}
              onChange={(event) => {
                setCity(event.target.value)
              }}
            />
            <input
              type="text"
              className="heading__input"
              placeholder="Додайте вулицю, номер будинку"
              required={true}
              name="street"
              value={street}
              onChange={(event) => {
                setStreet(event.target.value)
              }}
            />
          </section>

          <section className="modal__section heading">
            <h2 className="heading__text">
              Координати
            </h2>
              <input
                type="text"
                className="heading__input"
                required={true}
                name="Y-coordinate"
                placeholder="Y"
                value={verticalCoordinate}
                onChange={(event) => {
                  handleCoordinates(event.target.value, setVerticalCoordinate)
                }}
              />
              <input
                type="text"
                className="heading__input"
                required={true}
                name="X-coordinate"
                placeholder="X"
                value={horizontalCoordinate}
                onChange={(event) => {
                  handleCoordinates(event.target.value, setHorizontalCoordinate)
                }}
              />
          </section>

          <section className="modal__section heading">
            <label className="heading__text" htmlFor='price'>
              Вартість за добу
            </label>
            <div className="heading__sum">
              <input
                type="number"
                className="heading__input"
                placeholder="Введіть суму"
                required={true}
                id="price"
                name="price"
                value={price}
                onChange={(event) => {
                  setPrice(+event.target.value)
                }}
              />
              <span>грн</span>
            </div>
          </section>

          <section className="modal__section heading">
            <label className="heading__text" htmlFor='picture'>
              Зображення
            </label>
            <input
              type="file"
              className="heading__input"
              accept="image/jpeg"
              required={true}
              multiple={true}
              id="picture"
              name="picture"
              onChange={handlePictureChange}
            />
          </section>

          <section className="modal__section">
            <div className="modal__buttons">
              <button
                className="modal__button modal__button--cancel"
                type="button"
                onClick={closeModal}
              >
                Відміна
              </button>
              <button
                className="modal__button modal__button--save"
                type="submit"
              >
                Зберегти
              </button>
            </div>
          </section>
        </form>
    </div>
  );
}
