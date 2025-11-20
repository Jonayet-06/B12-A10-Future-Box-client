import React from "react";
import Banner from "../Banner/Banner";
import WhyBuildHabit from "../WhyBuildsHabit/WhyBuildHabit";
import ReleventOne from "../Relevent/ReleventOne";
import Relevent from "../Relevent/Relevent";
import LatestHabits from "../LatestHabits/LatestHabits";

// const latestHabitsPromise = fetch("http://localhost:3000/latest-habits").then(
//   (res) => res.json()
// );
const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Banner></Banner>
      <LatestHabits></LatestHabits>
      <WhyBuildHabit></WhyBuildHabit>
      <Relevent></Relevent>
      <ReleventOne></ReleventOne>
    </div>
  );
};

export default Home;
