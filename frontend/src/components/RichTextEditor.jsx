import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: "hey this is the subtitle for trial course",
  });

  if (!editor) return null;

  return (
    <div style={styles.wrapper}>
      {/* Toolbar */}
      <div style={styles.toolbar}>
        {/* Normal dropdown */}
        <select
          onChange={(e) => {
            if (e.target.value === "normal") {
              editor.chain().focus().setParagraph().run();
            }
            if (e.target.value === "h1") {
              editor.chain().focus().toggleHeading({ level: 1 }).run();
            }
          }}
          style={styles.select}
        >
          <option value="normal">Normal</option>
          <option value="h1">Heading</option>
        </select>

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          style={styles.btn}
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          style={styles.btn}
        >
          I
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          style={styles.btn}
        >
          U
        </button>

        <button
          onClick={() => {
            const url = prompt("Enter URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          style={styles.btn}
        >
          🔗
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          style={styles.btn}
        >
          1.
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          style={styles.btn}
        >
          •
        </button>

        <button
          onClick={() =>
            editor.chain().focus().unsetAllMarks().clearNodes().run()
          }
          style={styles.btn}
        >
          Tx
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} style={styles.editor} />
    </div>
  );
};

export default RichTextEditor;

const styles = {
  wrapper: {
    border: "1px solid #ccc",
    borderRadius: 4,
    fontFamily: "Arial, sans-serif",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: 8,
    borderBottom: "1px solid #ddd",
    background: "#f8f8f8",
  },
  btn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontWeight: "bold",
  },
  select: {
    padding: "4px 6px",
  },
  editor: {
    minHeight: 120,
    padding: 10,
  },
};
