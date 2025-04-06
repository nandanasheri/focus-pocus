
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
    CardFooter,
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

export function TableEx() {
    return (
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
    />
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
    )
}
