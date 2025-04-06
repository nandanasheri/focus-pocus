import { DemoDashboard } from "@/components/demo-dashboard/demo-dashboard";
<<<<<<< HEAD
=======
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const recentActivity = [
  {
    numId: "1",
    appName: "A1",
    hours: 3,
  },
  {
    numId: "2",
    appName: "B2",
    hours: 6,
  },
  {
    numId: "3",
    appName: "C3",
    hours: 9,
  },
  {
    numId: "4",
    appName: "D4",
    hours: 12,
  },

]
>>>>>>> page-dashboard

const ApplicationPage = () => {
  return (
    <>
<<<<<<< HEAD
    <div className="flex-col md:flex">
      <div className="flex items-end justify-between space-y-2 mb-6">
        <h2 className="text-3xl leading-5 font-bold tracking-tight">
          Dashboard
        </h2>
      </div>
    </div>
       
=======
    <div className="flex-col md:flex space-y-4" >
      <div className="flex items-end justify-between space-y-2 mb-6">
        <h2 className="text-6xl leading-5 font-bold tracking-tight text-accentblue">
          Dashboard
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
      <Card className="col-span-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Recent Activity
          </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
            {/* <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /> */}
            </svg>
            </CardHeader>
            <CardContent>
              <Table>
                 <TableBody>
                  {recentActivity.map((numId) => (
                  <TableRow key={numId.numId}>
                    <TableCell className="font-medium">{numId.numId}</TableCell>
                    <TableCell>{numId.appName}</TableCell>
                    <TableCell>{numId.hours}</TableCell>
                  </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
        </Card>
        <Card className="col-span-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total sites visited
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  {/* <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /> */}
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">example num</div>
               {/* <p className="text-xs text-muted-foreground">
                  
                </p> */}
              </CardContent>
            </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="flex flex-col justify-between col-span-3 bg-accentpinkish">
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
                  className="h-4 w-4 text-muted-foreground"
                >
                  {/* <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /> */}
                </svg>
              </CardHeader>
              <CardContent>
                {/* <div className="text-2xl font-bold"></div> */}
              <p className="text-5xl font-bold">
              example num
                </p>
              </CardContent>
            </Card>
            <Card className="col-span-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Recent Activity
          </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
            {/* <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /> */}
            </svg>
            </CardHeader>
            <CardContent>
              <Table>
                 <TableBody>
                  {recentActivity.map((numId) => (
                  <TableRow key={numId.numId}>
                    <TableCell className="font-medium">{numId.numId}</TableCell>
                    <TableCell>{numId.appName}</TableCell>
                    <TableCell>{numId.hours}</TableCell>
                  </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
        </Card>

            </div>
            </div>
>>>>>>> page-dashboard
    </>
  );
};
export default ApplicationPage;
