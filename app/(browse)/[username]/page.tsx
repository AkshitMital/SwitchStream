import { getUserbyUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { FollowingUser } from "@/lib/follow-service";
import { BlockedByUser } from "@/lib/block-service";
import { Index } from "@/components/stream-player";

interface userPageProps {
    params: {
        username: string;
    };
}

const userPage = async ({ params }: userPageProps) => {
    const user = await getUserbyUsername(params.username);

    if (!user || !user.stream) {
        notFound();
    }

    const isFollowing = await FollowingUser(user.id);
    const isBlocked = await BlockedByUser(user.id);

    if (isBlocked) {
        notFound();
    }

    return (
        <Index
            user={user}
            stream={user.stream}
            isFollowing={isFollowing}
        />
    );
};

export default userPage;
