import React, { use, useEffect, useState } from "react";
import HabitCard from "../HabitCard/HabitCard";
import { AuthContext } from "../../Context/AuthContext";
import Loading from "../Loading/Loading";

const LatestHabits = () => {
  const [habits, setHabits] = useState([]);
  const { loading, setLoading } = use(AuthContext);

  useEffect(() => {
    // Only load once on mount
    fetch("http://localhost:3000/latest-habits")
      .then((res) => res.json())
      .then((data) => {
        setHabits(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <h2 className="font-bold text-5xl text-center mb-10">Recent Habits</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {habits.map((habit) => (
          <HabitCard key={habit._id} habit={habit} />
        ))}
      </div>
    </div>
  );
};

export default LatestHabits;
