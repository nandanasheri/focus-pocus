"use client"

import { PacketsBarChart } from "./packetsbarchart";
import { PieChartAddIn } from "./pieChart";
import { TopBarChart } from "./barChartIP";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

const ApplicationPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState([]);


  // Define an async function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/activity', {
        headers: {
          'Cache-Control': 'no-cache', // Prevents caching of the response
          'Pragma': 'no-cache',
          'Expires': '0', // Ensures no cached data is used
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json(); // Parse the JSON data
      console.log(data)
      setData(data); // Update the state with the fetched data
      setLoading(false); // Set loading to false
      setTime(data['time'])
    } catch (error) {
      setLoading(false); // Set loading to false
    }
  };

  useEffect(() => {
    fetchData(); // Call the async fetch function when the component mounts
    // Set an interval to call the API every 30 seconds
    const intervalId = setInterval(fetchData, 5000); // 30000 ms = 30 seconds
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this runs only once when the component mounts

  return (
    <>
      <div className="flex-col md:flex space-y-4" >
        <div className="flex items-end justify-between space-y-2 mb-6">
          <h2 className="text-6xl leading-5 font-bold tracking-tight text-accentblue">
            Dashboard
          </h2>
        </div>
        <div>
          <TopBarChart/>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-8">
          <PieChartAddIn/>
          <div className="flex-col  space-y-6 col-span-4 ">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-3xl font-medium">
                  Top Domain
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-20 w-4 text-muted-foreground"
                />
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold">
                  Google
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-3xl font-medium">
                  Percentage of distarcting websites visited
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-20 w-4 text-muted-foreground"
                />
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold">
                  24.2%
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        <div>
          <PacketsBarChart chartData={time}/>
        </div>
      </div>
    </>
  );
};

export default ApplicationPage;
