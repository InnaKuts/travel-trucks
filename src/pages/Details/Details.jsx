import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AppNavigation from "../../components/features/AppNavigation/AppNavigation";
import ReviewSummary from "../../components/composite/ReviewSummary/ReviewSummary";
import LocationInfo from "../../components/composite/LocationInfo/LocationInfo";
import PriceDisplay from "../../components/composite/PriceDisplay/PriceDisplay";
import FeatureDetailsCard from "../../components/features/FeatureDetailsCard/FeatureDetailsCard";
import BookingFormCard from "../../components/features/BookingFormCard/BookingFormCard";
import ReviewCard from "../../components/composite/ReviewCard/ReviewCard";
import Loader from "../../components/common/Loader/Loader";
import ImageModal from "../../components/common/ImageModal/ImageModal";
import {
  selectCurrentCamper,
  selectCamperLoading,
  selectCamperError,
  fetchCamperById,
} from "../../store";
import styles from "./Details.module.css";

const Details = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Determine initial tab from hash
  const getInitialTab = () => {
    const hash = location.hash.substring(1); // Remove the # symbol
    return hash === "reviews" ? "Reviews" : "Features";
  };

  const [activeTab, setActiveTab] = useState(getInitialTab());

  // Image modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle tab change with URL hash update
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    const hash = tabName === "Reviews" ? "#reviews" : "";
    navigate(`/catalog/${id}${hash}`, { replace: true });
  };

  // Image modal handlers
  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < (camper?.gallery?.length || 0) - 1 ? prevIndex + 1 : prevIndex
    );
  };

  // Listen for hash changes (browser back/forward)
  useEffect(() => {
    const hash = location.hash.substring(1);
    const newTab = hash === "reviews" ? "Reviews" : "Features";
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  }, [location.hash, activeTab]);

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
                onClick={() => handleImageClick(index)}
                style={{ cursor: "pointer" }}
              />
            </div>
          ))}
        </div>

        {/* Description */}
        <p className={styles.description}>{camper?.description}</p>
      </div>

      {/* Tab Section - Full Width */}
      <div className={styles.tabSection}>
        {/* Tab Headers - Leading alignment */}
        <div className={styles.tabHeaders}>
          <button
            className={`${styles.tabButton} ${
              activeTab === "Features" ? styles.activeTab : ""
            }`}
            onClick={() => handleTabChange("Features")}
          >
            Features
          </button>
          <button
            className={`${styles.tabButton} ${
              activeTab === "Reviews" ? styles.activeTab : ""
            }`}
            onClick={() => handleTabChange("Reviews")}
          >
            Reviews
          </button>
        </div>

        {/* Tab Divider - 100% width */}
        <div className={styles.tabDivider}>
          <div
            className={`${styles.activeIndicator} ${
              activeTab === "Features"
                ? styles.featuresActive
                : styles.reviewsActive
            }`}
          />
        </div>
      </div>

      {/* Content HStack - 50% ActiveTab + 50% Booking */}
      <div className={styles.contentSection}>
        {/* Active Tab Content - 50% width */}
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

        {/* BookingFormCard - 50% width */}
        <div className={styles.bookingSection}>
          <BookingFormCard />
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        image={camper?.gallery?.[currentImageIndex]}
        camperName={camper?.name}
        currentIndex={currentImageIndex}
        totalImages={camper?.gallery?.length || 0}
        onPrevious={handlePreviousImage}
        onNext={handleNextImage}
      />
    </div>
  );
};

export default Details;
