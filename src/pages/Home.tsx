import {
  MapContainer,
  Popup,
  TileLayer,
  Marker,
  GeoJSON as LeafletGeoJSON,
} from "react-leaflet";
import { useRef, useState } from "react";
import { Map } from "leaflet";
import CircularProgress from "@mui/material/CircularProgress";
import { GeoJSON } from "../classes/GeoJSON";
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
        coordinates: [-30.03, -51.23],
        properties: {},
      },
      {
        coordinates: [-30.13, -51.13],
        properties: { das: 23423 },
      },
    ];

    const data = new GeoJSON({
      coordinatesWithData,
    });

    return <LeafletGeoJSON data={data} />;
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
            <Marker position={userCoords}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>

            {renderGeoJSONData()}
          </>
        )}
      </MapContainer>
    </div>
  );
}

export default MapContent;
