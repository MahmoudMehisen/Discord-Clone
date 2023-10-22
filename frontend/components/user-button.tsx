"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface UserProfileCircleProps {
  firstName: string;
  lastName: string;
  imageURL?: string;
}

const UserProfileCircle: React.FC<UserProfileCircleProps> = ({
  firstName,
  lastName,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
        <div className="w-10 h-10 relative hover:cursor-pointer ">
          <div className="w-full h-full bg-slate-500 dark:bg-white rounded-full flex items-center justify-center">
            <span className="font-bold text-xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text ">
              {firstName.charAt(0)}
              {lastName.charAt(0)}
            </span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60 mt-4 mr-4"
        align="start"
        side="bottom"
        forceMount
      >
        <DropdownMenuItem className="text-red-500" onClick={() => {}}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileCircle;
