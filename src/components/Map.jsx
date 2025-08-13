import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, Marker, TileLayer, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "./contexts/CitiesContext";
// import { useMap } from "react-leaflet";

function Map() {
  const navigate = useNavigate();
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 20]);
  const [searchParams, setSearchParams] = useSearchParams();

  const simple = [setMapPosition, searchParams, setSearchParams];
  console.log(simple);
  console.log(navigate);
  // async function temp() {
  //   console.log(cities);
  // }

  // temp();

  const mapLng = searchParams.get("lat");
  const mapLat = searchParams.get("lng");

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition({ mapLat, mapLng });
    },
    [mapLat, mapLng]
  );
  return (
    <div className={styles.mapContainer}>
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
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

export default Map;
