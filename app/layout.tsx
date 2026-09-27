import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { WorkoutProvider } from "./components/WorkoutContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WorkoutProvider>
          <Navbar />

          {children}

          <Footer />
        </WorkoutProvider>
      </body>
    </html>
  );
}