import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export default function Features() {
    return (
        <>
        <div className="flex flex-col items-center justify-center bg-accentblue gap-4 p-6 h-full">
            <h3 className="text-primarywhite text-3xl font-bold">
              we're <span className="italic">not</span> lockdown browser
            </h3>
            <div className="flex items-center justify-center bg-accentblue gap-4">
                <Card className="border-teal-400 w-1/3 h-56">
                <CardHeader>
                    <CardTitle>Lock Out Apps via VPN</CardTitle>
                </CardHeader>
                <CardContent>
                    Remove distractions by placing restrictions on certain apps and websites. lock0ut
                    helps you essentially minimize distractions. Out of sight, out of mind.
                </CardContent>
                </Card>

                <Card className="border-teal-400 w-1/3 h-56">
                <CardHeader>
                    <CardTitle>See how others are doing</CardTitle>
                </CardHeader>
                <CardContent>
                    Mindlessly scrolling and consuming content is unfortunately a global phenomena. lock0ut places a
                    twist on the idea of a Leaderboard to have a Loserboard that tracks activity across users.
                </CardContent>
                </Card>

                <Card className="border-teal-400 w-1/3 h-56">
                <CardHeader>
                    <CardTitle>Analysis across sites</CardTitle>
                </CardHeader>
                <CardContent>
                    Categorized into different topics, get an insight into how much of your time is truly going into
                    apps like TikTok and Instagram compared to the NYT Mini Crossword or HackerNews.
                </CardContent>
                </Card>
            </div>
        </div>
        
        </>
    )
}