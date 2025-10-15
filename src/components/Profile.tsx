import React from "react";

type User = {
  firstName: string;
  lastName?: string;
  email: string;
};

const Profile: React.FC = () => {
  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  // Get first name directly
  const firstName = user?.firstName || "Guest";

  return (
    <div>
      <p className="lg:text-2xl">Hi {firstName}</p>
      <p className="lg:text-xl">Ready for your next journey</p>
    </div>
  );
};

export default Profile;
