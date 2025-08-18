import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "./contexts/CitiesContext";
import { useGeolocation } from "./hooks/useGeolocation";
import Button from "./Button";

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 20]);
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    isloading: isloadingPosition,
    position: geolocationposition,
    getPosition,
  } = useGeolocation();
  const simple = [setMapPosition, searchParams, setSearchParams];
  console.log(simple);

  // temp();

  const mapLng = searchParams.get("lat");
  const mapLat = searchParams.get("lng");

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition({ mapLat, mapLng });
    },
    [mapLat, mapLng]
  );

  useEffect(function () {}, [geolocationposition]);
  return (
    <div className={styles.mapContainer}>
      <Button type={"position"} onClick={getPosition}>
        {isloadingPosition ? "Loading..." : "use this location"}
      </Button>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={5}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={[mapLat || 40, mapLng || 0]} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
