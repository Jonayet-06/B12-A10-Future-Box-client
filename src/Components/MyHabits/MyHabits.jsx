import React, { use, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Loading from "../Loading/Loading";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import useAxios from "../Hooks/useAxios";

// Calculate current streak
function calculateCurrentStreak(completionHistory) {
  if (!completionHistory || completionHistory.length === 0) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let streak = 0;
  const completed = completionHistory
    .map((date) => new Date(date))
    .sort((a, b) => b - 1);

  for (let i = 0; i < completed.length; i++) {
    const diff = (today - completed[i]) / 24 / 60 / 60 / 1000;
    if (diff === streak) streak++;
    else break;
  }
  return streak;
}

const MyHabits = () => {
  const { user, loading, setLoading } = use(AuthContext);
  const [habits, setHabits] = useState([]);
  const habitModalRef = useRef();
  const [currentHabit, setCurrentHabit] = useState(null);
  const axiosInstance = useAxios();

  // console.log("Token = ", user.accessToken);
  useEffect(() => {
    if (user?.email) {
      axiosInstance
        .get(`/myhabits?email=${user.email}`, {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then((data) => {
          setHabits(data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // useEffect(() => {
  //   if (user?.email) {
  //     fetch(`http://localhost:3000/myhabits?email=${user.email}`, {
  //       headers: {
  //         authorization: `Bearer ${user.accessToken}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => setHabits(data))
  //       .catch((err) => console.log(err));
  //   }
  // }, [user]);

  const handleHabitModalOpen = (habit) => {
    setCurrentHabit(habit);
    habitModalRef.current.showModal();
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const form = event.target;
    const updatedData = {
      userName: form.name.value,
      userEmail: form.email.value,
      title: form.habitTitle.value,
      category: form.category.value,
      reminderTime: form.reminderTime.value,
      description: form.description.value,
      thumbnail: form.thumbnail.value,
    };
    try {
      await axiosInstance.patch(`/habits/${currentHabit._id}`, updatedData);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your habit has been updated successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      setHabits(
        habits.map((h) =>
          h._id === currentHabit._id ? { ...h, ...updatedData } : h
        )
      );
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };
  // const handleUpdate = (event) => {
  //   event.preventDefault();
  //   const form = event.target;
  //   const updatedData = {
  //     userName: form.name.value,
  //     userEmail: form.email.value,
  //     title: form.habitTitle.value,
  //     category: form.category.value,
  //     reminderTime: form.reminderTime.value,
  //     description: form.description.value,
  //     thumbnail: form.thumbnail.value,
  //   };
  //   fetch(`http://localhost:3000/habits/${currentHabit._id}`, {
  //     method: "PATCH",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(updatedData),
  //   })
  //     .then((res) => res.json())
  //     .then(() => {
  //       Swal.fire({
  //         position: "top-end",
  //         icon: "success",
  //         title: "Your habit has been updated successfully",
  //         showConfirmButton: false,
  //         timer: 2000,
  //       });
  //       setHabits(
  //         habits.map((h) =>
  //           h._id === currentHabit._id ? { ...h, ...updatedData } : h
  //         )
  //       );
  //       form.reset();
  //     })
  //     .catch((err) => console.log(err));
  // };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          axiosInstance.delete(`/habits/${id}`);
          Swal.fire({
            title: "Deleted!",
            text: "Your habit has been deleted.",
            icon: "success",
          });
          const remainingHabits = habits.filter((habit) => habit._id !== id);
          setHabits(remainingHabits);
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      }
    });
  };
  // const handleDelete = (id) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       fetch(`http://localhost:3000/habits/${id}`, { method: "DELETE" })
  //         .then((res) => res.json())
  //         .then(() => {
  //           Swal.fire({
  //             title: "Deleted!",
  //             text: "Your habit has been deleted.",
  //             icon: "success",
  //           });
  //           const remainingHabits = habits.filter((habit) => habit._id !== id);
  //           setHabits(remainingHabits);
  //           setLoading(false);
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   });
  // };

  const handleComplete = async (id) => {
    const res = await axiosInstance.post(`/habits/${id}/complete`);
    console.log(res);
    const data = await res.data;

    setHabits(
      habits.map((h) =>
        h._id === id
          ? { ...h, completionHistory: data.habit.completionHistory }
          : h
      )
    );

    Swal.fire({
      icon: "success",
      title: "Marked as complete!",
      text: "Today's completion has been added.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <motion.h2
        className="font-bold text-3xl text-center mb-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My habits: {habits.length}
      </motion.h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Sl. No.</th>
              <th>Title</th>
              <th>Category</th>
              <th>Current Streak</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {habits.map((habit, index) => (
                <motion.tr
                  key={habit._id}
                  className="hover:bg-base-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <th>{index + 1}</th>
                  <td>{habit.title}</td>
                  <td>{habit.category}</td>
                  <td>{calculateCurrentStreak(habit.completionHistory)}</td>
                  <td>{new Date(habit.createdAt).toLocaleDateString()}</td>
                  <td className="flex flex-wrap gap-2">
                    <motion.button
                      className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850] text-white"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleHabitModalOpen(habit)}
                    >
                      Update
                    </motion.button>

                    <motion.button
                      className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850] text-white"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(habit._id)}
                    >
                      Delete
                    </motion.button>

                    <motion.button
                      className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850] text-white"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleComplete(habit._id)}
                    >
                      Mark Complete
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog
        ref={habitModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <motion.div
          className="modal-box"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="card border border-gray-200 bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
            <div className="card-body p-6 relative">
              <h2 className="text-2xl font-bold text-center mb-6">
                Update Habit
              </h2>
              {currentHabit && (
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="label font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      readOnly
                      className="input w-full rounded-full"
                      defaultValue={user.displayName}
                    />
                  </div>
                  <div>
                    <label className="label font-medium">Email</label>
                    <input
                      type="text"
                      name="email"
                      readOnly
                      className="input w-full rounded-full"
                      defaultValue={user.email}
                    />
                  </div>
                  <div>
                    <label className="label font-medium">Habit Title</label>
                    <input
                      type="text"
                      name="habitTitle"
                      className="input w-full rounded-full"
                      defaultValue={currentHabit.title}
                    />
                  </div>
                  <div>
                    <label className="label font-medium">Category</label>
                    <select
                      name="category"
                      defaultValue={currentHabit.category}
                      className="select w-full rounded-full"
                    >
                      <option value="Morning">Morning</option>
                      <option value="Work">Work</option>
                      <option value="Fitness">Fitness</option>
                      <option value="Evening">Evening</option>
                      <option value="Study">Study</option>
                    </select>
                  </div>
                  <div>
                    <label className="label font-medium">Reminder Time</label>
                    <input
                      type="time"
                      name="reminderTime"
                      className="input w-full rounded-full"
                      defaultValue={currentHabit.reminderTime}
                    />
                  </div>
                  <div>
                    <label className="label font-medium">Description</label>
                    <textarea
                      name="description"
                      className="textarea w-full rounded-2xl h-32"
                      defaultValue={currentHabit.description}
                    ></textarea>
                  </div>
                  <div>
                    <label className="label font-medium">Thumbnail URL</label>
                    <input
                      type="url"
                      name="thumbnail"
                      className="input w-full rounded-full"
                      defaultValue={currentHabit.thumbnail}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="btn w-full mt-4 rounded-full bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850]"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Update
                  </motion.button>
                </form>
              )}
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </motion.div>
      </dialog>
    </div>
  );
};

export default MyHabits;
