"use client";

import { Inter } from "next/font/google";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const Header = () => {
    const router = useRouter();

    return (
        <div className={`${inter.className} bg-header text-white h-[70px]`}>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center space-x-5">
                    <Image
                        src="/images/isalab-logo.svg"
                        width={200}
                        height={200}
                        alt="Image"
                    />
                    <h1 className="text-lg">
                        Data Center Energy Monitor
                    </h1>
                </div>
                <div className="flex flex-row space-x-8 items-center pt-1.5 pr-5">
                    <p>Navbar</p>
                    <Button 
                        variant={"contact"}
                        onClick={() => router.push("/contact")}
                    >
                        Contact
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Header;