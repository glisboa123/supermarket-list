import "./index.css";

export const ListCard = ({ item, onClick }) => {
  return (
    <div className="list-card-container" onClick={() => onClick(item)}>
      <img
        className="check-box"
        src={`/images/${item?.checked ? "checked.svg" : "unchecked.svg"}`}
        alt="checked-item"
      ></img>
      <div className="list-card-text-container">
        <span className="list-card-title">{item?.name}</span>
        <span className="list-card-subtitle">{item?.quantity} unidades</span>
      </div>
      <img src="/images/arrow.svg" alt="arrow-icon" className="arrow-icon" />
    </div>
  );
};
