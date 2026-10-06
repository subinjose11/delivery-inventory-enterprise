import React from "react";

export const WebPortalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {children}
    </main>
  );
};
