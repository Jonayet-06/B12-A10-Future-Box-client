import React, { use } from "react";
import HabitCard from "../HabitCard/HabitCard";

const LatestHabits = ({ latestHabitsPromise }) => {
  const habits = use(latestHabitsPromise);
  console.log(habits);
  return (
    <div>
      <h2 className="font-bold text-5xl text-center mb-10">Recent Habits</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {habits.map((habit) => (
          <HabitCard key={habit._id} habit={habit}></HabitCard>
        ))}
      </div>
    </div>
  );
};

export default LatestHabits;
