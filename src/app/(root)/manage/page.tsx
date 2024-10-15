import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { requestsUseCase } from "@/use-cases/editor";
import { RequestsTable } from "./_components/request-table";

const ManagePage = async () => {
  const session = await auth();
  if (!session) {
    return <Card className="shadow-lg mx-auto max-w-4xl">Please sign in</Card>;
  }

  const editorRequests = await requestsUseCase(session);
  console.log(editorRequests);

  const receivedRequests =
    editorRequests.filter(
      (req) => req.type === "received" && req.status === "pending"
    ) || [];
  const sentRequests =
    editorRequests.filter(
      (req) => req.type === "sent" && req.status === "pending"
    ) || [];

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
