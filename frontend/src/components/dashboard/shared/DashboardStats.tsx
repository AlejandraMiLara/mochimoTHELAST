import type { FC } from "react";

interface StatItem {
  title: string;
  value: number;
  icon: React.ReactNode;
  path: string;
  textColor: string;
  color: string;
}

interface DashboardStatsProps {
  stats: StatItem[];
  navigate: (path: string) => void;
}

export const DashboardStats: FC<DashboardStatsProps> = ({
  stats,
  navigate,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          onClick={() => navigate(stat.path)}
          className={`${stat.color} rounded-2xl p-5 cursor-pointer transform hover:scale-[1.02] transition-all duration-300 shadow-xl border backdrop-blur-sm hover:shadow-2xl`}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-base-content/70">{stat.title}</div>
              <div className={`text-3xl font-bold mt-1 ${stat.textColor}`}>
                {stat.value}
              </div>
            </div>
            <div className="text-2xl text-base-content/70">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
