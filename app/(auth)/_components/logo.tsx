import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="bg-white rounded-full p-1">
        <Image
          src="/easternwaves.svg"
          alt="SwitchStream"
          height="100"
          width="100"
        />
      </div>
      <div className={cn("flex flex-col items-center", font.className)}>
        <p className="text-2xl font-semibold">SwitchStream</p>
        <p className="text-md text-muted-foreground">
          Streaming with a Witty Switch
        </p>
      </div>
    </div>
  );
};
