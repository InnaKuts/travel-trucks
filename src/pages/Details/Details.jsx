import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AppNavigation from "../../components/features/AppNavigation/AppNavigation";
import ReviewSummary from "../../components/composite/ReviewSummary/ReviewSummary";
import LocationInfo from "../../components/composite/LocationInfo/LocationInfo";
import PriceDisplay from "../../components/composite/PriceDisplay/PriceDisplay";
import FeatureDetailsCard from "../../components/features/FeatureDetailsCard/FeatureDetailsCard";
import BookingFormCard from "../../components/features/BookingFormCard/BookingFormCard";
import ReviewCard from "../../components/composite/ReviewCard/ReviewCard";
import Loader from "../../components/common/Loader/Loader";
import {
  selectCurrentCamper,
  selectCamperLoading,
  selectCamperError,
  fetchCamperById,
} from "../../store";
import styles from "./Details.module.css";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Features");

  // Redux selectors
  const camper = useSelector(selectCurrentCamper);
  const loading = useSelector(selectCamperLoading);
  const error = useSelector(selectCamperError);

  // Load camper details on mount
  useEffect(() => {
    if (id) {
      dispatch(fetchCamperById(id));
    }
  }, [dispatch, id]);

  // Loading state
  if (loading) {
    return (
      <div className={styles.detailsPage}>
        <AppNavigation />
        <div className={styles.loadingState}>
          <Loader text="Loading camper details..." />
        </div>
      </div>
    );
  }

  // Error state
  if (error && !loading) {
    return (
      <div className={styles.detailsPage}>
        <AppNavigation />
        <div className={styles.errorState}>
          <h2>Error loading camper details</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // No camper found
  if (!camper && !loading) {
    return (
      <div className={styles.detailsPage}>
        <AppNavigation />
        <div className={styles.errorState}>
          <h2>Camper not found</h2>
          <p>The requested camper could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.detailsPage}>
      {/* AppNavigation */}
      <AppNavigation />

      {/* Details Header */}
      <div className={styles.detailsHeader}>
        {/* Title */}
        <h1 className={styles.camperTitle}>{camper?.name}</h1>

        {/* Reviews and Location HStack */}
        <div className={styles.reviewLocationStack}>
          <ReviewSummary
            rating={camper?.rating}
            reviewCount={camper?.reviews?.length || 0}
          />
          <LocationInfo location={camper?.location} />
        </div>

        {/* Price */}
        <PriceDisplay amount={camper?.price} currency="EUR" />

        {/* Images HStack - horizontally scrollable */}
        <div className={styles.imageGallery}>
          {camper?.gallery?.map((image, index) => (
            <div key={index} className={styles.imageContainer}>
              <img
                src={image.thumb}
                alt={`${camper.name} image ${index + 1}`}
                className={styles.galleryImage}
              />
            </div>
          ))}
        </div>

        {/* Description */}
        <p className={styles.description}>{camper?.description}</p>
      </div>

      {/* Main Content HStack */}
      <div className={styles.mainContent}>
        {/* TabControl - 50% width */}
        <div className={styles.tabControl}>
          {/* Tab Headers */}
          <div className={styles.tabHeaders}>
            <button
              className={`${styles.tabButton} ${
                activeTab === "Features" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("Features")}
            >
              Features
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === "Reviews" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("Reviews")}
            >
              Reviews
            </button>
          </div>

          {/* Tab Divider */}
          <div className={styles.tabDivider}>
            <div
              className={`${styles.activeIndicator} ${
                activeTab === "Features"
                  ? styles.featuresActive
                  : styles.reviewsActive
              }`}
            />
          </div>

          {/* Tab Content */}
          <div className={styles.tabContent}>
            {activeTab === "Features" && <FeatureDetailsCard camper={camper} />}
            {activeTab === "Reviews" && (
              <div className={styles.reviewsList}>
                {camper?.reviews?.map((review, index) => (
                  <ReviewCard
                    key={index}
                    reviewerName={review.reviewer_name}
                    rating={review.reviewer_rating}
                    comment={review.comment}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* BookingFormCard - 50% width */}
        <div className={styles.bookingSection}>
          <BookingFormCard />
        </div>
      </div>
    </div>
  );
};

export default Details;
