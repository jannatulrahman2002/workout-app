import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
  <img src="/logo.png" alt="FitLog logo" />
  <strong>FITLOG</strong>
</div>

      <p>
        © 2026 FitLog — Workout Library. Train hard, log honestly.
      </p>
    </footer>
  );
}