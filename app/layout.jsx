import React from "react";
import "/assets/styles/globals.css";

export const metadata = {
  title: "PropertPulse | Find Your Dream Home",
  description:
    "Find your dream home with PropertyPulse. Search for properties, find an agent, and more!",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
