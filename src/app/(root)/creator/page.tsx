import React, { Suspense } from "react";
import { CreatorCard } from "./_components/creator-card";
import { assertAuthenticated } from "@/lib/session";
import { getAllCreatorsUseCase, getMyCreatorsUseCase } from "@/use-cases/editor";
import { CreatorCardLoader } from "./_components/creator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CreatorPage = async () => {
  const session = await assertAuthenticated();
  const creators = await getAllCreatorsUseCase(session);
  const myCreators = await getMyCreatorsUseCase(session?.id);
  
  return (
    <Suspense fallback={<CreatorCardLoader />}>
      <div className="text-black">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4 w-fit">
            <TabsTrigger value="all" className="w-fit">All Creators</TabsTrigger>
            <TabsTrigger value="my" className="w-fit">My Creators</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="gap-6 grid grid-cols-5">
              {creators.map((creator, i) => (
                <CreatorCard key={i} data={creator as Profile} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="my">
            <div className="gap-6 grid grid-cols-5">
              {myCreators.map((creator, i) => (
                <CreatorCard key={i} data={creator as Profile} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Suspense>
  );
};

export default CreatorPage;
