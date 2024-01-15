"use server";

import { BlockUser, UnblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";
import { getSelf } from "@/lib/auth-service";
import { RoomServiceClient } from "livekit-server-sdk";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
);

export const onBlock = async (id: string) => {
    const self = await getSelf();
    let blockedUser;
    try {
        blockedUser = await BlockUser(id);
    } catch {
        //user is guest
    }

    try {
        await roomService.removeParticipant(self.id, id);
    } catch {
        //user is not in the room
    }

    revalidatePath(`/u/${self.username}/community`);

    if (blockedUser) {
        revalidatePath(`/${blockedUser.blocked.username}`);
    }
    return blockedUser;
};

export const onUnblock = async (id: string) => {
    const self = await getSelf();
    const unblockedUser = await UnblockUser(id);

    revalidatePath(`/u/${self.username}/community`);

    return unblockedUser;
};
