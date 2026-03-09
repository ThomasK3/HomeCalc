import React from "react";

export default function Layout({ children, onBack }) {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-[480px]">
        {onBack && (
          <button
            onClick={onBack}
            className="text-sm text-gray-500 hover:text-primary mb-4 flex items-center gap-1"
          >
            ← Zpět
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
