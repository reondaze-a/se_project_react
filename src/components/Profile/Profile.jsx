import './Profile.css';
import Sidebar from './SideBar/Sidebar';
import ClothesSection from './ClothesSection/ClothesSection';



export default function Profile({ clothingItems, handleCardClick, openModal }) {
  return (
    <section className="profile">
      <Sidebar />
      <ClothesSection clothingItems={clothingItems} handleCardClick={handleCardClick} openModal={openModal}/>
    </section>
  );
}