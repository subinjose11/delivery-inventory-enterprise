import React from "react";

interface MobileShellLayoutProps {
  children: React.ReactNode;
}

export const MobileShellLayout: React.FC<MobileShellLayoutProps> = ({
  children,
}) => {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 transition-all">
      {children}
    </main>
  );
};
