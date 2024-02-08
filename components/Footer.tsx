"use client";

import { Inter, Lato } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });
const lato = Lato({
    weight: "400",
    subsets: ["latin"]
});

const Footer = () => {
    return (
        <div className="bg-footer h-[150px]">
            <div className="flex flex-row">
                <div className="basis-5/6 flex flex-row items-start justify-between pt-2 pl-2 pb-2 pr-20">
                    <h1 className={`${lato.className} text-2xl`}>DATA CENTER ENERGY MONITOR</h1>
                    <div className={`${inter.className} flex flex-row space-x-10`}>
                        <div className="flex flex-col space-y-3">
                            <h1>Industry Trends</h1>
                            <div className="font-extralight text-sm">
                                <p>Energy Reporting Trends</p>
                                <p>Energy Data Trends</p>
                                <p>Reporting Timeline</p>
                                <p>PUE Trends</p>
                                <p>Company Analysis</p>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3">
                            <h1>Background</h1>
                            <div className="font-extralight text-sm">
                                <p>Methods</p>
                                <p>Contact</p>
                                <p>ISA Lab</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="basis-1/6 pt-10 pl-10 pl-3 pb-3">
                    <Image
                        src="/images/isalab-logo.svg"
                        width={150}
                        height={150}
                        alt="Image"
                    />
                    <h1 className={`${lato.className} text-md`}>UC SANTA BARBARA</h1>
                </div>
            </div>
        </div>
    );
};

export default Footer;