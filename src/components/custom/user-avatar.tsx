import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar() {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage className="p-1" src="/images/user.png" />
    </Avatar>
  );
}
