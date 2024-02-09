"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lato } from "next/font/google";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

export const ContactForm = () => {
    // Create a state that disables inputs if browser is loading
    const [loading, setLoading] = useState(false);
    const ref = useRef<HTMLFormElement>(null)

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
        try {
            setLoading(true);
            console.log(data);
        } catch (error) {
            console.log(data);
        } finally {
            setLoading(false);
        }
    };

    return (
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
    );
};