import React from "react";
import havit from "../../assets/habit-remainder.avif";
const Relevent = () => {
  return (
    <div>
      <section className="py-16 bg-gradient-to-r from-indigo-50 to-white mb-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 items-center gap-10">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Stay Consistent with Smart Reminders
            </h2>
            <p className="text-gray-600 mb-6">
              We know life gets busy. That's why our smart reminders gently
              nudge you to stay on track. Get notified based on your schedule,
              habits, and past activity — helping you stay consistent
              effortlessly.
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>1. Custom reminder times for each habit</li>
              <li>2. Streak notifications to keep momentum</li>
              <li>3. Gentle motivational messages daily</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <img
              src={havit}
              alt="habit reminder illustration"
              className="w-full max-w-md rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Relevent;
