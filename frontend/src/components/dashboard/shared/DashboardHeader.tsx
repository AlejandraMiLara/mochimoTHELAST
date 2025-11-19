import type { FC } from "react";
import Avatar from "./Avatar";

interface DashboardHeaderProps {
  user: any;
  profile: any;
  title: string;
  badgeConfig: {
    text: string;
    icon: string;
    colors: string;
  };
}

const DashboardHeader: FC<DashboardHeaderProps> = ({
  user,
  profile,
  title,
  badgeConfig,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <Avatar profile={profile} user={user} />
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 mt-1 flex items-center gap-2">
            <span>{user.email}</span>
            <span className={`badge badge-sm ${badgeConfig.colors}`}>
              {badgeConfig.icon} {badgeConfig.text}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
