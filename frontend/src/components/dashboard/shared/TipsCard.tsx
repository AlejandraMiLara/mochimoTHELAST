import type { FC } from "react";

interface TipsCardProps {
  tips: string[];
  theme: "cyan" | "purple";
}

const TipsCard: FC<TipsCardProps> = ({ tips, theme }) => {
  const bgColor =
    theme === "cyan" ? "from-cyan-50 to-blue-50" : "from-purple-50 to-pink-50";
  const borderColor =
    theme === "cyan" ? "border-cyan-200" : "border-purple-200";
  const iconColor = theme === "cyan" ? "text-cyan-600" : "text-purple-600";
  const bulletColor = theme === "cyan" ? "text-cyan-600" : "text-purple-600";

  return (
    <div
      className={`card bg-linear-to-br ${bgColor} shadow-xl border ${borderColor}`}
    >
      <div className="card-body">
        <h3 className="card-title text-gray-900 flex items-center gap-2 text-base">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${iconColor}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          💡 {theme === "cyan" ? "Consejos" : "Recomendaciones"}
        </h3>
        <div className="divider my-1"></div>
        <ul className="space-y-3 text-sm text-gray-700">
          {tips.map((tip, index) => (
            <li key={index} className="flex gap-2">
              <span className={bulletColor}>•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TipsCard;
