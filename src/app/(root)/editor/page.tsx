import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { assertAuthenticated } from "@/lib/session";
import { getAllEditorsUseCase, getMyEditorsUseCase } from "@/use-cases/editor";
import { Suspense } from "react";
import { EditorCard } from "./_components/editor-card";
import { EditorCardLoader } from "./_components/editor-loader";
import { TabsContent } from "@radix-ui/react-tabs";
const EditorPage = async () => {
  const session = await assertAuthenticated();
  const editors = await getAllEditorsUseCase(session);
  const myEditors = await getMyEditorsUseCase(session?.id);
  return (
    <Suspense fallback={<EditorCardLoader />}>
      <div className="text-black">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4 w-fit">
            <TabsTrigger value="all" className="w-fit">
              All Creators
            </TabsTrigger>
            <TabsTrigger value="my" className="w-fit">
              My Creators
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="gap-6 grid grid-cols-5">
              {editors.map((editor, i) => (
                <EditorCard key={i} data={editor as Profile} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="my">
            <div className="gap-6 grid grid-cols-5">
              {myEditors.map((editor, i) => (
                <EditorCard key={i} data={editor as any} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Suspense>
  );
};

export default EditorPage;
