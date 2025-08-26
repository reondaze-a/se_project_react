import "./Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

export default function Profile({ clothingItems, handleCardClick, openModal, updateProfile }) {
  return (
    <section className="profile">
      <SideBar updateProfile={updateProfile}/>
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        openModal={openModal}
      />
    </section>
  );
}
