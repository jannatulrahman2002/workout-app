"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Workout = {
  id: number | string;
  name: string;
  type?: string;
  duration: number;
  caloriesBurned: number;
  rating?: number;
  image?: string;
  tags?: string[];
};

type WorkoutContextType = {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number | string) => void;
  addToSaved: (workout: Workout) => void;
  removeFromSaved: (id: number | string) => void;
  markAsDone: (id: number | string) => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(
  undefined
);

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  const addToPlan = (workout: Workout) => {
    setPlan((prev) => {
      if (prev.some((item) => item.id === workout.id)) {
        return prev;
      }

      return [...prev, workout];
    });
  };

  const removeFromPlan = (id: number | string) => {
    setPlan((prev) => prev.filter((item) => item.id !== id));
  };

  const addToSaved = (workout: Workout) => {
    setSaved((prev) => {
      if (prev.some((item) => item.id === workout.id)) {
        return prev;
      }

      return [...prev, workout];
    });
  };

  const removeFromSaved = (id: number | string) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
  };

  const markAsDone = (id: number | string) => {
    setPlan((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error("useWorkout must be used inside WorkoutProvider");
  }

  return context;
}