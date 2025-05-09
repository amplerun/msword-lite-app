// ========================
// APP ENTRY: App.jsx
// Description: Main application component
// ========================

import React, { useState } from 'react';
import Editor from './components/Editor';
import Toolbar from './components/Toolbar';
import ExportMenu from './components/ExportMenu';
import { saveDocument, loadDocument } from './utils/documentUtils';

const App = () => {
  const [editor, setEditor] = useState(null);
  const [documentId, setDocumentId] = useState(null);
  const [documentName, setDocumentName] = useState('Untitled Document');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ==== Document Management Functions ====
  const handleSave = async () => {
    if (!editor) return;
    
    setIsSaving(true);
    try {
      const content = editor.getHTML();
      const result = await saveDocument(documentId, documentName, content);
      setDocumentId(result.id);
      alert('Document saved successfully');
    } catch (error) {
      console.error('Error saving document:', error);
      alert('Failed to save document');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoad = async (id) => {
    if (!id) {
      id = prompt('Enter document ID to load:');
      if (!id) return;
    }
    
    setIsLoading(true);
    try {
      const doc = await loadDocument(id);
      if (doc && editor) {
        editor.commands.setContent(doc.content);
        setDocumentName(doc.name);
        setDocumentId(doc.id);
      }
    } catch (error) {
      console.error('Error loading document:', error);
      alert('Failed to load document');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNew = () => {
    if (editor) {
      if (window.confirm('Create new document? Unsaved changes will be lost.')) {
        editor.commands.clearContent();
        setDocumentId(null);
        setDocumentName('Untitled Document');
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-700 text-white shadow-md no-print">
        <div className="container mx-auto p-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">MS Word Lite</h1>
            <input
              type="text"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              className="px-2 py-1 text-gray-800 rounded text-sm"
            />
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={handleNew}
              className="px-3 py-1 bg-blue-600 rounded text-sm hover:bg-blue-500"
            >
              New
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="px-3 py-1 bg-blue-600 rounded text-sm hover:bg-blue-500 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button 
              onClick={() => handleLoad()}
              disabled={isLoading}
              className="px-3 py-1 bg-blue-600 rounded text-sm hover:bg-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Load'}
            </button>
            <button 
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-3 py-1 bg-blue-600 rounded text-sm hover:bg-blue-500"
            >
              Export
            </button>
          </div>
        </div>
      </header>
      
      {showExportMenu && (
        <ExportMenu 
          editor={editor} 
          documentName={documentName}
          onClose={() => setShowExportMenu(false)} 
        />
      )}
      
      <Toolbar editor={editor} className="sticky top-0 z-10 no-print" />
      
      <div className="flex-grow overflow-auto">
        <Editor setEditor={setEditor} />
      </div>
    </div>
  );
};

export default App;