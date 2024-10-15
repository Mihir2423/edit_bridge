import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { CheckCircle, EyeIcon, XCircle } from "lucide-react";
import Link from "next/link";
import { ManageRequestBtn } from "./manage-req-btn";
export const RequestsTable = async ({
  requests,
  isSent,
}: {
  requests: Requests[];
  isSent: boolean;
}) => {
  const session = await auth();
  if (!session) {
    return <Card className="shadow-lg mx-auto max-w-4xl">Please sign in</Card>;
  }
  return (
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
        {requests.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4}>
              <div className="pt-5 text-center text-gray-500 text-sm">
                <p>No pending requests</p>
              </div>
            </TableCell>
          </TableRow>
        ) : (
          requests.map((request: Requests) => (
            <TableRow
              key={request.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <TableCell className="py-4 font-medium">
                {request.user.name}
              </TableCell>
              <TableCell className="py-4">{request.user.email}</TableCell>
              <TableCell className="py-4">
                {formatDate(`${request.createdAt}`)}
              </TableCell>
              <TableCell className="py-4">
                <div className="flex justify-end items-center gap-2">
                  {isSent ? (
                    <>
                      <ManageRequestBtn type="reject" requestId={request.id} />
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <ManageRequestBtn type="approve" requestId={request.id} />
                      <ManageRequestBtn type="reject" requestId={request.id} />
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="hover:bg-blue-50 border-blue-500 text-blue-500"
                      >
                        <Link
                          href={`/${session.user.userType === "creator" ? "editor" : "creator"}/${request?.user?.slug}`}
                        >
                          <EyeIcon className="mr-1 w-4 h-4" /> View
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
