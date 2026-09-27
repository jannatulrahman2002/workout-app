"use client";

import { createContext, useContext, useEffect, useState } from "react";

type WorkoutContextType = {
  planIds: number[];
  savedIds: number[];
  addToPlan: (id: number) => void;
  removeFromPlan: (id: number) => void;
  toggleSaved: (id: number) => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(
  undefined
);

export function WorkoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [planIds, setPlanIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);

  // Load saved data
  useEffect(() => {
    const storedPlanIds = localStorage.getItem("planIds");
    const storedSavedIds = localStorage.getItem("savedIds");

    if (storedPlanIds) {
      setPlanIds(JSON.parse(storedPlanIds));
    }

    if (storedSavedIds) {
      setSavedIds(JSON.parse(storedSavedIds));
    }
  }, []);

  // Add workout to today's plan
  const addToPlan = (id: number) => {
    setPlanIds((prev) => {
      if (prev.includes(id)) {
        return prev;
      }

      const updated = [...prev, id];

      localStorage.setItem("planIds", JSON.stringify(updated));

      return updated;
    });
  };

  // Remove workout from today's plan
  const removeFromPlan = (id: number) => {
    setPlanIds((prev) => {
      const updated = prev.filter((item) => item !== id);

      localStorage.setItem("planIds", JSON.stringify(updated));

      return updated;
    });
  };

  // Save / unsave workout
  const toggleSaved = (id: number) => {
    setSavedIds((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      localStorage.setItem("savedIds", JSON.stringify(updated));

      return updated;
    });
  };

  return (
    <WorkoutContext.Provider
      value={{
        planIds,
        savedIds,
        addToPlan,
        removeFromPlan,
        toggleSaved,
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