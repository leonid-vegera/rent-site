import React, { useCallback } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

function MapClickHandler({ handleMarkerClick }) {
  useMapEvents({
    click: () => handleMarkerClick(''),
  });

  return null;
}

function MapEvents({ updateVisibleAdvertisements }) {
  useMapEvents({
    moveend: (event) => updateVisibleAdvertisements(event.target),
    zoomend: (event) => updateVisibleAdvertisements(event.target),
  });

  return null;
}

export function MapComponent({ values, handleMarkerClick, updateAdvertes }) {
  const center = [50.44491037198471, 30.523112934643784];
  const customIcon = L.icon({
    iconUrl: process.env.PUBLIC_URL + '/img/home-icon.png',
    iconSize: [38, 38],
  });

  const updateVisibleAdvertisements = useCallback((map) => {
    const bounds = map.getBounds();
    const newVisibleAdvertisements = values.filter((ad) =>
      bounds.contains(ad.coordinates)
    );
    updateAdvertes(newVisibleAdvertisements);
  }, [values]);

  return (
    <MapContainer
      center={center}
      zoom={12}
      scrollWheelZoom={true}
      style={{ width: '85vw', height: '92vh' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler handleMarkerClick={handleMarkerClick}/>
      <MapEvents updateVisibleAdvertisements={updateVisibleAdvertisements} />
      <MarkerClusterGroup
        chunkedLoading
      >
        {values.map(marker => (
          <Marker
            position={marker.coordinates}
            icon={customIcon}
            key={marker.id}
            eventHandlers={{
              click: () => handleMarkerClick(marker.id),
            }}
          >
            <Popup>
              {marker.address.street}
              <hr/>
              {marker.price} грн/доба
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
