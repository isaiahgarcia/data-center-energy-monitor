import { Lato, Lora } from "next/font/google";
import Image from "next/image";
import { ContactForm } from "./components/contact-form";
import GoogleCaptchaWrapper from "./components/google-captcha-wrapper";

const lato = Lato({
    weight: "400",
    subsets: ["latin"],
});

const lora = Lora({
    subsets: ["latin"],
})

const ContactPage = () => {
    return (
        <div className="bg-white text-black w-full h-full">
            <div className="flex flex-row space-x-15 p-20">
                <div className="flex flex-col items-start space-y-72">
                    <div>
                        <h1 className="text-6xl">Contact Us</h1>
                        <p className={`${lato.className} pl-2`}>Bren Hall, UC Santa Barbara</p>
                    </div>
                    <div className={`${lora.className} flex flex-col items-start space-y-2`}>
                        <h1 className="text-xl">Principal Investigator</h1>
                        <div className="flex flex-row w-2/3 items-start space-x-5">
                            <Image
                                src="/images/eric-masanet.jpeg"
                                alt="Eric Masanet"
                                width={100}
                                height={130}
                            />
                            <div className="flex flex-col items-start space-y-2">
                                <div>
                                    <h1 className="font-semibold text-xl">Eric Masanet, Ph.D.</h1>
                                    <p>Professor & Mellichamp Chair of Emerging Technologies</p>
                                    <p>UC Santa Barbara</p>
                                </div>
                                <div className="flex flex-row space-x-3">
                                    <a href="https://bren.ucsb.edu/people/eric-masanet" rel="noopener noreferrer" target="_blank">
                                    <p className="underline underline-offset-2 hover:bg-[#d1ecf6]">Biography</p>
                                    </a>
                                    <p>|</p>
                                    <a href="https://scholar.google.com/citations?user=B3lsw18AAAAJ&hl=en" rel="noopener noreferrer" target="_blank">
                                    <p className="underline underline-offset-2 hover:bg-[#d1ecf6]">Google Scholar</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-header w-1/2 rounded-3xl p-10">
                    <GoogleCaptchaWrapper>
                        <ContactForm />
                    </GoogleCaptchaWrapper>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;