import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("let");
  const lng = searchParams.get("lng");
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h2>
        position {lat} {lng}{" "}
      </h2>
      <button onClick={() => setSearchParams({ lat: 23, lng: 65 })}>
        Change pos
      </button>
    </div>
  );
}

export default Map;
