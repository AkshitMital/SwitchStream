"use server";

import { User } from "@prisma/client";
// @ts-ignore
import { getSelf } from "@/lib/auth-service";
// @ts-ignore
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const UpdateUser = async (values: Partial<User>) => {
    const self = await getSelf();

    const validData = {
        bio: values.bio,
    };

    const user = await db.user.update({
        where: { id: self.id },
        data: { ...validData },
    });

    revalidatePath(`/${self.username}`);
    revalidatePath(`/u/${self.username}`);

    return user;
};
