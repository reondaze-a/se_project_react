import "./ClothesSection.css";
import ItemCard from "../../Main/ItemCard/ItemCard";
import { useAuth } from "../../../contexts/CurrentUserContext";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  openModal,
  toggleLike,
}) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div style={{ opacity: 0 }}>Loading...</div>;
  } // Loading user state

  const filteredItems = clothingItems.filter(
    (item) => currentUser?._id === item.owner
  );

  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your items</h2>
        <button className="clothes-section__add-button" onClick={openModal}>
          + Add new
        </button>
      </div>
      <div className="clothes-section__grid">
        {filteredItems.map((item) => (
          <ItemCard
            name={item.name}
            link={item.imageUrl}
            key={item._id}
            id={item._id} // prop for id
            likes={item.likes}
            isOpen={() => {
              handleCardClick(item);
            }}
            toggleLike={toggleLike}
          />
        ))}
      </div>
    </section>
  );
}
