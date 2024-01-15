import { redirect } from "next/navigation";
import { Results, ResultsSkeleton } from "@/app/(browse)/search/_components/results";
import { Suspense } from "react";

interface SearchPagePros {
    searchParams: {
        term?: string;
    };
}

const SearchPage = ({ searchParams }: SearchPagePros) => {
    if (!searchParams.term) {
        redirect("/");
    }
    return (
        <div className="h-full p-8 max-w-screen-2xl mx-auto">
            <Suspense fallback={<ResultsSkeleton />}>
                <Results term={searchParams.term} />
            </Suspense>
        </div>
    );
};

export default SearchPage;
