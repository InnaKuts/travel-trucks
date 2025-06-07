import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppNavigation from "../../components/features/AppNavigation/AppNavigation";
import { FiltersSidebar } from "../../components/features/FiltersSidebar/FiltersSidebar";
import VehicleCard from "../../components/features/VehicleCard/VehicleCard";
import Button from "../../components/common/Button/Button";
import Loader from "../../components/common/Loader/Loader";
import {
  selectCampers,
  selectCampersLoading,
  selectCampersError,
  selectCurrentPage,
  selectHasMore,
  fetchCampers,
  selectAPIFilters,
} from "../../store";
import styles from "./Catalog.module.css";

const Catalog = () => {
  const dispatch = useDispatch();

  // Redux selectors
  const campers = useSelector(selectCampers);
  const loading = useSelector(selectCampersLoading);
  const error = useSelector(selectCampersError);
  const currentPage = useSelector(selectCurrentPage);
  const hasMore = useSelector(selectHasMore);
  const apiFilters = useSelector(selectAPIFilters);

  // Load initial campers on mount
  useEffect(() => {
    if (campers.length === 0) {
      dispatch(fetchCampers({ filters: apiFilters, page: 1 }));
    }
  });

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      dispatch(
        fetchCampers({
          filters: apiFilters,
          page: currentPage + 1,
        })
      );
    }
  };

  const handleShowMore = (camperId) => {
    // TODO: Navigate to camper details page when implemented
    console.log(`Navigate to camper details: ${camperId}`);
  };

  return (
    <div className={styles.catalogPage}>
      <AppNavigation />

      <div className={styles.catalogContent}>
        {/* Sidebar Filter Panel */}
        <aside className={styles.sidebar}>
          <FiltersSidebar />
        </aside>

        {/* Main Catalog List */}
        <main className={styles.mainContent}>
          <div className={styles.catalogList}>
            {/* Error State */}
            {error && (
              <div className={styles.errorState}>
                <p>Error loading campers: {error}</p>
                <Button
                  variant="primary"
                  onClick={() =>
                    dispatch(fetchCampers({ filters: apiFilters, page: 1 }))
                  }
                >
                  Try Again
                </Button>
              </div>
            )}

            {/* Vehicle Cards */}
            {campers.length > 0 && (
              <div className={styles.vehicleGrid}>
                {campers.map((camper) => (
                  <VehicleCard
                    key={camper.id}
                    camper={camper}
                    onShowMore={handleShowMore}
                    className={styles.vehicleCard}
                  />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && campers.length === 0 && !error && (
              <div className={styles.emptyState}>
                <h3>No campers found</h3>
                <p>Try adjusting your filters to see more results.</p>
              </div>
            )}

            {/* Loading State */}
            {loading && campers.length === 0 && (
              <div className={styles.loadingState}>
                <Loader text="Loading campers..." />
              </div>
            )}

            {/* Load More Button */}
            {hasMore && campers.length > 0 && (
              <div className={styles.loadMoreContainer}>
                <Button
                  variant="secondary"
                  onClick={handleLoadMore}
                  disabled={loading}
                  className={styles.loadMoreButton}
                >
                  {loading ? "Loading..." : "Load more"}
                </Button>
              </div>
            )}

            {/* Loading More Indicator */}
            {loading && campers.length > 0 && (
              <div className={styles.loadingMore}>
                <Loader size={20} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Catalog;
