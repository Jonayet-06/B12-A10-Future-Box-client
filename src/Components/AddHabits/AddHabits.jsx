import { User } from "lucide-react";
import React, { use } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const AddHabits = () => {
  const { user } = use(AuthContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = {
      userName: form.name.value,
      userEmail: form.email.value,
      title: form.habitTitle.value,
      category: form.category.value,
      reminderTime: form.reminderTime.value,
      description: form.description.value,
      imageUrl: form.thumbnail.value,
    };
    // save this user data to the database(via server)
    fetch("http://localhost:3000/habits", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your habit has been added successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        form.reset();
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card border border-gray-200 bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
      <div className="card-body p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Model</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="label font-medium">Name</label>
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
            <label className="label font-medium">Email</label>
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
            <label className="label font-medium">Habit Title</label>
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
            <label className="label font-medium">Category</label>
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
            <label className="label font-medium">Remainder Time</label>
            <input
              type="time"
              name="reminderTime"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
            />
          </div>
          {/* Description Textarea */}
          <div>
            <label className="label font-medium">Description</label>
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
            <label className="label font-medium">Thumbnail URL</label>
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
  );
};

export default AddHabits;
