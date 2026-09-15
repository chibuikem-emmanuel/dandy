import BackgroundMusic from "@/components/BackgroundMusic";
import "./globals.css";

export const metadata = {
  title: "Dan'sJoy25 | Wedding Website",
  description: "Celebrate with Daniel and Rejoice",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        {children}
        <BackgroundMusic />
      </body>
    </html>
  );
}