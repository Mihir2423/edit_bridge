import React, { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/utils";
import { CheckCircle, EyeIcon, XCircle } from "lucide-react";
import { requestsUseCase } from "@/use-cases/editor";
import Link from "next/link";

const ManagePage = async () => {
  const session = await auth();
  if (!session) {
    return <Card className="shadow-lg mx-auto max-w-4xl">Please sign in</Card>;
  }

  const editorRequests = await requestsUseCase(session);

  const receivedRequests =
    editorRequests.filter((req) => req.type === "received") || [];
  const sentRequests =
    editorRequests.filter((req) => req.type === "sent") || [];

  const RequestsTable = ({
    requests,
    isSent,
  }: {
    requests: Requests[];
    isSent: boolean;
  }) => (
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
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-red-50 border-red-500 text-red-500"
                      >
                        <XCircle className="mr-1 w-4 h-4" /> Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <CheckCircle className="mr-1 w-4 h-4" /> Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-red-50 border-red-500 text-red-500"
                      >
                        <XCircle className="mr-1 w-4 h-4" /> Reject
                      </Button>
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
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  return (
    <div className="mx-auto px-4 py-8 container">
      <Card className="shadow-lg mx-auto max-w-4xl">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="font-bold text-2xl text-gray-800">
            Manage Requests
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="received" className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="received">Received</TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
            </TabsList>
            <TabsContent value="received">
              <div className="overflow-x-auto">
                <RequestsTable requests={receivedRequests} isSent={false} />
              </div>
            </TabsContent>
            <TabsContent value="sent">
              <div className="overflow-x-auto">
                <RequestsTable requests={sentRequests} isSent={true} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <p className="mt-4 text-center text-gray-500 text-sm">
        This table contains all pending editor requests
      </p>
    </div>
  );
};

export default ManagePage;
