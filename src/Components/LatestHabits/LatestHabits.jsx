import React, { use, useEffect, useState } from "react";
import HabitCard from "../HabitCard/HabitCard";
import { AuthContext } from "../../Context/AuthContext";
import Loading from "../Loading/Loading";
import useAxios from "../Hooks/useAxios";

const LatestHabits = () => {
  const [habits, setHabits] = useState([]);
  const { loading, setLoading } = use(AuthContext);
  const axiosInstance = useAxios();

  useEffect(() => {
    // Only load once on mount
    axiosInstance
      .get("/latest-habits")
      .then((data) => {
        console.log(data);
        setHabits(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // useEffect(() => {
  //   // Only load once on mount
  //   fetch("https://b12-a10-future-box-server-omega.vercel.app//latest-habits")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setHabits(data);
  //       setLoading(false);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

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
