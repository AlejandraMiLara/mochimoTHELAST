import type { FC } from "react";

interface LoadingSpinnerProps {
  color: "cyan" | "purple";
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ color }) => {
  const colorClass = color === "cyan" ? "text-cyan-500" : "text-purple-500";

  return (
    <div className="flex justify-center items-center py-20">
      <div className={`loading loading-spinner loading-lg ${colorClass}`}></div>
    </div>
  );
};

export default LoadingSpinner;
