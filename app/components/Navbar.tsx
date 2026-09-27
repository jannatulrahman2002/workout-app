"use client";

import Link from "next/link";
import { useWorkout } from "./WorkoutContext";

export default function Navbar() {
  const { planIds, savedIds } = useWorkout();

  return (
    <nav className="navbar">

      <Link href="/" className="nav-logo">
        <img
          src="/logo.png"
          alt="FITLOG"
          className="nav-logo-image"
        />
        <span className="logo-text">FITLOG</span>
      </Link>

      <div className="nav-menu">

        <Link href="/" className="nav-link active">
          Workouts
        </Link>

        <Link href="/my-plan" className="nav-link">
          My Plan
        </Link>

      </div>

      <div className="nav-right">

        {/* PLAN */}
        <Link href="/my-plan" className="nav-status">
          <span>Plan</span>

          <span className="status-number">
            {planIds.length}
          </span>
        </Link>

        {/* SAVED */}
        <Link href="/my-plan?tab=saved" className="nav-status">
          <span>Saved</span>

          <span className="status-number dark">
            {savedIds.length}
          </span>
        </Link>

      </div>

    </nav>
  );
}