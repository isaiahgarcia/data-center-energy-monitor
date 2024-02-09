"use client";

import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

const Header = () => {
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
                <div className="flex flex-row space-x-2">
                    <p>Navbar</p>
                    <p>Button</p>
                </div>
            </div>
        </div>
    );
};

export default Header;