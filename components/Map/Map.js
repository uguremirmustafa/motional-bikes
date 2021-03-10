import * as React from 'react';
import { useState } from 'react';
import ReactMapGL, { MapContext } from 'react-map-gl';
import CustomMarker from './CustomMarker';

export default function Map({ data }) {
  const key =
    'pk.eyJ1IjoidWd1cmVtaXJtdXN0YWZhIiwiYSI6ImNramU4b2F2dThkMTQyeWxiaTloNDJkYjcifQ.sgdzimPIdMJTX517Q33kdg';

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '80vh',
    latitude: 50.8503,
    longitude: 4.3517,
    zoom: 11,
  });

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken={key}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {data?.map((i) => (
        <CustomMarker
          data={i}
          key={i.number}
          longitude={i.position.lng}
          latitude={i.position.lat}
          zoom={viewport.zoom}
        />
      ))}
    </ReactMapGL>
  );
}
