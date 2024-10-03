import React, { Suspense } from "react";
import { CreatorCard } from "./_components/creator-card";
import { assertAuthenticated } from "@/lib/session";
import { getAllCreatorsUseCase } from "@/use-cases/editor";
import { CreatorCardLoader } from "./_components/creator";
;
const CreatorPage = async () => {
  const session = await assertAuthenticated();
  const creators = await getAllCreatorsUseCase(session);
  
  return (
    <Suspense fallback={<CreatorCardLoader />}>
      <div className="text-black">
        <div className="gap-6 grid grid-cols-5">
          {creators.map((creator, i) => (
            <CreatorCard key={i} data={creator as Profile} />
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default CreatorPage;
