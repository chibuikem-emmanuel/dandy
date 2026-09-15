import BackgroundMusic from "@/components/BackgroundMusic";
import "./globals.css";

export const metadata = {
  title: "JayDee25 | Wedding Website",
  description: "Celebrate with Joshua and Divine-Yves",
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