export default function ItemCard({ name, link, isOpen }) {
    return (
        <div className="item-card" onClick={isOpen}>
            <h2 className="item-card__header">{name}</h2>
            <img src={link} alt={name} className="item-card__image" />
        </div>
    );
}