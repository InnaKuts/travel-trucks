import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../common/Button/Button";
import LocationInput from "../../composite/LocationInput/LocationInput";
import ToggleButton from "../../composite/ToggleButton/ToggleButton";
import {
  selectLocationFilter,
  selectEquipmentFilters,
  selectFormFilter,
  selectAPIFilters,
  setLocationFilter,
  toggleEquipmentFilter,
  setFormFilter,
  fetchCampers,
  resetCampers,
} from "../../../store";
import styles from "./FiltersSidebar.module.css";

// Equipment filter options
const EQUIPMENT_OPTIONS = [
  { key: "AC", label: "AC", icon: "ac" },
  { key: "automatic", label: "Automatic", icon: "automatic" },
  { key: "kitchen", label: "Kitchen", icon: "kitchen" },
  { key: "TV", label: "TV", icon: "tv" },
  { key: "bathroom", label: "Bathroom", icon: "bathroom" },
];

// Vehicle type options
const VEHICLE_TYPE_OPTIONS = [
  { key: "panelTruck", label: "Van", icon: "van" },
  { key: "fullyIntegrated", label: "Fully Integrated", icon: "intergrated" },
  { key: "alcove", label: "Alcove", icon: "alcove" },
];

export const FiltersSidebar = () => {
  const dispatch = useDispatch();

  // Selectors to get data from store
  const location = useSelector(selectLocationFilter);
  const equipment = useSelector(selectEquipmentFilters);
  const vehicleType = useSelector(selectFormFilter);
  const apiFilters = useSelector(selectAPIFilters);

  // Event handlers
  const handleLocationChange = (e) => {
    dispatch(setLocationFilter(e.target.value));
  };

  const handleEquipmentToggle = (equipmentKey) => {
    dispatch(toggleEquipmentFilter(equipmentKey));
  };

  const handleVehicleTypeChange = (newType) => {
    // Toggle behavior: if same type is clicked, clear it
    dispatch(setFormFilter(vehicleType === newType ? "" : newType));
  };

  const handleSearch = () => {
    dispatch(resetCampers());
    dispatch(
      fetchCampers({
        filters: apiFilters,
        page: 1,
      })
    );
  };
  return (
    <div className={styles.sidebar}>
      {/* Location Section */}
      <div className={styles.locationSection}>
        <label className={styles.labelSubtle}>Location</label>
        <LocationInput
          value={location}
          onChange={handleLocationChange}
          placeholder="City"
        />
      </div>

      {/* Filters Section */}
      <div className={styles.filtersSection}>
        <span className={styles.filtersTitle}>Filters</span>

        {/* Vehicle Equipment */}
        <div className={styles.filterGroup}>
          <h3 className={styles.groupTitle}>Vehicle equipment</h3>
          <div className={styles.divider} />
          <div className={styles.toggleGrid}>
            {EQUIPMENT_OPTIONS.map((option) => (
              <ToggleButton
                key={option.key}
                icon={option.icon}
                isSelected={equipment[option.key] || false}
                onClick={() => handleEquipmentToggle(option.key)}
              >
                {option.label}
              </ToggleButton>
            ))}
          </div>
        </div>

        {/* Vehicle Type */}
        <div className={styles.filterGroup}>
          <h3 className={styles.groupTitle}>Vehicle type</h3>
          <div className={styles.divider} />
          <div className={styles.toggleGrid}>
            {VEHICLE_TYPE_OPTIONS.map((option) => (
              <ToggleButton
                key={option.key}
                icon={option.icon}
                isSelected={vehicleType === option.key}
                onClick={() => handleVehicleTypeChange(option.key)}
              >
                {option.label}
              </ToggleButton>
            ))}
          </div>
        </div>
      </div>

      {/* Search Button */}
      <Button variant="primary" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};
