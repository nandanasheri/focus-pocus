import { PacketsBarChart } from "./packetsbarchart";
import { PieChartAddIn } from "./pieChart";
import { TopBarChart } from "./barChartIP";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

const ApplicationPage = () => {
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
                  Top site visited
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
          <PacketsBarChart />
        </div>
      </div>
    </>
  );
};

export default ApplicationPage;
