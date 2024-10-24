"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { NotificationType } from "@/@types";

const NotificationsDropdown = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="p-10 mr-10">
        <h2>Your notifications</h2>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id}>{notification.title}</div>
          ))
        ) : (
          <span className="text-xs text-gray">No notifications</span>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;
