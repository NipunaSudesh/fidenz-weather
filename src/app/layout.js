import "./globals.css";
import { ThemeProvider } from "@/Context/ThemeContext";
import { StateContextProvider } from "@/Context";

export const metadata = {
  title: "Fidenz Weather",
  description: "Weather application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
        <ThemeProvider>
          <StateContextProvider>
            {children}
          </StateContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}