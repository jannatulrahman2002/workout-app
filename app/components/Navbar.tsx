import Link from "next/link";



export default function Navbar() {
  return (
    <nav className="navbar">

     
      <div className="nav-logo">
        <img
          src="/logo.png"
          alt="FITLOG"
          className="nav-logo-image"
        />
        <span className="logo-text">FITLOG</span>
      </div>

     
      <div className="nav-menu">

        <Link href="/" className="nav-link active">Workouts</Link>

        <Link href="/my-plan" className="nav-link">My Plan</Link>

      </div>

    
      <div className="nav-right">

        <div className="nav-status">
          <span>Plan</span>

          <span className="status-number">
            0
          </span>
        </div>

        <div className="nav-status">
          <span>Saved</span>

          <span className="status-number dark">
            0
          </span>
        </div>

      </div>

    </nav>
  );
}
