import type { FC } from "react";
import StatCard from "./StatCard";

interface StatConfig {
  title: string;
  value: number | string;
  description: string;
  icon: JSX.Element;
  background: string;
  onClick: string;
}

interface StatsGridProps {
  stats: StatConfig[];
  navigate: (path: string) => void;
}

const StatsGrid: FC<StatsGridProps> = ({ stats, navigate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} navigate={navigate} />
      ))}
    </div>
  );
};

export default StatsGrid;
