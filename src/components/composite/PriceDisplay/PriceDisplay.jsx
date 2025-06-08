import styles from "./PriceDisplay.module.css";

const PriceDisplay = ({ amount, currency = "EUR", className = "" }) => {
  const formatPrice = (price, curr) => {
    const formatted = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: false,
    }).format(price);

    return curr === "EUR" ? `€${formatted}` : `$${formatted}`;
  };

  return (
    <span className={`${styles.price} ${className}`}>
      {formatPrice(amount, currency)}
    </span>
  );
};

export default PriceDisplay;
