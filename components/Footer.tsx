"use client";

import { Inter, Lato } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });
const lato = Lato({
    weight: "400",
    subsets: ["latin"]
});

const ACTIVE_ROUTE = "underline underline-offset-2";
const INACTIVE_ROUTE = "hover:underline hover:underline-offset-2";

const Footer = () => {
    const pathname = usePathname();

    return (
        <div className="bg-footer text-white h-[175px]">
            <div className="flex flex-row">
                <div className="basis-5/6 flex flex-row items-start justify-between pt-2 pl-2 pb-2 pr-20">
                    <Link href="/">
                        <h1 className={`${lato.className} text-2xl`}>DATA CENTER ENERGY MONITOR</h1>
                    </Link>
                    <div className={`${inter.className} flex flex-row space-x-10`}>
                        <div className="flex flex-col space-y-3">
                            <h1>Industry Trends</h1>
                            <div className="font-extralight text-sm">
                                <Link href="/explore">
                                    <p className={pathname === "/explore" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>Overview</p>
                                </Link>
                                <Link href="/explore/reporting-transparency">
                                    <p className={pathname === "/explore/reporting-transparency" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>Energy Reporting Trends</p>
                                </Link>
                                <Link href="/explore/energy-data-trends">
                                    <p className={pathname === "/explore/energy-data-trends" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>Energy Data Trends</p>
                                </Link>
                                <Link href="/explore/reporting-timeline">
                                    <p className={pathname === "/explore/reporting-timeline" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>Reporting Timeline</p>
                                </Link>
                                <Link href="/explore/pue-trends">
                                    <p className={pathname === "/explore/pue-trends" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>PUE Trends</p>
                                </Link>
                                <Link href="/explore/company-analysis">
                                    <p className={pathname === "/explore/company-analysis" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>Company Analysis</p>
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3">
                            <h1>Background</h1>
                            <div className="font-extralight text-sm">
                                <Link href="/methods">
                                    <p className={pathname === "/methods" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>Methods</p>
                                </Link>
                                <Link href="/contact">
                                    <p className={pathname === "/contact" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>Contact</p>
                                </Link>
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