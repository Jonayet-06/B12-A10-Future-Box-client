import React, { use, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

function calculateCurrentStreak(completionHistory) {
  if (!completionHistory || completionHistory.length === 0) {
    return 0;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let streak = 0;

  const completed = completionHistory
    .map((date) => new Date(date))
    .sort((a, b) => b - 1);

  for (let i = 0; i < completed.length; i++) {
    const diff = ((today - completed[i]) / 24) * 60 * 60 * 1000;

    if (diff === streak) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

const MyHabits = () => {
  const { user } = use(AuthContext);
  const [habits, setHabits] = useState([]);
  const habitModalRef = useRef();
  const [currentHabit, setCurrentHabit] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/myhabits?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setHabits(data);
        });
    }
  }, [user]);

  const handleHabitModalOpen = (habit) => {
    setCurrentHabit(habit);
    habitModalRef.current.showModal();
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const updatedData = {
      userName: form.name.value,
      userEmail: form.email.value,
      title: form.habitTitle.value,
      catogory: form.category.value,
      reminderTime: form.reminderTime.value,
      description: form.description.value,
      thumbnail: form.thumbnail.value,
    };
    // update this user data to the database(via server)
    fetch(`http://localhost:3000/habits/${currentHabit._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Successfully Updated");
        form.reset();
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/habits/${id}`, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        alert("Successfully Deleted");
        setHabits(habits.filter((habit) => habit._id !== id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2 className="font-bold text-3xl text-center mt-5 max-w-7xl mx-auto">
        My habits: {habits.length}
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
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
                {habits.map((habit, index) => (
                  <tr key={habit._id} className="hover:bg-base-300">
                    <th>{index + 1}</th>
                    <td>{habit.title}</td>
                    <td>{habit.catogory}</td>
                    <td>{calculateCurrentStreak(habit.length)}</td>
                    <td>{new Date(habit.createdAt).toLocaleDateString()}</td>
                    <td className="flex gap-2">
                      <button
                        onClick={() => {
                          handleHabitModalOpen(habit);
                        }}
                        className="btn btn-primary"
                      >
                        Update
                      </button>
                      <dialog
                        ref={habitModalRef}
                        className="modal modal-bottom sm:modal-middle"
                      >
                        <div className="modal-box">
                          <div className="card border border-gray-200 bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
                            <div className="card-body p-6 relative">
                              <h2 className="text-2xl font-bold text-center mb-6">
                                Add Update Habit
                              </h2>
                              <form
                                onSubmit={handleUpdate}
                                className="space-y-4"
                              >
                                {/* Name Field */}
                                <div>
                                  <label className="label font-medium">
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    required
                                    className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                                    readOnly
                                    defaultValue={user.displayName}
                                  />
                                </div>
                                {/* Email Field */}
                                <div>
                                  <label className="label font-medium">
                                    Email
                                  </label>
                                  <input
                                    type="text"
                                    name="email"
                                    required
                                    className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                                    readOnly
                                    defaultValue={user.email}
                                  />
                                </div>
                                {/* Habit Title Field */}
                                <div>
                                  <label className="label font-medium">
                                    Habit Title
                                  </label>
                                  <input
                                    type="text"
                                    name="habitTitle"
                                    required
                                    className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                                    placeholder="Enter Habit Title"
                                  />
                                </div>

                                {/* Category Dropdown */}
                                <div>
                                  <label className="label font-medium">
                                    Category
                                  </label>
                                  <select
                                    defaultValue={""}
                                    name="category"
                                    required
                                    className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
                                  >
                                    <option value="" disabled>
                                      Select category
                                    </option>
                                    <option value="Morning">Morning</option>
                                    <option value="Work">Work</option>
                                    <option value="Fitness">Fitness</option>
                                    <option value="Evening">Evening</option>
                                    <option value="Study">Study</option>
                                  </select>
                                </div>

                                {/* Remainder Time */}
                                <div>
                                  <label className="label font-medium">
                                    Remainder Time
                                  </label>
                                  <input
                                    type="time"
                                    name="reminderTime"
                                    required
                                    className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                                  />
                                </div>
                                {/* Description Textarea */}
                                <div>
                                  <label className="label font-medium">
                                    Description
                                  </label>
                                  <textarea
                                    name="description"
                                    required
                                    rows="3"
                                    className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[250px]"
                                    placeholder="Enter description"
                                  ></textarea>
                                </div>

                                {/* Thumbnail URL */}
                                <div>
                                  <label className="label font-medium">
                                    Thumbnail URL
                                  </label>
                                  <input
                                    type="url"
                                    name="thumbnail"
                                    required
                                    className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                                    placeholder="https://example.com/image.jpg"
                                  />
                                </div>

                                {/* Submit Button */}
                                <button
                                  type="submit"
                                  className="btn w-full text-white mt-6 rounded-full bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850] hover:from-[#11998e]-600 hover:to-[#0fd850]-700"
                                >
                                  Add Habit
                                </button>
                              </form>
                            </div>
                          </div>
                          <div className="modal-action">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button className="btn">Close</button>
                            </form>
                          </div>
                        </div>
                      </dialog>

                      <button
                        onClick={() => handleDelete(habit._id)}
                        className="btn btn-primary"
                      >
                        Delete
                      </button>

                      <button className="btn btn-primary">Mark Complete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </h2>
    </div>
  );
};

export default MyHabits;
