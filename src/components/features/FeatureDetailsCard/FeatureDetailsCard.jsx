import Tag from "../../common/Tag/Tag";
import styles from "./FeatureDetailsCard.module.css";

const FeatureDetailsCard = ({ camper, className = "" }) => {
  if (!camper) {
    return null;
  }

  // Equipment features mapping
  const equipmentFeatures = {
    AC: { icon: "ac", label: "AC" },
    automatic: { icon: "automatic", label: "Automatic" },
    kitchen: { icon: "kitchen", label: "Kitchen" },
    TV: { icon: "tv", label: "TV" },
    bathroom: { icon: "bathroom", label: "Bathroom" },
    water: { icon: "water", label: "Water" },
    gas: { icon: "gas", label: "Gas" },
    radio: { icon: "radio", label: "Radio" },
    refrigerator: { icon: "refrigerator", label: "Refrigerator" },
    microwave: { icon: "microwave", label: "Microwave" },
  };

  // Filter available equipment
  const availableEquipment = Object.entries(equipmentFeatures).filter(
    ([key]) => camper[key]
  );

  // Build vehicle specifications
  const vehicleSpecs = {
    Form: camper.form || "Unknown",
    Length: camper.length || "N/A",
    Width: camper.width || "N/A",
    Height: camper.height || "N/A",
    Tank: camper.tank || "N/A",
    Consumption: camper.consumption || "N/A",
  };

  return (
    <div className={`${styles.card} ${className}`}>
      {/* Equipment Section */}
      {availableEquipment.length > 0 && (
        <div className={styles.equipment}>
          {availableEquipment.map(([key, feature]) => (
            <Tag key={key} icon={feature.icon}>
              {feature.label}
            </Tag>
          ))}
        </div>
      )}

      {/* Vehicle Details Section */}
      <div className={styles.vehicleDetailsSection}>
        <h3 className={styles.sectionTitle}>Vehicle details</h3>
        <div className={styles.divider}></div>
        <div className={styles.specs}>
          {Object.entries(vehicleSpecs).map(([key, value]) => (
            <div key={key} className={styles.specRow}>
              <span className={styles.specLabel}>{key}</span>
              <span className={styles.specValue}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureDetailsCard;
