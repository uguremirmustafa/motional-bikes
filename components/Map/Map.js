import React, { useState, useRef } from 'react';
import ReactMapGL, { MapContext, Marker, FlyToInterpolator } from 'react-map-gl';
import useSupercluster from 'use-supercluster';
import { FaBicycle } from 'react-icons/fa';

export default function Map({ data }) {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: 'calc(100vh - 64px)',
    latitude: 50.8503,
    longitude: 4.3517,
    zoom: 11,
  });
  const mapRef = useRef();

  //get points
  const points = data?.map((station) => ({
    type: 'Feature',
    properties: { cluster: false, stationId: station.number },
    geometry: {
      type: 'Point',
      coordinates: [station.position.lng, station.position.lat],
    },
  }));

  //get map bounds
  const bounds = mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null;

  //get clusters
  const { clusters, supercluster } = useSupercluster({
    points,
    zoom: viewport.zoom,
    bounds,
    options: { radius: 90, maxZoom: 20 },
  });

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
            <div className="w-6 h-6 bg-red-300 rounded-full flex justify-center items-center">
              <FaBicycle size="16px" color="white" />
            </div>
          </Marker>
        );
      })}
    </ReactMapGL>
  );
}
