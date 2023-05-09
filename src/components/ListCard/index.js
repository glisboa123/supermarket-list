import "./index.css";

export const ListCard = (prop) => {
  return (
    <div className="list-card-container">
      <span>{prop.item.name}</span>
    </div>
  );
};
