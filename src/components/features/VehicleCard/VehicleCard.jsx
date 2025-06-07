import PriceDisplay from "../../composite/PriceDisplay/PriceDisplay";
import LocationInfo from "../../composite/LocationInfo/LocationInfo";
import ReviewSummary from "../../composite/ReviewSummary/ReviewSummary";
import Tag from "../../common/Tag/Tag";
import Favourite from "../../common/Favourite/Favourite";
import Button from "../../common/Button/Button";
import styles from "./VehicleCard.module.css";

const VehicleCard = ({ camper, onShowMore, className = "" }) => {
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

  // Get main image
  const mainImage = camper.gallery?.[0]?.thumb || camper.gallery?.[0]?.original;

  const handleShowMore = () => {
    if (onShowMore) {
      onShowMore(camper.id);
    } else {
      // TODO: Navigate to /catalog/:id when routing is set up
      console.log(`Navigate to camper details: ${camper.id}`);
    }
  };

  return (
    <div className={`${styles.card} ${className}`}>
      {/* Image Section */}
      <div className={styles.imageContainer}>
        {mainImage ? (
          <img src={mainImage} alt={camper.name} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span>No Image</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className={styles.content}>
        {/* Header row: Name + Spacer + Price + Favourite */}
        <div className={styles.header}>
          <h3 className={styles.name}>{camper.name}</h3>
          <div className={styles.spacer}></div>
          <PriceDisplay amount={camper.price} />
          <Favourite isActive={false} />
        </div>

        {/* Review/location row */}
        <div className={styles.reviewLocationRow}>
          <ReviewSummary
            rating={camper.rating}
            reviewCount={camper.reviews?.length || 0}
            showLink={true}
          />
          <LocationInfo location={camper.location} />
        </div>

        {/* Description - single line with ellipsis */}
        <p className={styles.description}>{camper.description}</p>

        {/* Equipment tags - wrap row */}
        <div className={styles.equipment}>
          {availableEquipment.map(([key, feature]) => (
            <Tag key={key} icon={feature.icon}>
              {feature.label}
            </Tag>
          ))}
        </div>

        {/* Show more button */}
        <Button variant="primary" onClick={handleShowMore}>
          Show more
        </Button>
      </div>
    </div>
  );
};

export default VehicleCard;
