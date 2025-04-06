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
  const [traffic, setTraffic] = useState(null);  
  const [time, setTime] = useState([]);
  const [topDomains, setTopDomains] = useState([])
  const [distractors, setDistractors] = useState(0.0)
  const [sources, setSources] = useState([])

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/activity', {
        headers: {
          'Cache-Control': 'no-cache', 
          'Pragma': 'no-cache',
          'Expires': '0', 
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); 

      setTraffic(data["traffic"]);
      setTopDomains(data['traffic'].sort((a, b) => b - a).slice(0,3))
      setDistractors(data['number'])
      setTime(data['time'])
      setSources(data['sources'])
    } catch (error) {}
  };

  useEffect(() => {
    fetchData(); 
    
    const intervalId = setInterval(fetchData, 5000); 
    return () => clearInterval(intervalId);
  }, []); 

  return (
    <>
      <div className="flex-col md:flex space-y-4" >
        <div className="flex items-end justify-between space-y-2 mb-6">
          <h2 className="text-6xl leading-5 font-bold tracking-tight text-accentblue">
            Dashboard
          </h2>
        </div>
        <div>
          <TopBarChart chartData={sources}/>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-8">
        {traffic ? (
            <PieChartAddIn traffic={traffic} />
          ) : (
            <p>Loading...</p>
          )}
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
              {topDomains.map(([site, visits], index) => (
                <CardContent key={index}>
                  <p className="text-3xl font-bold">
                    {index + 1}. {site}
                  </p>
                </CardContent>
              ))}
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-3xl font-medium">
                  Percentage of distracting websites visited
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
                  {distractors.toFixed(2)}%
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
