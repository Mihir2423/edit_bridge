import React from "react";
import { EditorCard } from "./_components/editor-card";

const EditorPage = () => {
  return (
    <div className="text-black">
      <div className="gap-6 grid grid-cols-5">
        <EditorCard />
      </div>
    </div>
  );
};

export default EditorPage;
