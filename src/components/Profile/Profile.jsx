import "./Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

export default function Profile({
  clothingItems,
  handleCardClick,
  openModal,
  updateProfile,
  logOutModal,
  toggleLike
}) {
  return (
    <section className="profile">
      <SideBar updateProfile={updateProfile} logOutModal={logOutModal} />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        openModal={openModal}
        toggleLike={toggleLike}
      />
    </section>
  );
}
