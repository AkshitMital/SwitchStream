import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { LiveBadge } from "./live-badge";

const AvatarSizes = cva("", {
    variants: {
        size: {
            deault: "h-8 w-8",
            lg: "h-14 w-14",
        },
    },
    defaultVariants: {
        size: "deault",
    },
});

interface UserAvatarProps extends VariantProps<typeof AvatarSizes> {
    username: string;
    imageUrl: string;
    isLive?: boolean;
    showBadge?: boolean;
}

export const UserAvatar = ({ username, imageUrl, isLive, showBadge, size }: UserAvatarProps) => {
    const canShowBadge = showBadge && isLive;
    return (
        <div className="relative">
            <Avatar
                className={cn(
                    isLive && "ring-2 ring-rose-600 border border-background",
                    AvatarSizes({ size })
                )}
            >
                <AvatarImage
                    src={imageUrl}
                    className="object-cover"
                />
                <AvatarFallback>
                    {username[0]}
                    {username[username.length - 1]}
                </AvatarFallback>
            </Avatar>
            {canShowBadge && (
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <LiveBadge />
                </div>
            )}
        </div>
    );
};

interface UserAvatarSkeletonProps extends VariantProps<typeof AvatarSizes> {}

export const UserAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
    return <Skeleton className={cn("rounded-full", AvatarSizes({ size }))} />;
};
