import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Features from "./features";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="grow flex flex-col items-center justify-evenly h-screen">
        <section className="space-y-5">
          <div className="container flex flex-col items-center gap-7 text-center">
            <h1 className="max-w-4xl font-heading font-semibold text-5xl text-accentblue sm:text-6xl md:text-6xl lg:text-8xl tracking-tighter">
            Lock In Focus, Lock Out Distractions.
            </h1>
            <p className="max-w-2xl leading-normal text-muted-foreground text-semibold sm:text-xl sm:leading-8">
              A web based application that helps you lock out custom apps to block out brain rot and be your most productive self.
            </p>
            <div className="space-x-4">
              <Link href="/login">
                <Button size="lg">Login</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Features/>
    </>
  );
}
