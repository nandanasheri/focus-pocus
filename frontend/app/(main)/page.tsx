import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="grow flex flex-col items-center justify-evenly h-screen">
        <section className="space-y-5">
          <div className="container flex flex-col items-center gap-5 text-center">
            <h1 className="max-w-4xl font-heading font-semibold text-5xl text-accentblue sm:text-6xl md:text-6xl lg:text-8xl tracking-tighter">
              Lock0ut, Explore Your Traffic.
            </h1>
            <p className="max-w-2xl leading-normal text-muted-foreground text-semibold sm:text-xl sm:leading-8">
              A web based application that helps you to monitor your network traffic to warn you about your brain rot doom scrolling every day.
            </p>
            <div className="space-x-4">
              <Link href="/app">
                <Button size="lg">Try it</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
