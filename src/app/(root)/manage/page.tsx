import { auth } from "@/auth";
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
import { formatDate } from "@/lib/utils";
import { requestsUseCase } from "@/use-cases/editor";
import { CheckCircle, EyeIcon, XCircle } from "lucide-react";

const ManagePage = async () => {
  const session = await auth();
  if (!session) {
    return <Card className="shadow-lg mx-auto max-w-4xl">Please sign in</Card>;
  }
  const requests = await requestsUseCase(session);
  console.log(requests);

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
                {(requests ?? []).length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <div className="pt-5 text-center text-gray-500 text-sm">
                        <p>No pending requests</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  (requests ?? []).map((request) => (
                    <TableRow
                      key={request?.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="py-4 font-medium">
                        {request?.sender?.name}
                      </TableCell>
                      <TableCell className="py-4">
                        {request?.sender?.email}
                      </TableCell>
                      <TableCell className="py-4">
                        {formatDate(`${request?.createdAt}`)}
                      </TableCell>
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
                  ))
                )}
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
