import type { FC } from "react";

interface InfoBannerProps {
  title: string;
  description: string;
  theme: "cyan" | "purple";
}

const InfoBanner: FC<InfoBannerProps> = ({ title, description, theme }) => {
  const bgColor =
    theme === "cyan" ? "from-cyan-50 to-blue-50" : "from-purple-50 to-pink-50";
  const borderColor =
    theme === "cyan" ? "border-cyan-200" : "border-purple-200";
  const iconColor = theme === "cyan" ? "stroke-cyan-600" : "stroke-purple-600";

  return (
    <div className={`alert bg-linear-to-r ${bgColor} ${borderColor} shadow-lg`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className={`${iconColor} shrink-0 w-6 h-6`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <div className="text-gray-800">
        <h3 className="font-bold">{title}</h3>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
    </div>
  );
};

export default InfoBanner;
