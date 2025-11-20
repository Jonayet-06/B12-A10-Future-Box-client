import React from "react";
import { Link } from "react-router";

const PublicHabitCard = ({ habit }) => {
  const { _id, title, description, category, imageUrl, userName } = habit;
  return (
    <div>
      <div className="card bg-base-100 shadow-sm hover:scale-105 transition-transform">
        <figure>
          <img src={imageUrl} alt="Shoes" className="w-full h-[300px]" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <h2 className="font-bold text-md">{userName}</h2>
          <p>{description}</p>
          <div className="badge badge-warning">{category}</div>
          <div className="card-actions">
            <Link to={`/habitdetails/${_id}`}>
              <button className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850] text-white">
                See Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicHabitCard;
