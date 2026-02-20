"use client";

import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { Editor, EditorContent, EditorContext, useEditor } from "@tiptap/react";
import { createPortal } from "react-dom";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Mention } from "@tiptap/extension-mention";
import { TaskList, TaskItem } from "@tiptap/extension-list";
import { Color, TextStyle } from "@tiptap/extension-text-style";
import { Placeholder, Selection } from "@tiptap/extensions";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Superscript } from "@tiptap/extension-superscript";
import { Subscript } from "@tiptap/extension-subscript";
import { TextAlign } from "@tiptap/extension-text-align";
import { Mathematics } from "@tiptap/extension-mathematics";
import { UniqueID } from "@tiptap/extension-unique-id";
import { Emoji, gitHubEmojis } from "@tiptap/extension-emoji";

// --- Hooks ---
import { useUiEditorState } from "@/hooks/use-ui-editor-state";
import { useScrollToHash } from "@/components/tiptap-ui/copy-anchor-link-button/use-scroll-to-hash";

// --- Custom Extensions ---
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import { UiState } from "@/components/tiptap-extension/ui-state-extension";
import { Image } from "@/components/tiptap-node/image-node/image-node-extension";
import { NodeBackground } from "@/components/tiptap-extension/node-background-extension";
import { NodeAlignment } from "@/components/tiptap-extension/node-alignment-extension";

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";

// --- Table Node ---
import { TableKit } from "@/components/tiptap-node/table-node/extensions/table-node-extension";
import { TableHandleExtension } from "@/components/tiptap-node/table-node/extensions/table-handle";
import { TableHandle } from "@/components/tiptap-node/table-node/ui/table-handle/table-handle";
import { TableSelectionOverlay } from "@/components/tiptap-node/table-node/ui/table-selection-overlay";
import { TableCellHandleMenu } from "@/components/tiptap-node/table-node/ui/table-cell-handle-menu";
import { TableExtendRowColumnButtons } from "@/components/tiptap-node/table-node/ui/table-extend-row-column-button";
import "@/components/tiptap-node/table-node/styles/prosemirror-table.scss";
import "@/components/tiptap-node/table-node/styles/table-node.scss";

import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { EmojiDropdownMenu } from "@/components/tiptap-ui/emoji-dropdown-menu";
import { MentionDropdownMenu } from "@/components/tiptap-ui/mention-dropdown-menu";
import { SlashDropdownMenu } from "@/components/tiptap-ui/slash-dropdown-menu";
import { DragContextMenu } from "@/components/tiptap-ui/drag-context-menu";

// --- Contexts ---
import { AppProvider } from "@/contexts/app-context";
import { UserProvider, useUser } from "@/contexts/user-context";

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

// --- Styles ---
import "@/components/tiptap-templates/notion-like/notion-like-editor.scss";

// --- Content ---
import { NotionEditorHeader } from "@/components/tiptap-templates/notion-like/notion-like-editor-header";
import { MobileToolbar } from "@/components/tiptap-templates/notion-like/notion-like-editor-mobile-toolbar";
import { NotionToolbarFloating } from "@/components/tiptap-templates/notion-like/notion-like-editor-toolbar-floating";
import { ListNormalizationExtension } from "@/components/tiptap-extension/list-normalization-extension";
import { imageUploadTiptapCustomHandler } from "@/lib/imageUploadTiptapCustomHandler";

export interface NotionEditorProps {
  placeholder?: string;
  onChange?: (content: any) => void;
  content?: any;
}

export interface EditorProviderProps {
  placeholder?: string;
  content?: any;
}

export interface NotionEditorRef {
  resetContent: () => void;
  clearContent: () => void;
}

/**
 * Loading spinner component shown while connecting to the notion server
 */
export function LoadingSpinner({ text = "Connecting..." }: { text?: string }) {
  return (
    <div className="spinner-container">
      <div className="spinner-content">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <div className="spinner-loading-text">{text}</div>
      </div>
    </div>
  );
}

/**
 * EditorContent component that renders the actual editor
 */
