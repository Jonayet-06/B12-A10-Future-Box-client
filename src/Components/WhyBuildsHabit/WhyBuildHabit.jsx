import { Brain, Clock, Smile, TrendingUp } from "lucide-react";
import React from "react";

const WhyBuildHabit = () => {
  const benefits = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Better Focus",
      description:
        "Daily habits help train your brain to stay consistent, boosting productivity and concentration over time.",
    },
    {
      icon: <Smile className="w-6 h-6" />,
      title: "Reduced Stress",
      description:
        "Healthy routines create predictability, reducing anxiety and helping you stay calm under pressure.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Continuous Growth",
      description:
        "Small, consistent habits compound into long-term success in health, learning, and self-improvement.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Time Management",
      description:
        "Structured habits make your day more efficient, freeing time for the things that truly matter.",
    },
  ];
  return (
    <>
      <div className="font-bold text-3xl text-center mb-3">
        Why Build Habits?
      </div>
      <div className="grid md: grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {benefits.map((benefit, index) => (
          <div key={index} className="card card-border bg-base-300">
            <div className="card-body">
              <h2 className="card-title">
                {benefit.icon}
                {benefit.title}
              </h2>
              <p>{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WhyBuildHabit;
