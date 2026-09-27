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
  caloriesBurned?: number;
  rating?: number;
};

const workouts = workoutsData as Workout[];

type SortOption = "duration" | "calories" | "rating";

export default function MyPlan() {
  const {
    planIds,
    savedIds,
    doneIds,
    removeFromPlan,
    toggleSaved,
    toggleDone,
  } = useWorkout();

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [toast, setToast] = useState("");

  // Today's Plan
  const todayWorkouts = useMemo(() => {
    return workouts.filter((workout) => planIds.includes(workout.id));
  }, [planIds]);

  // Saved Workouts
  const savedWorkouts = useMemo(() => {
    return workouts.filter((workout) => savedIds.includes(workout.id));
  }, [savedIds]);

  // Active list
  const displayedWorkouts = useMemo(() => {
    const list =
      activeTab === "plan" ? todayWorkouts : savedWorkouts;

    return [...list].sort((a, b) => {
      if (sortBy === "duration") {
        return (
          Number(a.duration ?? a.minutes ?? 0) -
          Number(b.duration ?? b.minutes ?? 0)
        );
      }

      if (sortBy === "calories") {
        return (
          Number(b.caloriesBurned ?? 0) -
          Number(a.caloriesBurned?? 0)
        );
      }

      if (sortBy === "rating") {
        return (
          Number(b.rating ?? 0) -
          Number(a.rating ?? 0)
        );
      }

      return 0;
    });
  }, [
    activeTab,
    todayWorkouts,
    savedWorkouts,
    sortBy,
  ]);

  // Stats
  const totalMinutes = displayedWorkouts.reduce(
    (total, workout) =>
      total +
      Number(workout.duration ?? workout.minutes ?? 0),
    0
  );

  const totalCalories = displayedWorkouts.reduce(
    (total, workout) =>
      total + Number(workout.caloriesBurned ?? 0),
    0
  );

  // Toast
  const showToast = (message: string) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  // Mark as Done
  const markAsDone = (id: number) => {
    const alreadyDone = doneIds.includes(id);

    toggleDone(id);

    if (alreadyDone) {
      showToast("Workout marked as not done.");
    } else {
      showToast("Workout marked as done!");
    }
  };

  // Remove
  const handleRemove = (id: number, name: string) => {
    if (activeTab === "plan") {
      removeFromPlan(id);
      showToast(`${name} removed from today's plan.`);
    } else {
      toggleSaved(id);
      showToast(`${name} removed from saved.`);
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

        {/* SORT */}
        <div className={styles.sort}>
          <span>Sort By</span>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as SortOption)
            }
          >
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

            <Link
              href="/"
              className={styles.goButton}
            >
              Go to workouts
            </Link>

          </div>
        ) : (
          displayedWorkouts.map((workout) => {

            const isDone = doneIds.includes(workout.id);

            return (
              <div
                key={workout.id}
                className={`${styles.card} ${
                  isDone ? styles.completed : ""
                }`}
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
                      ◷{" "}
                      {workout.duration ??
                        workout.minutes ??
                        0}{" "}
                      min
                    </span>

                    <span>
                      🔥 {workout.caloriesBurned ?? 0} kcal
                    </span>

                    <span>
                      ★ {workout.rating ?? 4.5}
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

                  {/* MARK AS DONE */}
                  {activeTab === "plan" && (
                    <button
                      className={
                        isDone
                          ? styles.doneButton
                          : styles.markButton
                      }
                      onClick={() =>
                        markAsDone(workout.id)
                      }
                    >
                      {isDone
                        ? "✓ Done"
                        : "✓ Mark as Done"}
                    </button>
                  )}

                  {/* REMOVE */}
                  <button
                    className={styles.removeButton}
                    onClick={() =>
                      handleRemove(
                        workout.id,
                        workout.name
                      )
                    }
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

      {/* TOAST */}
      {toast && (
        <div className={styles.toast}>
          {toast}
        </div>
      )}

    </main>
  );
}