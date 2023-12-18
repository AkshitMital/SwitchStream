import { FollowingUser } from "@/lib/follow-service";
import { getUserbyUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";

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

  return (
    <div className="flex flex-col gap-y-4">
      <p>Username: {user.username}</p>
      <p>User ID: {user.id}</p>
      <p>isFollowing: {`${isFollowing}`}</p>
      <Actions userId={user.id} isFollowing={isFollowing} />
    </div>
  );
};

export default userPage;
