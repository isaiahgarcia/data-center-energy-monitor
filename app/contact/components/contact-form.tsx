"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { Check } from "lucide-react";
import { Lato } from "next/font/google";
import { FormEvent, useRef, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID || '';
const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID || '0';
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL || '';
const GOOGLE_SERVICE_PRIVATE_KEY = process.env.GOOGLE_SERVICE_PRIVATE_KEY || '';

// Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
const serviceAccountAuth = new JWT({
    // env var values here are copied from service account credentials generated by google
    // see "Authentication" section in docs for more info
    email: GOOGLE_CLIENT_EMAIL,
    key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
    ],
});

const lato = Lato({
    weight: "700",
    subsets: ["latin"],
})

const formSchema = z.object({
    name: z.string().min(1),
    email: z.string().email({ message: "Invalid email address" }),
    inquiry: z.enum(["suggestion", "question"]),
    message: z.string().min(10, { message: "Message must be 10 or more characters long." }),
});

type ContactFormValues = z.infer<typeof formSchema>;

// Append Function
const appendSpreadsheet = async (row: any) => {
    try {
        // GoogleSpreadsheet Initialize
        const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);

        // loads document properties and worksheets
        await doc.loadInfo();

        const sheet = doc.sheetsByTitle["Next.js App"];
        await sheet.addRow(row);
    } catch (e) {
        console.error('Error: ', e);
    }
};

export const ContactForm = () => {
    // Create a state that disables inputs if browser is loading
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const { executeRecaptcha } = useGoogleReCaptcha();

    // Create form
    const form = useForm<ContactFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            inquiry: 'suggestion',
            message: '',
        }
    });

    // Define submit handler 
    const onSubmit = (data: ContactFormValues) => {
        // setLoading(true);

        // try {
        //     const sheetsData = {
        //         ...data,
        //         date: new Date().toLocaleString("en-us", { year:"numeric", month:"short", day:"numeric" }),
        //     }
        //     console.log(sheetsData);
        //     appendSpreadsheet(sheetsData);
        // } catch (error) {
        //     console.log(error);
        // } finally {
        //     setLoading(false);
        // }

        if (!executeRecaptcha) {
            console.log("Execute recaptcha not available yet");
            return;
        }
        executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken) => {
            submitEnquiryForm(gReCaptchaToken, data);
        });
    };

    const submitEnquiryForm = (gReCaptchaToken : string, data: ContactFormValues) => {
        async function goAsync() {
          const response = await axios({
            method: "post",
            url: "/api/contactFormSubmit",
            data: {
              ...data,
              gRecaptchaToken: gReCaptchaToken,
            },
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
          });
    
    
          if (response?.data?.success === true) {
            console.log(`Success with score: ${response?.data?.score}`);
            // Append data to Google Sheets with timestamp
            const sheetsData = {
                ...data,
                date: new Date().toLocaleString("en-us", { year:"numeric", month:"short", day:"numeric" }),
            }
            appendSpreadsheet(sheetsData);
            console.log("Success! The submission has been added to Google Sheets");
            setSubmitted(true);
          } else {
            console.log(`Failure with score: ${response?.data?.score}`);
          }
        }
        goAsync().then(() => {}); // suppress typescript error
    };
    

    return (
        <>
            {!submitted ? 
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)} 
                        className={`${lato.className} space-y-8`}
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-white text-lg">Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-white text-lg">Email</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="inquiry"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                <FormLabel className="text-white text-lg">Inquiry Type</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-row space-x-3"
                                        disabled={loading}
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                            <RadioGroupItem value="suggestion" />
                                            </FormControl>
                                            <FormLabel className="font-normal text-white">
                                                Suggestion
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                            <RadioGroupItem value="question" />
                                            </FormControl>
                                            <FormLabel className="font-normal text-white">
                                                Question
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-white text-lg">Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Add a message."
                                        className="resize-none"
                                        disabled={loading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-center">
                            <Button variant={"contact"} type="submit">Submit</Button>
                        </div>
                    </form>
                </Form>
            :
                <div className={`${lato.className} h-full flex flex-col items-center justify-center text-white`}>
                    <h1 className="text-center">Thank you for your submission!</h1>
                    <Check />
                </div>
        }
        </>
    );
};