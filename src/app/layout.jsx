import "./globals.css";
import { StateContextProvider } from "@/Context";

export const metadata = {
  title: "Fidenz Weather",
  description: "Weather analytics application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StateContextProvider>
          {children}
        </StateContextProvider>
      </body>
    </html>
  );
}