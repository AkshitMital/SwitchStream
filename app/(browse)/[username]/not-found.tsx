import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
    return (
        <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
            <h1 className="text-4xl">404</h1>
            <p>User couldn&apos;t be found</p>
            <Button
                variant="secondary"
                asChild
            >
                <Link href={"/"}>Go Back Home</Link>
            </Button>
        </div>
    );
};

export default NotFound;
