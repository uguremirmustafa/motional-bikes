import React from 'react';
import { MapContext } from 'react-map-gl';
import { FaBicycle } from 'react-icons/fa';
export default function CustomMarker(props) {
  const context = React.useContext(MapContext);

  const { longitude, latitude, data, zoom } = props;

  const [x, y] = context.viewport.project([longitude, latitude]);
  const name = data.name.split(' ');
  const station = name[name.length - 1];
  const markerStyle = {
    position: 'absolute',
    left: x,
    top: y,
    display: 'grid',
    placeItems: 'center',
  };

  return (
    <div style={markerStyle}>
      <FaBicycle size="16px" color="rgba(96, 165, 250, 1)" />
      <div style={{ fontSize: '8px' }}>{station}</div>
    </div>
  );
}
