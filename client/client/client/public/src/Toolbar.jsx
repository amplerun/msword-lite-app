// ========================
// COMPONENT: Toolbar.jsx
// Description: Rich text editor toolbar with formatting controls
// ========================

import React from 'react';
import { 
  FaBold, FaItalic, FaUnderline, FaStrikethrough, 
  FaListUl, FaListOl, FaQuoteLeft, FaAlignLeft, 
  FaAlignCenter, FaAlignRight, FaAlignJustify, 
  FaRedo, FaUndo, FaImage, FaLink, FaHighlighter
} from 'react-icons/fa';

const Toolbar = ({ editor, className }) => {
  if (!editor) {
    return null;
  }

  // ==== Image Handler ====
  const addImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  // ==== File Upload Handler ====
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        editor.chain().focus().setImage({ src: event.target.result }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  // ==== Link Handler ====
  const setLink = () => {
    const url = prompt('Enter URL:');
    
    // cancelled
    if (url === null) {
      return;
    }
    
    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    
    // Update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  // ==== Color Picker Handler ====
  const setColor = (e) => {
    editor.chain().focus().setColor(e.target.value).run();
  };

  // ==== Font Family Handler ====
  const setFontFamily = (e) => {
    editor.chain().focus().setFontFamily(e.target.value).run();
  };

  return (
    <div className={`bg-gray-200 p-2 flex flex-wrap items-center gap-1 ${className}`}>
      {/* Basic Formatting */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded ${editor.isActive('bold') ? 'is-active bg-gray-300' : ''}`}
        title="Bold"
      >
        <FaBold />
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${editor.isActive('italic') ? 'is-active bg-gray-300' : ''}`}
        title="Italic"
      >
        <FaItalic />
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded ${editor.isActive('underline') ? 'is-active bg-gray-300' : ''}`}
        title="Underline"
      >
        <FaUnderline />
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-2 rounded ${editor.isActive('strike') ? 'is-active bg-gray-300' : ''}`}
        title="Strikethrough"
      >
        <FaStrikethrough />
      </button>
      
      <span className="border-r border-gray-400 h-6 mx-1"></span>
      
      {/* Text Alignment */}
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-2 rounded ${editor.isActive({ textAlign: 'left' }) ? 'is-active bg-gray-300' : ''}`}
        title="Align Left"
      >
        <FaAlignLeft />
      </button>
      
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-2 rounded ${editor.isActive({ textAlign: 'center' }) ? 'is-active bg-gray-300' : ''}`}
        title="Align Center"
      >
        <FaAlignCenter />
      </button>
      
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-2 rounded ${editor.isActive({ textAlign: 'right' }) ? 'is-active bg-gray-300' : ''}`}
        title="Align Right"
      >
        <FaAlignRight />
      </button>
      
      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={`p-2 rounded ${editor.isActive({ textAlign: 'justify' }) ? 'is-active bg-gray-300' : ''}`}
        title="Justify"
      >
        <FaAlignJustify />
      </button>
      
      <span className="border-r border-gray-400 h-6 mx-1"></span>
      
      {/* Lists */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded ${editor.isActive('bulletList') ? 'is-active bg-gray-300' : ''}`}
        title="Bullet List"
      >
        <FaListUl />
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded ${editor.isActive('orderedList') ? 'is-active bg-gray-300' : ''}`}
        title="Numbered List"
      >
        <FaListOl />
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded ${editor.isActive('blockquote') ? 'is-active bg-gray-300' : ''}`}
        title="Block Quote"
      >
        <FaQuoteLeft />
      </button>
      
      <span className="border-r border-gray-400 h-6 mx-1"></span>
      
      {/* Text Style */}
      <select 
        onChange={setFontFamily}
        className="p-1 rounded text-sm"
        title="Font Family"
      >
        <option value="">Font Family</option>
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Verdana">Verdana</option>
      </select>
      
      <input 
        type="color"
        onChange={setColor}
        className="w-8 h-8 rounded cursor-pointer"
        title="Text Color"
      />
      
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`p-2 rounded ${editor.isActive('highlight') ? 'is-active bg-gray-300' : ''}`}
        title="Highlight"
      >
        <FaHighlighter />
      </button>
      
      <span className="border-r border-gray-400 h-6 mx-1"></span>
      
      {/* Special Elements */}
      <button
        onClick={setLink}
        className={`p-2 rounded ${editor.isActive('link') ? 'is-active bg-gray-300' : ''}`}
        title="Insert Link"
      >
        <FaLink />
      </button>
      
      <button
        onClick={addImage}
        className="p-2 rounded"
        title="Insert Image from URL"
      >
        <FaImage />
      </button>
      
      <label className="p-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <FaImage /> Upload
      </label>
      
      <span className="border-r border-gray-400 h-6 mx-1"></span>
      
      {/* Undo/Redo */}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="p-2 rounded disabled:opacity-50"
        title="Undo"
      >
        <FaUndo />
      </button>
      
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="p-2 rounded disabled:opacity-50"
        title="Redo"
      >
        <FaRedo />
      </button>
      
      {/* Paragraph/Heading Formatting */}
      <select
        onChange={(e) => {
          const value = e.target.value;
          if (value === 'paragraph') {
            editor.chain().focus().setParagraph().run();
          } else if (value.startsWith('heading')) {
            const level = parseInt(value.split('-')[1]);
            editor.chain().focus().toggleHeading({ level }).run();
          }
        }}
        className="ml-2 p-1 rounded text-sm"
        value={
          editor.isActive('heading', { level: 1 }) ? 'heading-1' :
          editor.isActive('heading', { level: 2 }) ? 'heading-2' :
          editor.isActive('heading', { level: 3 }) ? 'heading-3' :
          'paragraph'
        }
      >
        <option value="paragraph">Paragraph</option>
        <option value="heading-1">Heading 1</option>
        <option value="heading-2">Heading 2</option>
        <option value="heading-3">Heading 3</option>
      </select>
    </div>
  );
};

export default Toolbar;