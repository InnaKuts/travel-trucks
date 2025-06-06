import Button from "../../components/common/Button/Button";
import Icon from "../../components/common/Icon/Icon";
import Tag from "../../components/common/Tag/Tag";
import Favourite from "../../components/common/Favourite/Favourite";
import RatingStars from "../../components/common/RatingStars/RatingStars";
import Input from "../../components/common/Input/Input";
import PriceDisplay from "../../components/common/PriceDisplay/PriceDisplay";
import LocationInfo from "../../components/common/LocationInfo/LocationInfo";
import ReviewSummary from "../../components/common/ReviewSummary/ReviewSummary";
import DatePicker from "../../components/common/DatePicker/DatePicker";
import LocationInput from "../../components/common/LocationInput/LocationInput";
import Loader from "../../components/common/Loader/Loader";
import ReviewCard from "../../components/common/ReviewCard/ReviewCard";
import ToggleButton from "../../components/common/ToggleButton/ToggleButton";
import FeatureDetailsCard from "../../components/common/FeatureDetailsCard/FeatureDetailsCard";
import BookingFormCard from "../../components/common/BookingFormCard/BookingFormCard";
import styles from "./DesignCatalog.module.css";

const DesignCatalog = () => {
  // Sample data for components

  const sampleCamper = {
    id: "1",
    name: "Road Bear C 23-25",
    form: "alcove",
    length: "7.3m",
    width: "2.65m",
    height: "3.65m",
    tank: "208l",
    consumption: "30l/100km",
    AC: true,
    automatic: true,
    kitchen: true,
    TV: true,
    bathroom: true,
    water: true,
    gas: false,
    radio: true,
    refrigerator: false,
    microwave: true,
  };

  return (
    <div className={styles.catalog}>
      <h1>Design System Catalog</h1>

      <section className={styles.section}>
        <h2>Color Palette</h2>
        <div className={styles.row}>
          <div className={styles.colorBox}>
            <div
              className={styles.colorSample}
              style={{ backgroundColor: "var(--color-main)" }}
            ></div>
            <span>Main</span>
            <code>#101828</code>
          </div>
          <div className={styles.colorBox}>
            <div
              className={styles.colorSample}
              style={{ backgroundColor: "var(--color-text)" }}
            ></div>
            <span>Text</span>
            <code>#475467</code>
          </div>
          <div className={styles.colorBox}>
            <div
              className={styles.colorSample}
              style={{ backgroundColor: "var(--color-gray)" }}
            ></div>
            <span>Gray</span>
            <code>#6C717B</code>
          </div>
          <div className={styles.colorBox}>
            <div
              className={styles.colorSample}
              style={{ backgroundColor: "var(--color-gray-light)" }}
            ></div>
            <span>Gray Light</span>
            <code>#DADDE1</code>
          </div>
          <div className={styles.colorBox}>
            <div
              className={styles.colorSample}
              style={{ backgroundColor: "var(--color-button)" }}
            ></div>
            <span>Button</span>
            <code>#E44848</code>
          </div>
          <div className={styles.colorBox}>
            <div
              className={styles.colorSample}
              style={{ backgroundColor: "var(--color-button-hover)" }}
            ></div>
            <span>Button Hover</span>
            <code>#D84343</code>
          </div>
          <div className={styles.colorBox}>
            <div
              className={styles.colorSample}
              style={{ backgroundColor: "var(--color-rating)" }}
            ></div>
            <span>Rating</span>
            <code>#FFC531</code>
          </div>
          <div className={styles.colorBox}>
            <div
              className={styles.colorSample}
              style={{ backgroundColor: "var(--color-badges)" }}
            ></div>
            <span>Badges</span>
            <code>#F2F4F7</code>
          </div>
          <div className={styles.colorBox}>
            <div
              className={styles.colorSample}
              style={{ backgroundColor: "var(--color-inputs)" }}
            ></div>
            <span>Inputs</span>
            <code>#F7F7F7</code>
          </div>
          <div className={styles.colorBox}>
            <div
              className={styles.colorSample}
              style={{ backgroundColor: "var(--color-white)" }}
            ></div>
            <span>White</span>
            <code>#FFFFFF</code>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Buttons</h2>
        <div className={styles.row}>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Icons</h2>
        <div className={styles.row}>
          <Icon name="heart" />
          <Icon name="heart" variant="filled" />
          <Icon name="star" />
          <Icon name="star" variant="filled" />
          <Icon name="map" />
          <Icon name="ac" />
          <Icon name="kitchen" />
          <Icon name="tv" />
          <Icon name="automatic" />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Tags</h2>
        <div className={styles.row}>
          <Tag icon="automatic">Automatic</Tag>
          <Tag icon="ac">AC</Tag>
          <Tag icon="kitchen">Kitchen</Tag>
          <Tag icon="water">Water</Tag>
          <Tag icon="tv">TV</Tag>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Favourite</h2>
        <div className={styles.row}>
          <Favourite isActive={false} />
          <Favourite isActive={true} />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Rating Stars</h2>
        <div className={styles.column}>
          <RatingStars rating={0} />
          <RatingStars rating={2.5} />
          <RatingStars rating={4} />
          <RatingStars rating={5} />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Inputs</h2>
        <div className={styles.column}>
          <Input placeholder="Name" />
          <Input placeholder="Email" type="email" />
          <Input placeholder="Comment" multiline />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Price Display</h2>
        <div className={styles.row}>
          <PriceDisplay amount={8000} />
          <PriceDisplay amount={12500} />
          <PriceDisplay amount={999.99} />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Location Info</h2>
        <div className={styles.column}>
          <LocationInfo location="Ukraine, Kyiv" />
          <LocationInfo location="Poland, Warsaw" />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Review Summary</h2>
        <div className={styles.column}>
          <ReviewSummary rating={4.5} reviewCount={42} />
          <ReviewSummary rating={3.8} reviewCount={15} showLink={false} />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Location Input</h2>
        <div className={styles.column}>
          <LocationInput placeholder="City" />
          <LocationInput placeholder="City" value="Kyiv, Ukraine" />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Date Picker</h2>
        <div className={styles.column}>
          <DatePicker placeholder="Booking date*" />
          <DatePicker placeholder="Check-in date" selectedDate={new Date()} />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Toggle Buttons</h2>
        <div className={styles.row}>
          <ToggleButton icon="van">Van</ToggleButton>
          <ToggleButton icon="intergrated" isSelected>
            Fully Integrated
          </ToggleButton>
          <ToggleButton icon="alcove">Alcove</ToggleButton>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Feature Details Card</h2>
        <div className={styles.column}>
          <FeatureDetailsCard camper={sampleCamper} />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Loader</h2>
        <div className={styles.column}>
          <Loader />
          <Loader text="Loading campers..." />
          <Loader size={24} text="Please wait..." />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Review Card</h2>
        <div className={styles.column}>
          <ReviewCard
            reviewerName="Alice"
            rating={5}
            comment="The Mavericks panel truck was a perfect choice for my solo road trip. Compact, easy to drive, and had all the essentials. The kitchen facilities were sufficient, and the overall experience was fantastic."
          />
          <ReviewCard
            reviewerName="Bob"
            rating={4}
            comment="Great experience! The camper was clean and well-equipped. Would definitely book again."
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Booking Form Card</h2>
        <div className={styles.column}>
          <BookingFormCard
            onSubmit={(values) => console.log("Booking submitted:", values)}
          />
        </div>
      </section>
    </div>
  );
};

export default DesignCatalog;
