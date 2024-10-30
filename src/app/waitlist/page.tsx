"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit3, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { addToWaitListAction } from "./actions";

export default function Component() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { execute, isPending } = useServerAction(addToWaitListAction, {
    onError({ err }) {
      console.log(err);
      toast.message(err.message);
    },
    onSuccess() {
      toast.success("Request sent successfully");
      setSubmitted(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    execute({ email });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="top-0 left-0 absolute flex items-center px-4 sm:px-6 border-b w-full h-14">
        <Link href="/" className="flex items-center space-x-2 font-semibold">
          <Edit3 className="w-6 h-6" />
          <span>Edit Bridge</span>
        </Link>
      </nav>
      <main className="flex flex-col flex-1 justify-center items-center p-4 sm:p-8">
        <div className="space-y-8 mx-auto w-full max-w-xl text-center">
          <div className="inline-flex items-center bg-primary/10 px-3 py-1 rounded-full text-primary text-sm">
            Coming Soon
          </div>

          <h1 className="font-bold text-4xl sm:text-5xl tracking-tight">
            Join the waitlist for early access
          </h1>

          <p className="mx-auto max-w-md text-muted-foreground text-xl">
            Be the first to experience seamless content collaboration between
            creators and editors.
          </p>

          {submitted ? (
            <div className="bg-primary/10 mt-8 p-6 rounded-lg text-primary">
              <p className="font-medium">Thank you for joining the waitlist!</p>
              <p className="mt-2 text-sm">
                We&apos;ll notify you when we launch.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex sm:flex-row flex-col gap-4 mx-auto max-w-md"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
              <Button
                type="submit"
                disabled={isPending}
                size="lg"
                className="flex items-center h-12"
              >
                {isPending && (
                  <Loader2 size={16} className="mr-2 animate-spin" />
                )}
                Join Waitlist
              </Button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
