import React, { use, useEffect, useState } from "react";
import PublicHabitCard from "../PublicHabitCard/PublicHabitCard";
import { AuthContext } from "../../Context/AuthContext";
import Loading from "../Loading/Loading";
import { motion, AnimatePresence } from "framer-motion";
import useAxios from "../Hooks/useAxios";

const PublicHabits = () => {
  const { loading, setLoading } = use(AuthContext);
  const [habits, setHabits] = useState([]);
  const [search, setSearch] = useState("");
  const axiosInstance = useAxios();
  console.log(search);

  useEffect(() => {
    try {
      axiosInstance.get("/habits").then((data) => {
        console.log(data);
        setHabits(data.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, [setLoading]);
  // useEffect(() => {
  //   fetch("https://b12-a10-future-box-server-omega.vercel.app//habits")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setHabits(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => console.log(error));
  // }, [setLoading]);

  if (loading) {
    return <Loading />;
  }
  const keyword = search.trim().toLocaleLowerCase();
  const searchedProducts = keyword
    ? habits.filter((habit) =>
        habit.title.toLocaleLowerCase().includes(keyword)
      )
    : habits;
  // setSearch(searchedProducts);
  // console.log(searchedProducts);

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <label className="input rounded-full flex mx-auto mb-10">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          name="search"
          type="search"
          placeholder="Search"
        />
      </label>
      <AnimatePresence>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {searchedProducts.map((habit) => (
            <motion.div
              key={habit._id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <PublicHabitCard habit={habit} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PublicHabits;
