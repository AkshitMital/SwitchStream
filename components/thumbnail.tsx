import { UserAvatar } from "@/components/user-avatar";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { LiveBadge } from "@/components/live-badge";

interface ThumbnailProps {
    src: string | null;
    fallback: string;
    isLive: boolean;
    username: string;
}

export const Thumbnail = ({ src, fallback, isLive, username }: ThumbnailProps) => {
    let content;
    if (!src) {
        content = (
            <div className="bg-background flex flex-col items-center justify-center gap-y-4 h-full w-full transform transition-all group-hover:translate-x-1 group-hover:-translate-y-1  duration-150 group-hover:border group-hover:border-[#C5C5C5] rounded-md shadow-md group-hover:shadow-[#C5C5C5]">
                <UserAvatar
                    size="lg"
                    showBadge
                    username={username}
                    imageUrl={fallback}
                    isLive={isLive}
                />
            </div>
        );
    } else {
        content = (
            <Image
                src={src}
                fill
                alt="Thumbnail"
                className="object-cover transform transition-all group-hover:translate-x-1 group-hover:-translate-y-1  duration-150 group-hover:border group-hover:border-[#C5C5C5] rounded-md shadow-md group-hover:shadow-[#C5C5C5]"
            />
        );
    }

    return (
        <div className="group aspect-video rounded-md relative cursor-pointer">
            <div className="rounded-md absolute inset-0 bg-[#C5C5C5] shadow-md opacity-0 group-hover:opacity-100 group-hover:shadow-[#C5C5C5] transition-opacity flex items-center justify-center" />
            {content}
            {isLive && src && (
                <div className="absolute top-2 left-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform">
                    <LiveBadge />
                </div>
            )}
        </div>
    );
};

export const ThumbnailSkeleton = () => {
    return (
        <div className="group aspect-video relative rounded-xl cursor-pointer">
            <Skeleton className="h-full w-full" />
        </div>
    );
};
