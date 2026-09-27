"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import data from "../../data.json";
import { useWorkout } from "@/app/components/WorkoutContext";
import styles from "./page.module.css";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

export default function WorkoutDetails() {
  const params = useParams<{ id: string }>();

  const { planIds, savedIds, addToPlan, toggleSaved } =
    useWorkout();

  const [message, setMessage] = useState("");

  const workouts = data as Workout[];

  const workout = workouts.find(
    (item) => item.id === Number(params.id)
  );

  if (!workout) {
    return (
      <main className={styles.notFound}>
        <h1>Workout Not Found</h1>
        <p>The workout you are looking for does not exist.</p>
      </main>
    );
  }

  // ADD TO TODAY'S PLAN
  const handleAddToPlan = () => {
    if (planIds.includes(workout.id)) {
      setMessage("Already added to today's plan");
    } else {
      addToPlan(workout.id);
      setMessage("Added to today's plan");
    }

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  // SAVE FOR LATER
  const handleSaveForLater = () => {
    const alreadySaved = savedIds.includes(workout.id);

    toggleSaved(workout.id);

    if (alreadySaved) {
      setMessage("Removed from saved");
    } else {
      setMessage("Saved for later");
    }

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  return (
    <main className={styles.page}>

      {/* TOAST */}
      {message && (
        <div className={styles.toast}>
          {message}
        </div>
      )}

      <div className={styles.container}>

        {/* LEFT SIDE */}
        <div className={styles.imageSection}>
          <img
            src={workout.image}
            alt={workout.name}
            className={styles.workoutImage}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.detailsSection}>

          <h1>{workout.name}</h1>

          <p className={styles.description}>
            {workout.description}
          </p>

          {/* TAGS */}
          <div className={styles.tags}>
            {workout.muscleGroups.map((muscle) => (
              <span key={muscle}>
                {muscle}
              </span>
            ))}
          </div>

          {/* SPECS */}
          <div className={styles.specs}>

            <div className={styles.row}>
              <span>Equipment</span>
              <strong>{workout.equipment}</strong>
            </div>

            <div className={styles.row}>
              <span>Difficulty</span>
              <strong>{workout.difficulty}</strong>
            </div>

            <div className={styles.row}>
              <span>Sets</span>
              <strong>{workout.sets}</strong>
            </div>

            <div className={styles.row}>
              <span>Reps</span>
              <strong>{workout.reps}</strong>
            </div>

            <div className={styles.row}>
              <span>Duration</span>
              <strong>{workout.duration} min</strong>
            </div>

            <div className={styles.row}>
              <span>Calories</span>
              <strong>{workout.caloriesBurned} kcal</strong>
            </div>

            <div className={styles.row}>
              <span>Rating</span>
              <strong>★ {workout.rating}</strong>
            </div>

          </div>

          {/* INSTRUCTIONS */}
          <div className={styles.instructions}>
            <h2>INSTRUCTIONS</h2>

            <ol>
              {workout.instructions.map(
                (instruction, index) => (
                  <li key={index}>
                    {instruction}
                  </li>
                )
              )}
            </ol>
          </div>

          {/* BUTTONS */}
          <div className={styles.buttons}>

            <button
              className={styles.primaryButton}
              onClick={handleAddToPlan}
            >
              ✓ Add to today&apos;s plan
            </button>

            <button
              className={styles.secondaryButton}
              onClick={handleSaveForLater}
            >
              {savedIds.includes(workout.id)
                ? "♥ Saved"
                : "♡ Save for later"}
            </button>

          </div>

        </div>
      </div>
    </main>
  );
}