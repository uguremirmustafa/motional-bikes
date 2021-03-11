import React, { useState, useRef, useEffect } from 'react';
import ReactMapGL, { MapContext, Marker, FlyToInterpolator, Popup } from 'react-map-gl';
import useSupercluster from 'use-supercluster';
import { FaBicycle, FaTimesCircle } from 'react-icons/fa';

export default function Map({ data }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: 'calc(100vh - 64px)',
    latitude: 50.8503,
    longitude: 4.3517,
    zoom: 11,
  });
  const mapRef = useRef();

  //get points
  const points = data?.map((station) => {
    // console.log(station);
    return {
      type: 'Feature',
      properties: {
        cluster: false,
        stationId: station.number,
        status: station.status,
        address: station.address,
        availableStands: station.available_bike_stands,
        availableBikes: station.available_bikes,
      },
      geometry: {
        type: 'Point',
        coordinates: [station.position.lng, station.position.lat],
      },
    };
  });

  //get map bounds
  const bounds = mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null;

  //get clusters
  const { clusters, supercluster } = useSupercluster({
    points,
    zoom: viewport.zoom,
    bounds,
    options: { radius: 90, maxZoom: 20 },
  });

  //popup closer with escape
  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        setSelected(null);
      }
    };
    window.addEventListener('keydown', listener);
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/uguremirmustafa/ckm4fk4jb1y2117pgtixxv2qp"
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      ref={mapRef}
      minZoom={11}
      maxZoom={18}
    >
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } = cluster.properties;

        if (isCluster) {
          return (
            <Marker key={cluster.id} latitude={latitude} longitude={longitude}>
              <div
                onClick={() => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    18
                  );
                  setViewport({
                    ...viewport,
                    latitude,
                    longitude,
                    zoom: expansionZoom,
                    transitionInterpolator: new FlyToInterpolator({ speed: 3 }),
                    transitionDuration: 'auto',
                  });
                }}
                className="bg-blue-300 cursor-pointer text-white font-bold rounded-full flex justify-center items-center"
                style={{
                  backgroundColor: 'rgba(96, 165, 250, .7)',
                  width: `${16 + (pointCount / data?.length) * 200}px`,
                  height: `${16 + (pointCount / data?.length) * 200}px`,
                  fontSize: `${10 + (pointCount / data?.length) * 10}px`,
                }}
              >
                {pointCount}
              </div>
            </Marker>
          );
        }
        return (
          <Marker key={cluster.properties.stationId} latitude={latitude} longitude={longitude}>
            <div
              className="w-6 h-6 bg-red-300 rounded-full flex justify-center items-center cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setSelected(cluster);
              }}
            >
              <FaBicycle size="16px" color="white" />
            </div>
          </Marker>
        );
      })}
      {selected ? (
        <Popup
          latitude={selected?.geometry.coordinates[1]}
          longitude={selected?.geometry.coordinates[0]}
          onClose={() => {
            setSelected(null);
          }}
          closeButton={false}
          closeOnClick={true}
          anchor="right"
        >
          <div className="p-2 w-52">
            <div className="flex w-full justify-end">
              <FaTimesCircle />
            </div>
            <h2 className="lowercase">
              <strong>Address: </strong>
              {selected.properties.address}
            </h2>
            <p className="lowercase">
              <strong>status: </strong>
              {selected.properties.status === 'OPEN' && (
                <span className="text-green-400 underline">open</span>
              )}
            </p>
            <p>
              <strong>available bikes: </strong>
              {selected.properties.availableBikes}
            </p>
            <p>
              <strong>available stands: </strong>
              {selected.properties.availableStands}
            </p>
          </div>
        </Popup>
      ) : null}
    </ReactMapGL>
  );
}
