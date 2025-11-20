import React from "react";

const HabitCard = ({ habit }) => {
  const { title, description, category, imageUrl, userName } = habit;
  return (
    <div className="card bg-base-100 shadow-sm hover:scale-105 transition-transform">
      <figure>
        <img src={imageUrl} alt="Shoes" className="w-full h-[300px]" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <h2 className="font-bold text-md">{userName}</h2>
        <p>{description}</p>
        <div className="badge badge-warning">{category}</div>
      </div>
    </div>
  );
};

export default HabitCard;
