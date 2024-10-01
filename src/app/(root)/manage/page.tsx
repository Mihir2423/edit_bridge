import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, EyeIcon, XCircle } from "lucide-react";

const ManagePage = () => {
  return (
    <>
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle className="font-bold text-2xl">Manage Requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Table className="rounded-[8px] overflow-hidden">
            <TableHeader className="bg-[#eae9e9] px-4 rounded-md">
              <TableRow className="px-3">
                <TableHead className="ml-1 font-semibold text-base text-black">
                  Name
                </TableHead>
                <TableHead className="font-semibold text-base text-black">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-base text-black">
                  Date
                </TableHead>
                <TableHead className="font-semibold text-base text-black text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3].map((item) => (
                <TableRow key={item}>
                  <TableCell className="font-medium">Editor Name</TableCell>
                  <TableCell>editor@gmail.com</TableCell>
                  <TableCell>12 Nov, 2024</TableCell>
                  <TableCell className="flex justify-end items-center gap-2">
                    <Button className="w-14">
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" className="w-14">
                      <XCircle className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" className="w-14">
                      <EyeIcon className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <p className="text-center text-gray-400 text-sm">This table contains all the pending editor&lsquo;s request</p>
    </>
  );
};

export default ManagePage;
