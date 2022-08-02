import React, { useCallback, useEffect, useState } from "react";
import L from "leaflet";
import useSupercluster from "use-supercluster";
import { Marker, useMap, Popup, Circle } from "react-leaflet";
import "./Poi.css";
import iconMarker from "../icon-test.png";

const icons = {};
const fetchIcon = (count, size) => {
  if (!icons[count]) {
    icons[count] = L.divIcon({
      html: `<div class="cluster-marker" style="width: ${size}px; height: ${size}px;">
        ${count}
      </div>`,
    });
  }
  return icons[count];
};

const pointIcon = new L.Icon({
  iconUrl: iconMarker,
  iconSize: [25, 25],
});

function Poi({ data, radioChoice, eventsData, statsData }) {
  const maxZoom = 22;
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(12);
  const map = useMap();

  function updateMap() {
    const b = map.getBounds();
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat,
    ]);
    setZoom(map.getZoom());
  }

  const onMove = useCallback(() => {
    updateMap();
  }, [map]);

  useEffect(() => {
    updateMap();
  }, [map]);

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  const points = data.map((poi) => ({
    type: "Feature",
    properties: {
      cluster: false,
      name: poi.name,
      choice: radioChoice,
      clicks: statsData.find((x) => x.poi_id === poi.poi_id)?.clicks,
      impressions: statsData.find((x) => x.poi_id === poi.poi_id)?.impressions,
      revenue: statsData.find((x) => x.poi_id === poi.poi_id)?.revenue,
      events: eventsData.find((x) => x.poi_id === poi.poi_id)?.events,
    },
    geometry: {
      type: "Point",
      coordinates: [parseFloat(poi.lon), parseFloat(poi.lat)],
    },
  }));

  const maxValues = {
    Clicks: Math.max(...statsData.map(o => o.clicks)),
    Impressions: Math.max(...statsData.map(o => o.impressions)),
    Revenue: Math.max(...statsData.map(o => o.revenue)),
    Events: Math.max(...eventsData.map(o => o.events))
  }

  const { clusters, supercluster } = useSupercluster({
    points: points,
    bounds: bounds,
    zoom: zoom,
    options: { radius: 75, maxZoom: 17 },
  });

  return (
    <>
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties;

        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[latitude, longitude]}
              icon={fetchIcon(
                pointCount,
                10 + (pointCount / points.length) * 40
              )}
              eventHandlers={{
                click: () => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    maxZoom
                  );
                  map.setView([latitude, longitude], expansionZoom, {
                    animate: true,
                  });
                },
              }}
            />
          );
        }

        var choiceValue = cluster.properties.clicks;

        switch (radioChoice) {
          case "Impressions":
            choiceValue = cluster.properties.impressions;
            break;
          case "Revenue":
            choiceValue = parseFloat(cluster.properties.revenue).toFixed(2);
            break;
          case "Events":
            choiceValue = cluster.properties.events;
            break;
          default:
            choiceValue = cluster.properties.clicks;
        }

        return (
          <div key={`div-${cluster.properties.name}`}>
            <Marker
              position={[latitude, longitude]}
              icon={pointIcon}
              key={`poi-${cluster.properties.name}`}
            >
              <Popup>
                {cluster.properties.name} <br />
                {radioChoice} : {choiceValue}
              </Popup>
            </Marker>

            <Circle
              center={[latitude, longitude]}
              pathOptions={{ fillColor: "red" }}
              radius={(choiceValue/maxValues[radioChoice]) * 1500}
            />
          </div>
        );
      })}
    </>
  );
}

export default Poi;
