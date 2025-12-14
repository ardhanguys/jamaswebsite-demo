import { useRef, useCallback, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Minus,
  Undo,
  Redo,
  Type
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);

  // Set initial value only once on mount
  useEffect(() => {
    if (editorRef.current && !isInitializedRef.current) {
      editorRef.current.innerHTML = value || "";
      isInitializedRef.current = true;
    }
  }, []);

  // Update content when value changes externally (e.g., when editing different post)
  useEffect(() => {
    if (editorRef.current && isInitializedRef.current) {
      const currentContent = editorRef.current.innerHTML;
      if (value !== currentContent && value === "") {
        editorRef.current.innerHTML = "";
      }
    }
  }, [value]);

  const execCommand = useCallback((command: string, cmdValue?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, cmdValue);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const insertLink = useCallback(() => {
    const url = prompt("Masukkan URL:");
    if (url) {
      execCommand("createLink", url);
    }
  }, [execCommand]);

  const formatBlock = useCallback((tag: string) => {
    execCommand("formatBlock", tag);
  }, [execCommand]);

  const ToolbarButton = ({ 
    onClick, 
    title, 
    children 
  }: { 
    onClick: () => void; 
    title: string; 
    children: React.ReactNode 
  }) => (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      title={title}
      className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
    >
      {children}
    </button>
  );

  const ToolbarDivider = () => (
    <div className="w-px h-6 bg-border mx-1" />
  );

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-cream">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-background border-b border-border">
        {/* Undo/Redo */}
        <ToolbarButton onClick={() => execCommand("undo")} title="Undo (Ctrl+Z)">
          <Undo size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCommand("redo")} title="Redo (Ctrl+Y)">
          <Redo size={18} />
        </ToolbarButton>
        
        <ToolbarDivider />

        {/* Text Formatting */}
        <ToolbarButton onClick={() => execCommand("bold")} title="Bold (Ctrl+B)">
          <Bold size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCommand("italic")} title="Italic (Ctrl+I)">
          <Italic size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCommand("underline")} title="Underline (Ctrl+U)">
          <Underline size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCommand("strikeThrough")} title="Strikethrough">
          <Strikethrough size={18} />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Headings */}
        <ToolbarButton onClick={() => formatBlock("p")} title="Paragraf">
          <Type size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => formatBlock("h1")} title="Heading 1">
          <Heading1 size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => formatBlock("h2")} title="Heading 2">
          <Heading2 size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => formatBlock("h3")} title="Heading 3">
          <Heading3 size={18} />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Lists */}
        <ToolbarButton onClick={() => execCommand("insertUnorderedList")} title="Bullet List">
          <List size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCommand("insertOrderedList")} title="Numbered List">
          <ListOrdered size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => formatBlock("blockquote")} title="Kutipan">
          <Quote size={18} />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Alignment */}
        <ToolbarButton onClick={() => execCommand("justifyLeft")} title="Rata Kiri">
          <AlignLeft size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCommand("justifyCenter")} title="Rata Tengah">
          <AlignCenter size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCommand("justifyRight")} title="Rata Kanan">
          <AlignRight size={18} />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Insert */}
        <ToolbarButton onClick={insertLink} title="Sisipkan Link">
          <Link size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCommand("insertHorizontalRule")} title="Garis Horizontal">
          <Minus size={18} />
        </ToolbarButton>
      </div>

      {/* Editor Content */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[300px] p-4 focus:outline-none prose prose-sm max-w-none
          prose-headings:text-primary prose-headings:font-bold
          prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
          prose-p:text-foreground prose-p:leading-relaxed
          prose-a:text-accent prose-a:underline
          prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-4 prose-blockquote:italic
          prose-ul:list-disc prose-ul:pl-5
          prose-ol:list-decimal prose-ol:pl-5
          prose-li:text-foreground"
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />

      {/* Empty state placeholder */}
      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: hsl(var(--muted-foreground));
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
