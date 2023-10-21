"use client";

import React from "react";

interface UserProfileCircleProps {
  firstName: string;
  lastName: string;
  imageURL?: string;
}

const UserProfileCircle: React.FC<UserProfileCircleProps> = ({
  firstName,
  lastName,
  imageURL,
}) => {
  return (
    <div className="w-10 h-10 relative hover:cursor-pointer ">
      <div className="w-full h-full bg-slate-500 dark:bg-white rounded-full flex items-center justify-center">
        <span className="font-bold text-xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text ">
          {firstName.charAt(0)}
          {lastName.charAt(0)}
        </span>
      </div>
    </div>
  );
};

export default UserProfileCircle;
