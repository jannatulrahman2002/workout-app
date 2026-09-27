import data from "../../data.json";
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

export default async function WorkoutDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const workouts = data as Workout[];

  const workout = workouts.find(
    (item) => item.id === Number(id)
  );

  if (!workout) {
    return (
      <main className={styles.notFound}>
        <h1>Workout Not Found</h1>
        <p>The workout you are looking for does not exist.</p>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>

        {/* LEFT SIDE - IMAGE */}
        <div className={styles.imageSection}>
          <img
            src={workout.image}
            alt={workout.name}
            className={styles.workoutImage}
          />
        </div>

        {/* RIGHT SIDE - DETAILS */}
        <div className={styles.detailsSection}>

          {/* TITLE */}
          <h1>{workout.name}</h1>

          {/* DESCRIPTION */}
          <p className={styles.description}>
            {workout.description}
          </p>

          {/* MUSCLE GROUPS */}
          <div className={styles.tags}>
            {workout.muscleGroups.map((muscle) => (
              <span key={muscle}>
                {muscle}
              </span>
            ))}
          </div>

          {/* WORKOUT INFORMATION */}
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

            <button className={styles.primaryButton}>
              ✓ Add to today's plan
            </button>

            <button className={styles.secondaryButton}>
              ♡ Save for later
            </button>

          </div>

        </div>
      </div>
    </main>
  );
}