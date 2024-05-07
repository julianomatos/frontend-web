import { MapContainer, TileLayer } from "react-leaflet";
import { GeoJSON, Marker } from "leaflet";
import { useRef, useState } from "react";
import { Map } from "leaflet";
import CircularProgress from "@mui/material/CircularProgress";
import { GeoJSON as GeoJSONClass } from "../classes/GeoJSON";
import useGeoLocation from "../hooks/useGeolocation";
import { useQuery } from "@tanstack/react-query";
import { FormattedCSVDataProperties, getCSVData } from "../services/getCSVData";
import BottomSheet from "../components/BottomSheet";
import MarkerBottomSheetData from "../components/MarkerBottomSheetData";
import Flatlist from "../components/Flatlist";

function MapContent() {
  const [loadingMap, setLoadingMap] = useState(true);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [markerToDisplay, setMarkerToDisplay] =
    useState<FormattedCSVDataProperties | null>(null);

  const mapRef = useRef<Map | null>(null);

  const flyToCoordinate = (coordinates: [number, number]) => {
    mapRef?.current?.setView(coordinates, undefined, {
      animate: true,
      duration: 1,
    });
  };

  const closeBottomSheetCallback = () => {
    setMarkerToDisplay(null);
  };

  const { coords: userCoords } = useGeoLocation({
    callback: flyToCoordinate,
  });

  const { data: coordinatesWithData, isLoading: isLoadingCSVData } = useQuery({
    queryKey: ["csv-data"],
    queryFn: getCSVData,
  });

  const renderGeoJSONData = () => {
    if (!coordinatesWithData) return;

    const data = new GeoJSONClass({
      coordinatesWithData,
    });



    var layer = new GeoJSON(data, {
      style: {},
      pointToLayer: (_feature, latlng) => {
        return new Marker(latlng);
      },
      onEachFeature: (feature, layer) => {
        layer.on("click", () => {
          setIsBottomSheetOpen(true);
          setMarkerToDisplay(feature.properties);
        });
      },
    });

    mapRef.current?.addLayer(layer);
  };
  const dataLocal = [{
    "LOCAL": "Centro VIDA",
    "VOLUNTARIOS": "p/ escala",
    "DOACOES": "Precisando",
    "ENDERECO": "Av. Baltazar de Oliveira Garcia, 2132",
    "Latitude": -29.717521,
    "Longitude": -51.129777,
    "GRUPO WHATS": "https://bit.ly/3UstHLx",
    "OBS": "PRECISANDO: toalhas, colch\u00f5es, cobertores, \u00e1gua, material de higiene, marmitas"
  },
  {
    "LOCAL": "Gigantinho",
    "VOLUNTARIOS": "s/ infos",
    "DOACOES": "s/ infos",
    "ENDERECO": "Avenida Padre Cacique, 891 Ao lado do est\u00e1dio Beira-Rio - Praia de Belas, Porto Alegre - RS, 90810-240",
    "Latitude": -30.035701,
    "Longitude": -51.228713,
    "GRUPO WHATS": null,
    "OBS": "PRECISANDO:\u00a0"
  },
 
  {
    "LOCAL": "Igreja Batista Braza - ZN",
    "VOLUNTARIOS": "p/ escala",
    "DOACOES": "\u00d1 recebe",
    "ENDERECO": "Rua Dona Alzira, 275",
    "Latitude": -30.035701,
    "Longitude": -51.212722,
    "GRUPO WHATS": "https://bit.ly/3wmDF96",
    "OBS": "PRECISANDO:\u00a0veterin\u00e1rios"
  },



];
  return (
    <>
      <div className="mx-auto max-w-4xl p-4 border-4 border-gray-200 shadow-lg rounded ">
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
          className="h-[600px] w-full relative"
        >
          {loadingMap || isLoadingCSVData ? (
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
          <div className="absolute bottom-1 left-[100px] z-[10000]">
            <Flatlist data={dataLocal} />
          </div>
        </MapContainer>
      </div>
      <BottomSheet
        isBottomSheetOpen={isBottomSheetOpen}
        setIsBottomSheetOpen={setIsBottomSheetOpen}
        closeBottomSheetCallback={closeBottomSheetCallback}
      >
        {markerToDisplay ? (
          <MarkerBottomSheetData markerToDisplay={markerToDisplay} />
        ) : null}
      </BottomSheet>
    </>
  );
}

export default MapContent;
