import Icon from "../Icon/Icon";
import styles from "./LocationInfo.module.css";

const LocationInfo = ({ location, className = "" }) => {
  return (
    <div className={`${styles.location} ${className}`}>
      <Icon name="map" size="sm" />
      <span>{location}</span>
    </div>
  );
};

export default LocationInfo;
