import React from "react";
import Banner from "../Banner/Banner";
import WhyBuildHabit from "../WhyBuildsHabit/WhyBuildHabit";

import ReleventOne from "../Relevent/ReleventOne";
import Relevent from "../Relevent/Relevent";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Banner></Banner>
      <WhyBuildHabit></WhyBuildHabit>
      <Relevent></Relevent>
      <ReleventOne></ReleventOne>
    </div>
  );
};

export default Home;
