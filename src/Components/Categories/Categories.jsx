import React, { use } from "react";
import { NavLink } from "react-router";

const categoryPromise = fetch(
  "https://b12-a10-future-box-server-omega.vercel.app//categories"
).then((res) => res.json());
const Categories = () => {
  const categories = use(categoryPromise);
  return (
    <div>
      <h2 className="font-bold text-2xl">
        All Categories({categories.length})
      </h2>
      <div className="grid grid-cols-1 gap-5 mt-5">
        {categories.map((category) => (
          <NavLink
            key={category.id}
            className="btn"
            to={`/categories/${category.id}`}
          >
            {category.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Categories;
