import { MapContainer, TileLayer } from "react-leaflet";
import { GeoJSON, Marker } from "leaflet";
import { useRef, useState } from "react";
import { Map } from "leaflet";
import CircularProgress from "@mui/material/CircularProgress";
import { GeoJSON as GeoJSONClass } from "../classes/GeoJSON";
import useGeoLocation from "../hooks/useGeolocation";

function MapContent() {
  const [loadingMap, setLoadingMap] = useState(true);
  const mapRef = useRef<Map | null>(null);

  const flyToCoordinate = (coordinates: [number, number]) => {
    mapRef?.current?.setView(coordinates, undefined, {
      animate: true,
      duration: 1,
    });
  };

  const { coords: userCoords } = useGeoLocation({
    callback: flyToCoordinate,
  });

  const renderGeoJSONData = () => {
    const coordinatesWithData = [
      {
        coordinates: [-51.23, -30.03],
        properties: {},
      },
      {
        coordinates: [-51.13, -30.13],
        properties: { das: 23423 },
      },
    ];

    const data = new GeoJSONClass({
      coordinatesWithData,
    });

    var layer = new GeoJSON(data, {
      style: {},
      pointToLayer: (feature, latlng) => {
        return new Marker(latlng);
      },
      onEachFeature: (feature, layer) => {
        layer.on("click", () => {
          console.log("clicou em:", layer);
        });
      },
    });

    mapRef.current?.addLayer(layer);
  };

  return (
    <div className="mx-auto max-w-4xl p-4 border-2 border-gray-200 shadow-lg rounded">
      <MapContainer
        center={userCoords}
        zoom={13}
        scrollWheelZoom={false}
        ref={(ref) => {
          ref?.whenReady(() => {
            setLoadingMap(false);
          });
          mapRef.current = ref;
        }}
        className="h-[600px] w-full"
      >
        {loadingMap ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "600px",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {renderGeoJSONData()}
          </>
        )}
      </MapContainer>
    </div>
  );
}

export default MapContent;
