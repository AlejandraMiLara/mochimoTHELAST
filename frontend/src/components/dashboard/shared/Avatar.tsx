import type { FC } from "react";

interface AvatarProps {
  profile: any;
  user: any;
}

const Avatar: FC<AvatarProps> = ({ profile, user }) => {
  const getInitial = () => user.email.charAt(0).toUpperCase();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = "none";
    const parent = target.parentElement;
    if (parent) {
      const fallback = document.createElement("div");
      fallback.className =
        "bg-gradient-to-br from-cyan-400 to-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center";
      fallback.innerHTML = `<span class="text-2xl font-bold">${getInitial()}</span>`;
      parent.appendChild(fallback);
    }
  };

  return (
    <div className="avatar placeholder">
      {profile.avatarUrl ? (
        <div className="w-16 rounded-full">
          <img
            src={profile.avatarUrl}
            alt="Avatar"
            className="object-cover"
            onError={handleImageError}
          />
        </div>
      ) : (
        <div className="bg-linear-to-br from-cyan-400 to-blue-500 text-white rounded-full w-16">
          <span className="text-2xl font-bold">{getInitial()}</span>
        </div>
      )}
    </div>
  );
};

export default Avatar;