export function EditorContentArea() {
  const { editor } = useContext(EditorContext)!;
  const { isDragging } = useUiEditorState(editor);

  useScrollToHash();

  if (!editor) {
    return null;
  }

  return (
    <EditorContent
      editor={editor}
      role="presentation"
      className="notion-like-editor-content"
      style={{
        cursor: isDragging ? "grabbing" : "auto",
      }}
    >
      <DragContextMenu />
      <EmojiDropdownMenu />
      <MentionDropdownMenu />
      <SlashDropdownMenu />
      <NotionToolbarFloating />

      {createPortal(<MobileToolbar />, document.body)}
    </EditorContent>
  );
}

/**
 * Component that creates and provides the editor instance
 */
export const EditorProvider = forwardRef<
  NotionEditorRef,
  EditorProviderProps & {
    onChange?: (content: any) => void;
    onReset?: () => void;
  }
>((props, ref) => {
  const {
    placeholder = "Start writing...",
    onChange = () => {},
    content,
  } = props;
  const isContentLoaded = useRef(false);
  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "notion-like-editor",
      },
    },
    onUpdate: ({ editor, transaction }) => {
      if (!transaction.docChanged) return;
      onChange(editor.getJSON());
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        dropcursor: {
          width: 2,
        },
        link: { openOnClick: false },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder,
        emptyNodeClass: "is-empty with-slash",
      }),
      Mention,
      Emoji.configure({
        emojis: gitHubEmojis.filter(
          (emoji) => !emoji.name.includes("regional")
        ),
        forceFallbackImages: true,
      }),
      TableKit.configure({
        table: {
          resizable: true,
          cellMinWidth: 120,
        },
      }),
      NodeBackground,
      NodeAlignment,
      TextStyle,
      Mathematics,
      Superscript,
      Subscript,
      Color,
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Selection,
      Image,
      TableHandleExtension,
      ListNormalizationExtension,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 5,
        // upload: handleImageUpload,
        upload: imageUploadTiptapCustomHandler,
        onError: (error) => console.error("Upload failed:", error),
      }),
      UniqueID.configure({
        types: [
          "table",
          "paragraph",
          "bulletList",
          "orderedList",
          "taskList",
          "heading",
          "blockquote",
          "codeBlock",
        ],
      }),
      Typography,
      UiState,
    ],
  });

  useImperativeHandle(ref, () => ({
    resetContent() {
      editor?.commands.clearContent(true);
      isContentLoaded.current = false;
    },
    clearContent() {
      editor?.commands.clearContent(false);
    },
  }));

  useEffect(() => {
    if (!editor || !content || isContentLoaded.current) return;

    editor.commands.setContent(content); // false = keep history
    isContentLoaded.current = true;
  }, [editor, content]);

  if (!editor) {
    return <LoadingSpinner />;
  }

  return (
    <div className="notion-like-editor-wrapper">
      <EditorContext.Provider value={{ editor }}>
        {/* <NotionEditorHeader /> */}
        <EditorContentArea />

        <TableExtendRowColumnButtons />
        <TableHandle />
        <TableSelectionOverlay
          showResizeHandles={true}
          cellMenu={(props) => (
            <TableCellHandleMenu
              editor={props.editor}
              onMouseDown={(e) => props.onResizeStart?.("br")(e)}
            />
          )}
        />
      </EditorContext.Provider>
    </div>
  );
});

/**
 * Full editor with all necessary providers, ready to use with just a room ID
 */
export const NotionEditor = forwardRef<NotionEditorRef, NotionEditorProps>(
  (props, ref) => {
    const { onChange, placeholder = "Start writing...", content } = props;

    return (
      <UserProvider>
        <AppProvider>
          <EditorProvider
            ref={ref}
            placeholder={placeholder}
            onChange={onChange}
            content={content}
          />
        </AppProvider>
      </UserProvider>
    );
  }
);

/**
 * Internal component that handles the editor loading state
 */
export function NotionEditorContent({
  placeholder,
  onChange,
  content,
}: {
  placeholder?: string;
  onChange?: (content: any) => void;
  content?: any;
}) {
  return (
    <EditorProvider
      placeholder={placeholder}
      onChange={onChange}
      content={content}
    />
  );
}
