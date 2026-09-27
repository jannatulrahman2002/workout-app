import Image from "next/image";

import workouts from "./data.json";
export default function Home () {
  return (
    <>
  <main>
    
<section className="hero">
  <div className="hero-content">

    <div className="hero-text">
      <span className="hero-label">WORKOUT LIBRARY</span>

      <h1>
        TRAIN WITH INTENT. LOG EVERY SET.
      </h1>

      <p>
        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
into today's plan, and watch the week's work add up.
      </p>

      <button className="hero-button">
        BROWSE WORKOUTS
      </button>
    </div>

    <img
      src="/banner.png"
      alt="Workout"
      className="hero-image"
    />

  </div>
</section>


{/* THE LIBRARY */}
<section className="library-section">

  <div className="library-header">
    <h2>THE LIBRARY</h2>
    <p>Twelve lifts covering every major muscle group.</p>
  </div>

  <div className="workout-grid">

    {workouts.map((workout) => (
      <article className="workout-card" key={workout.id}>

        <div className="workout-image">
          <img
            src={workout.image}
            alt={workout.name}
          />
        </div>

        <div className="workout-info">

          <div className="muscle-tags">
            {workout.muscleGroups.map((muscle) => (
              <span key={muscle}>
                {muscle}
              </span>
            ))}
          </div>

          <h3>{workout.name}</h3>

          <p className="equipment">
            {workout.equipment}
          </p>

          <div className="workout-meta">
            <span>◷ {workout.duration} min</span>
            <span>◉ {workout.caloriesBurned} kcal</span>
            <span>★ {workout.rating}</span>
          </div>

        </div>

      </article>
    ))}

  </div>

</section>


  </main>
  </>
  );
}