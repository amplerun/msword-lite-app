// ========================
// COMPONENT: Editor.jsx
// Description: Main rich text editor component using TipTap
// ========================

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import Highlight from '@tiptap/extension-highlight';

const Editor = ({ setEditor }) => {
  // ==== Editor Configuration ====
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
      TextStyle,
      Color,
      FontFamily,
      Highlight,
    ],
    content: '<h1>Welcome to MS Word Lite</h1><p>Start typing your document here...</p>',
    autofocus: true,
    editable: true,
  });

  // ==== Pass Editor to Parent Component ====
  useEffect(() => {
    if (editor) {
      setEditor(editor);
    }
  }, [editor, setEditor]);

  // ==== Auto-save to Local Storage ====
  useEffect(() => {
    if (editor) {
      const saveToLocalStorage = () => {
        localStorage.setItem('msword-lite-content', editor.getHTML());
      };
      
      // Save every 10 seconds when content changes
      const interval = setInterval(saveToLocalStorage, 10000);
      editor.on('update', saveToLocalStorage);
      
      // Try to load content from local storage on initial load
      const savedContent = localStorage.getItem('msword-lite-content');
      if (savedContent) {
        editor.commands.setContent(savedContent);
      }
      
      return () => {
        clearInterval(interval);
        editor.off('update', saveToLocalStorage);
      };
    }
  }, [editor]);

  return (
    <div className="editor-container">
      <EditorContent editor={editor} className="editor-content" />
    </div>
  );
};

export default Editor;
