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
import useUrlPosition from "./hooks/useUrlPosition";
import Button from "./Button";
import { latLng } from "leaflet";
console.log(latLng);

function Map() {
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([40, 20]);
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    isloading: isloadingPosition,
    position: geolocationposition,
    getPosition,
  } = useGeolocation();

  const [cyty, setCyty] = useState("");
  console.log(cyty);

  console.log(searchParams);

  const { mapLat, mapLng } = useUrlPosition();
  // console.log(useUrlPosition);

  // const mapLng = searchParams.get("lat");
  // const mapLat = searchParams.get("lng");

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition({ mapLat, mapLng });
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationposition)
        setMapPosition([geolocationposition.lat, geolocationposition.lng]);
    },
    [geolocationposition]
  );
  useEffect(
    function () {
      if (geolocationposition)
        setMapPosition([geolocationposition.lat, geolocationposition.lng]);
    },
    [geolocationposition]
  );
  return (
    <div className={styles.mapContainer}>
      {!geolocationposition && (
        <Button type={"position"} onClick={getPosition}>
          {isloadingPosition ? "Loading..." : "use this location"}
        </Button>
      )}
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

        {cities.map(
          (city) => (
            setCyty(city.position.lat),
            (
              <Marker
                position={[city.position.lat, city.position.lng]}
                key={city.id}
              >
                <Popup>
                  <span>{city.emoji}</span>
                  <span>{city.cityName}</span>
                </Popup>
              </Marker>
            )
          )
        )}

        <ChangeCenter position={[mapLat || 40, mapLng || 0]} />
        <DetectClick setSearchParams={setSearchParams} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick({ setSearchParams }) {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  console.log(setSearchParams());
}

export default Map;
