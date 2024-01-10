"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition, useRef, ElementRef } from "react";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { UpdateUser } from "@/actions/user";

interface BioModalProps {
    initialvalue: string | null;
}
export const BioModal = ({ initialvalue }: BioModalProps) => {
    const [value, setValue] = useState(initialvalue || "");
    const [isPending, startTransition] = useTransition();
    const closeRef = useRef<ElementRef<"button">>(null);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(() => {
            UpdateUser({ bio: value })
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
                    <DialogTrigger>Edit Your Description</DialogTrigger>
                </DialogHeader>
                <form
                    className="space-y-4"
                    onSubmit={onSubmit}
                >
                    <Textarea
                        value={value || ""}
                        onChange={e => {
                            setValue(e.target.value);
                        }}
                        placeholder="User Description"
                        disabled={isPending}
                        className="resize-none"
                    />
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
