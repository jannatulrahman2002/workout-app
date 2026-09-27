"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

type Workout = {
  id: number;
  name: string;
  image: string;
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
};

export default function MyPlan() {
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const plan = localStorage.getItem("todayPlan");
    const saved = localStorage.getItem("savedWorkouts");

    if (plan) {
      setWorkouts(JSON.parse(plan));
    }

    if (saved) {
      setSavedWorkouts(JSON.parse(saved));
    }
  }, []);

  const currentWorkouts =
    activeTab === "plan" ? workouts : savedWorkouts;

  const totalMinutes = currentWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = currentWorkouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  const removeWorkout = (id: number) => {
    if (activeTab === "plan") {
      const updated = workouts.filter((workout) => workout.id !== id);

      setWorkouts(updated);
      localStorage.setItem("todayPlan", JSON.stringify(updated));
    } else {
      const updated = savedWorkouts.filter(
        (workout) => workout.id !== id
      );

      setSavedWorkouts(updated);
      localStorage.setItem("savedWorkouts", JSON.stringify(updated));
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>

        {/* HEADER */}
        <section className={styles.header}>
          <h1>MY PLAN</h1>

          <p>
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </section>

        {/* METRICS */}
        <section className={styles.metrics}>

          <div className={styles.metricCard}>
            <span>Exercises</span>
            <strong>{workouts.length}</strong>
          </div>

          <div className={styles.metricCard}>
            <span>Minutes</span>
            <strong>{totalMinutes}</strong>
          </div>

          <div className={styles.metricCard}>
            <span>Calories</span>
            <strong>{totalCalories}</strong>
          </div>

        </section>

        {/* TABS */}
        <div className={styles.tabArea}>

          <div className={styles.tabs}>

            <button
              className={
                activeTab === "plan"
                  ? styles.activeTab
                  : styles.tab
              }
              onClick={() => setActiveTab("plan")}
            >
              Today's Plan
            </button>

            <button
              className={
                activeTab === "saved"
                  ? styles.activeTab
                  : styles.tab
              }
              onClick={() => setActiveTab("saved")}
            >
              Saved
            </button>

          </div>

          {/* SORT */}
          <div className={styles.sort}>
            <span>Sort By</span>

            <select>
              <option>Duration</option>
              <option>Calories</option>
              <option>Rating</option>
            </select>
          </div>

        </div>

        {/* WORKOUT LIST */}
        <section className={styles.workoutList}>

          {currentWorkouts.length === 0 ? (

            <div className={styles.emptyState}>

              <h2>NOTHING HERE YET</h2>

              <p>
                Browse the library and add a lift to get today moving.
              </p>

              <a href="/" className={styles.cta}>
                Go to workouts
              </a>

            </div>

          ) : (

            currentWorkouts.map((workout) => (

              <div
                key={workout.id}
                className={styles.workoutCard}
              >

                <img
                  src={workout.image}
                  alt={workout.name}
                />

                <div className={styles.workoutInfo}>

                  <h3>{workout.name}</h3>

                  <p>{workout.equipment}</p>

                  <div className={styles.stats}>

                    <span>
                      ⏱ {workout.duration} min
                    </span>

                    <span>
                      🔥 {workout.caloriesBurned} kcal
                    </span>

                    <span>
                      ★ {workout.rating}
                    </span>

                  </div>

                </div>

                <div className={styles.actions}>

                  <a
                    href={`/workout/${workout.id}`}
                    className={styles.detailsBtn}
                  >
                    View Details
                  </a>

                  <button
                    onClick={() => removeWorkout(workout.id)}
                    className={styles.removeBtn}
                  >
                    ×
                  </button>

                </div>

              </div>

            ))

          )}

        </section>

      </div>
    </main>
  );
}