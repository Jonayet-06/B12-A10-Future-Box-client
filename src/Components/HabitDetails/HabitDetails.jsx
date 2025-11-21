import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import useAxios from "../Hooks/useAxios";
import Swal from "sweetalert2";

// calculate Progress
function calculateProgress(completionHistory) {
  const last30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    return d.toISOString();
  });

  const completed = completionHistory.filter((h) =>
    last30.includes(h.date)
  ).length;

  return Math.round((completed / 30) * 100);
}

// calculate streak
function calculateStreak(completionHistory) {
  if (!completionHistory.length) return 0;

  const dates = completionHistory.map((d) => new Date(d.date));
  dates.sort((a, b) => b - a);

  let streak = 0;
  let current = new Date();
  current.setHours(0, 0, 0, 0);

  for (let date of dates) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    if (d.getTime() === current.getTime()) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

const HabitDetails = () => {
  const { id } = useParams();
  const data = useLoaderData();
  const singleHabit = data.find((habit) => habit._id.toString() === id);
  const { _id, title, description, category, imageUrl, userName, userEmail } =
    singleHabit;
  const axiosInstance = useAxios();

  const [indivisualHabit, setIndivisualHabit] = useState(singleHabit);

  const progress = calculateProgress(indivisualHabit.completionHistory || []);
  const streak = calculateStreak(indivisualHabit.completionHistory || []);

  const handleComplete = async () => {
    const res = await axiosInstance.post(`/habits/${_id}/complete`);
    const updated = await res.data;
    setIndivisualHabit(updated.habit || indivisualHabit);
    Swal.fire({
      icon: "success",
      title: "Marked as complete!",
      text: "Today's completion has been added.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="card p-4 border rounded-xl shadow">
        <img src={imageUrl} className="rounded-lg h-200 w-full object-cover" />

        <h2 className="text-xl font-bold mt-2">{title}</h2>
        <p className="text-gray-600">{description}</p>

        <span
          className="badge badge-info my-2"
          data-tooltip-id="categoryTip"
          data-tooltip-content={`This habit is under the ${category} category`}
        >
          {category}
        </span>

        <div
          className="w-full bg-gray-200 rounded-full h-3 mt-2"
          data-tooltip-id="progressTip"
          data-tooltip-content={`Completed ${Math.round(
            (progress / 100) * 30
          )} out of 30 days`}
        >
          <div
            className="bg-green-500 h-3 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm mt-1">{progress}% completed last 30 days</p>

        <p
          className="mt-2 font-semibold"
          data-tooltip-id="streakTip"
          data-tooltip-content={`Current streak: ${streak} days`}
        >
          Streak: <span className="text-orange-600">{streak} days</span>
        </p>

        <p className="text-xs text-gray-500 mt-1">
          Created by: {userName} ({userEmail})
        </p>

        <button
          onClick={handleComplete}
          className="btn bg-linear-to-r from-[#11998e] via-[#38ef7d] to-[#0fd850] text-white btn-sm mt-3 w-full"
          data-tooltip-id="buttonTip"
          data-tooltip-content="Click to mark this habit as completed for today"
        >
          Mark Complete
        </button>

        <ReactTooltip id="categoryTip" place="top" type="dark" effect="solid" />
        <ReactTooltip id="progressTip" place="top" type="dark" effect="solid" />
        <ReactTooltip id="streakTip" place="top" type="dark" effect="solid" />
        <ReactTooltip id="buttonTip" place="top" type="dark" effect="solid" />
      </div>
    </div>
  );
};

export default HabitDetails;
