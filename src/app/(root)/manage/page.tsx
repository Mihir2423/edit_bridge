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
  const requests = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      date: "12 Nov, 2024",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      date: "13 Nov, 2024",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      date: "14 Nov, 2024",
    },
  ];

  return (
    <div className="mx-auto px-4 py-8 container">
      <Card className="shadow-lg mx-auto max-w-4xl">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="font-bold text-2xl text-gray-800">
            Manage Requests
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="py-4 font-semibold text-base text-gray-700">
                    Name
                  </TableHead>
                  <TableHead className="py-4 font-semibold text-base text-gray-700">
                    Email
                  </TableHead>
                  <TableHead className="py-4 font-semibold text-base text-gray-700">
                    Date
                  </TableHead>
                  <TableHead className="text-right py-4 font-semibold text-base text-gray-700">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow
                    key={request.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="py-4 font-medium">
                      {request.name}
                    </TableCell>
                    <TableCell className="py-4">{request.email}</TableCell>
                    <TableCell className="py-4">{request.date}</TableCell>
                    <TableCell className="py-4">
                      <div className="flex justify-end items-center gap-2">
                        <Button
                          size="sm"
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <CheckCircle className="mr-1 w-4 h-4" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-red-50 border-red-500 text-red-500"
                        >
                          <XCircle className="mr-1 w-4 h-4" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-blue-50 border-blue-500 text-blue-500"
                        >
                          <EyeIcon className="mr-1 w-4 h-4" />
                          View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <p className="mt-4 text-center text-gray-500 text-sm">
        This table contains all pending editor requests
      </p>
    </div>
  );
};

export default ManagePage;
