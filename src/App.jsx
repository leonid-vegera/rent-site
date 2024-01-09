import './App.scss';
import 'leaflet/dist/leaflet.css'
import React, { useCallback, useMemo, useState } from 'react';
import { Header } from './components/Header/Header';
import { Modal } from './components/Modal/Modal';
import { SidePanel } from './components/SidePanel/SidePanel';
import { useLocalStorage } from './service/useLocalStorage';
import { MapComponent } from './components/MapComponent/MapComponent';

function App() {
  const [searchText, setSearchText] = useState('');
  const [isModalOpened, setModalOpened] = useState(false);
  const [activeAdd, setActiveAdd] = useState(null);
  const [values, save] = useLocalStorage('adverts', []);
  const [mapValues, setMapValues] = useState(values);

  const handleSearch = (text) => {
    setSearchText(text.trimStart())
  }

  const clearSearchField = () => {
    setSearchText('');
  }

  const handleModal = () => {
    setModalOpened((modalStatus) => !modalStatus )
  }

  const handleAdvertisement = (event, advert) => {
    event.preventDefault();
    save([...values, advert])
    handleModal();
  }

  const handleMarkerClick = (id) => {
    const activeAdd = values.find(value => value.id === id);
    setActiveAdd(activeAdd);
  }

  const filterValues = useCallback((values) => {
    const filteredValues = [];

    for (let item of values) {
      let normalizedValues = [];
      for (let key in item) {
        if (typeof item[key] === 'object') {
          const data = Object.values(item[key]);
          const stringifiedData = data.map(item => String(item))
          normalizedValues.push(...stringifiedData)
        } else {
          normalizedValues.push(String(item[key]));
        }
      }

      if (normalizedValues.some(item => (
        item.toLowerCase().includes(searchText.toLowerCase())))
      ) {
        filteredValues.push(item)
      }
    }

    return filteredValues;
  }, [searchText, values])

  const updateWhenMapResize = (values) => {
    setMapValues(values)
  }

  const filteredValues = useMemo(
    () => filterValues(mapValues)
    , [mapValues, searchText]);

  const panelElements = activeAdd ? [activeAdd] : filteredValues;

  return (
    <div className="App">
      <Header
        toggleModal={handleModal}
        onRemoveText={clearSearchField}
        onSearch={handleSearch}
        inputText={searchText}
      />

      <div className="App__container">
        <MapComponent
          values={values}
          handleMarkerClick={handleMarkerClick}
          updateAdverts={updateWhenMapResize}
          activeId={activeAdd?.id || ''}
        />
        <SidePanel elements={panelElements}/>
      </div>

      {isModalOpened && (
        <Modal
          closeModal={handleModal}
          addAdvertisement={handleAdvertisement}
        />
      )}
    </div>
  );
}

export default App;
