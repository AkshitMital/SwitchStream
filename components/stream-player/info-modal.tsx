"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { UploadDropzone } from "@/lib/uploadthing";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition, useRef, ElementRef } from "react";
import { useRouter } from "next/navigation";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { Hint } from "@/components/hint";
import { Trash } from "lucide-react";
import Image from "next/image";

interface InfoModalProps {
    initialName: string;
    initialThumbnailUrl: string | null;
}

export const InfoModal = ({ initialName, initialThumbnailUrl }: InfoModalProps) => {
    const router = useRouter();
    const closeRef = useRef<ElementRef<"button">>(null);
    const [isPending, startTransition] = useTransition();
    const [name, setName] = useState(initialName);
    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const onRemove = () => {
        startTransition(() => {
            updateStream({ thumbnailUrl: null })
                .then(() => {
                    closeRef?.current?.click();
                    toast.success("Thumbnail Removed");
                    setThumbnailUrl("");
                })
                .catch(() => {
                    toast.error("Something went wrong");
                });
        });
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(() => {
            updateStream({ name: name })
                .then(() => {
                    closeRef?.current?.click();
                    toast.success("Stream Name Updated");
                })
                .catch(() => {
                    toast.error("Something went wrong");
                });
        });
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="link"
                    size="sm"
                    className="ml-auto"
                >
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Your Info</DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={onSubmit}
                    className="space-y-8"
                >
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                            placeholder="Stream Name"
                            onChange={onChange}
                            value={name}
                            disabled={isPending}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Thumbnail</Label>
                        {thumbnailUrl ? (
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                                <div className="absolute top-2 right-2 z-[10]">
                                    <Hint
                                        label="Remove"
                                        asChild
                                        side="left"
                                    >
                                        <Button
                                            type="button"
                                            disabled={isPending}
                                            onClick={onRemove}
                                            className="h-auto w-auto p-1.5"
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </Hint>
                                </div>
                                <Image
                                    src={thumbnailUrl}
                                    alt="Thumbnail"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="rounded-xl border outline-dashed outline-muted">
                                <UploadDropzone
                                    endpoint="thumbnailUploader"
                                    onClientUploadComplete={res => {
                                        setThumbnailUrl(res?.[0]?.url);
                                        router.refresh();
                                        closeRef?.current?.click();
                                    }}
                                    appearance={{
                                        label: {
                                            color: "#FFFFFF",
                                        },
                                        allowedContent: {
                                            color: "#FFFFFF",
                                        },
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between">
                        <DialogClose
                            ref={closeRef}
                            asChild
                        >
                            <Button
                                type="button"
                                variant="ghost"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={isPending}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
