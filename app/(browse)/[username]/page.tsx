import { FollowingUser } from "@/lib/follow-service";
import { getUserbyUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { BlockedByUser } from "@/lib/block-service";

interface userPageProps {
  params: {
    username: string;
  };
}

const userPage = async ({ params }: userPageProps) => {
  const user = await getUserbyUsername(params.username);

  if (!user) {
    notFound();
  }

  const isFollowing = await FollowingUser(user.id);
  const isBlocked = await BlockedByUser(user.id);

  if (isBlocked) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-y-4">
      <p>Username: {user.username}</p>
      <p>User ID: {user.id}</p>
      <p>isFollowing: {`${isFollowing}`}</p>
      <p>is Blocked by this user: {`${isBlocked}`}</p>
      <Actions userId={user.id} isFollowing={isFollowing} />
    </div>
  );
};

export default userPage;
