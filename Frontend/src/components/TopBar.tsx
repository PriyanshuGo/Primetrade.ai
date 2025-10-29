// src/components/TopBar.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "@/services/userService";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const TopBar = () => {
    const navigate = useNavigate();

  const [user, setUser] = useState<{ fullName: string; email: string } | null>(null);

  useEffect(() => {
    getProfile()
      .then((data) => setUser(data))
      .catch(() => {});
  }, []);

  return (
    <div className="flex justify-between items-center bg-white shadow-sm px-6 py-3 border-b">
      {/* Left - Title */}
      <h2 className="text-lg font-semibold tracking-tight text-gray-800">Dashboard</h2>

      {/* Right - User Info */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-3 hover:bg-gray-100">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/default-avatar.png" alt="avatar" />
              <AvatarFallback>
                {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline font-medium">{user?.fullName || "User"}</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel className="font-medium">
            {user?.fullName || "User"}
          </DropdownMenuLabel>
          <DropdownMenuItem className="text-sm text-gray-500">
            {user?.email}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/profile")}>
            View Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              localStorage.removeItem("accessToken");
              window.location.href = "/login";
            }}
            className="text-red-600"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TopBar;
