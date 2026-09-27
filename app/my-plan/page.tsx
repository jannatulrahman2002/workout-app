"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useWorkout } from "@/app/components/WorkoutContext";
import workoutsData from "@/app/data.json";
import styles from "./page.module.css";

type Workout = {
  id: number;
  name: string;
  category?: string;
  image: string;
  duration?: number;
  minutes?: number;
  calories?: number;
  rating?: number;
};

const workouts = workoutsData as Workout[];

export default function MyPlan() {
  const {
    planIds,
    savedIds,
    removeFromPlan,
    toggleSaved,
  } = useWorkout();

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [doneIds, setDoneIds] = useState<number[]>([]);

  // Today's Plan
  const todayWorkouts = useMemo(() => {
    return workouts.filter((workout) =>
      planIds.includes(workout.id)
    );
  }, [planIds]);

  // Saved
  const savedWorkouts = useMemo(() => {
    return workouts.filter((workout) =>
      savedIds.includes(workout.id)
    );
  }, [savedIds]);

  // Which list will show
  const displayedWorkouts =
    activeTab === "plan" ? todayWorkouts : savedWorkouts;

  // Stats
  const totalMinutes = displayedWorkouts.reduce(
    (total, workout) =>
      total + Number(workout.duration ?? workout.minutes ?? 0),
    0
  );

  const totalCalories = displayedWorkouts.reduce(
    (total, workout) =>
      total + Number(workout.calories ?? 0),
    0
  );

  const markAsDone = (id: number) => {
    setDoneIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleRemove = (id: number) => {
    if (activeTab === "plan") {
      removeFromPlan(id);
    } else {
      toggleSaved(id);
    }
  };

  return (
    <main className={styles.page}>

      {/* HEADER */}
      <section className={styles.header}>
        <h1>MY PLAN</h1>

        <p>
          Keep track of your workouts and saved exercises.
        </p>
      </section>

      {/* STATS */}
      <section className={styles.stats}>

        <div className={styles.statBox}>
          <span>Exercises</span>
          <strong>{displayedWorkouts.length}</strong>
        </div>

        <div className={styles.statBox}>
          <span>Minutes</span>
          <strong>{totalMinutes}</strong>
        </div>

        <div className={styles.statBox}>
          <span>Calories</span>
          <strong>{totalCalories}</strong>
        </div>

      </section>

      {/* TABS + SORT */}
      <div className={styles.toolbar}>

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

        <div className={styles.sort}>
          <span>Sort By</span>
          <select defaultValue="duration">
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>

      </div>

      {/* WORKOUT LIST */}
      <section className={styles.workoutList}>

        {displayedWorkouts.length === 0 ? (
          <div className={styles.empty}>

            <h2>NOTHING HERE YET</h2>

            <p>
              Browse the library and add workouts to get started.
            </p>

            <Link href="/" className={styles.goButton}>
              Go to workouts
            </Link>

          </div>
        ) : (
          displayedWorkouts.map((workout) => {

            const isDone = doneIds.includes(workout.id);

            return (
              <div
                className={`${styles.card} ${
                  isDone ? styles.completed : ""
                }`}
                key={workout.id}
              >

                {/* IMAGE */}
                <div className={styles.imageBox}>
                  <img
                    src={workout.image}
                    alt={workout.name}
                  />
                </div>

                {/* INFO */}
                <div className={styles.info}>

                  <h3>{workout.name}</h3>

                  <p className={styles.category}>
                    {workout.category || "Workout"}
                  </p>

                  <div className={styles.meta}>

                    <span>
                      ◷ {workout.duration ?? workout.minutes ?? 0} min
                    </span>

                    <span>
                      🔥 {workout.calories ?? 0} kcal
                    </span>

                    <span>
                      ★ {workout.rating ?? "4.5"}
                    </span>

                  </div>

                </div>

                {/* ACTIONS */}
                <div className={styles.actions}>

                  <Link
                    href={`/workout/${workout.id}`}
                    className={styles.detailsButton}
                  >
                    View Details
                  </Link>

                  <button
                    className={
                      isDone
                        ? styles.doneButton
                        : styles.markButton
                    }
                    onClick={() => markAsDone(workout.id)}
                  >
                    {isDone ? "✓ Done" : "✓ Mark as Done"}
                  </button>

                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemove(workout.id)}
                    aria-label={`Remove ${workout.name}`}
                  >
                    ×
                  </button>

                </div>

              </div>
            );
          })
        )}

      </section>

    </main>
  );
}