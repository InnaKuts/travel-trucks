import React from "react";
import { useNavigate } from "react-router-dom";
import AppNavigation from "../../components/features/AppNavigation/AppNavigation";
import Button from "../../components/common/Button/Button";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  const handleViewNowClick = () => {
    navigate("/catalog");
  };

  return (
    <div className={styles.homePage}>
      <AppNavigation />

      <div className={styles.heroSection}>
        <div className={styles.heroBackground}></div>

        <div className={styles.heroContent}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>Campers of your dreams</h1>
            <p className={styles.subtitle}>
              You can find everything you want in our catalog
            </p>
          </div>

          <Button variant="primary" onClick={handleViewNowClick} s>
            View Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
