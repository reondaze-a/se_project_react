import './ClothesSection.css';
import ItemCard from '../../Main/ItemCard/ItemCard';
import { v4 as uuidv4 } from 'uuid';

export default function ClothesSection({ clothingItems, handleCardClick, openModal }) {
  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
          <h2 className="clothes-section__title">Your items</h2>
          <button className="clothes-section__add-button" onClick={openModal}>
            + Add new
          </button>
      </div>
      <div className="clothes-section__grid">
        {clothingItems.map((item) => (
          (
            <ItemCard
                key={uuidv4()}
                name={item.name}
                link={item.link}

                isOpen={() => {
                    handleCardClick(item);
                }}
            />
            )
        ))}
      </div>
    </section>
  );
}