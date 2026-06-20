"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface BlogContentProps {
  content: unknown;
}

export default function BlogContent({ content }: BlogContentProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content as Parameters<typeof useEditor>[0] extends { content?: infer C } ? C : never,
    editable: false,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content as Parameters<typeof editor.commands.setContent>[0]);
    }
  }, [editor, content]);

  if (!editor) {
    if (typeof content === "string") {
      return (
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }
    return null;
  }

  return (
    <div className="prose prose-lg max-w-none prose-headings:font-playfair prose-a:text-[#D4AF37] prose-strong:text-[#1A1A1A]">
      <EditorContent editor={editor} />
    </div>
  );
}
