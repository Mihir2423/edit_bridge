import React, { Suspense } from "react";
import { EditorCard } from "./_components/editor-card";
import { assertAuthenticated } from "@/lib/session";
import { getAllEditorsUseCase } from "@/use-cases/editor";
import { EditorCardLoader } from "./_components/editor-loader";

const EditorPage = async () => {
  const session = await assertAuthenticated();
  const editors = await getAllEditorsUseCase(session);
  
  return (
    <Suspense fallback={<EditorCardLoader />}>
      <div className="text-black">
        <div className="gap-6 grid grid-cols-5">
          {editors.map((editor, i) => (
            <EditorCard key={i} data={editor as Profile} />
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default EditorPage;
