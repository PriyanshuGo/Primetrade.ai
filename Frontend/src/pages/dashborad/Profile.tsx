// src/pages/dashboard/Profile.tsx
import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "@/services/userService";
import type { UserProfile } from "@/types/user";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Profile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setUser(data);
    } catch {
      toast.error("Failed to fetch profile");
    }
  };

  const handleUpdate = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const updated = await updateProfile(user);
      setUser(updated);
      toast.success("Profile updated");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Full Name"
            value={user?.fullName || ""}
            onChange={(e) => setUser({ ...user!, fullName: e.target.value })}
          />
          <Input
            placeholder="Phone Number"
            value={user?.phoneNumber || ""}
            onChange={(e) => setUser({ ...user!, phoneNumber: e.target.value })}
          />
          <Textarea
            placeholder="Bio"
            value={user?.bio || ""}
            onChange={(e) => setUser({ ...user!, bio: e.target.value })}
          />
          <Input
            placeholder="Address"
            value={user?.address || ""}
            onChange={(e) => setUser({ ...user!, address: e.target.value })}
          />
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? "Saving..." : "Update Profile"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
