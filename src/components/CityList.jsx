import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
// import PropTypes from "prop-types";

function CityList({ isLoading, cities }) {
  if (isLoading) return <Spinner />;

  return (
    <ul className={styles.citiList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
