import React from "react";

const ReleventOne = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Join a Supportive Community
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Stay motivated with people who share your goals. Join challenges,
          track group habits, and celebrate wins together. Accountability makes
          all the difference.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <img
              src="https://i.ibb.co/wZ0VNV18/women-02.jpg"
              alt="User"
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-700 italic">
              "Seeing others stick to their habits keeps me inspired every day!"
            </p>
            <h4 className="font-semibold mt-3 text-gray-800">— Sarah M.</h4>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <img
              src="https://i.ibb.co/7xfy94Qg/man.jpg"
              alt="User"
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-700 italic">
              "Weekly challenges make habit tracking fun and rewarding."
            </p>
            <h4 className="font-semibold mt-3 text-gray-800">— Daniel K.</h4>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <img
              src="https://i.ibb.co/WNyHfLR8/women-01.jpg"
              alt="User"
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-700 italic">
              "I love sharing my progress and celebrating milestones with
              friends."
            </p>
            <h4 className="font-semibold mt-3 text-gray-800">— Aisha R.</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReleventOne;
