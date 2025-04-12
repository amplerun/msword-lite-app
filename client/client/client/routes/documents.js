// ========================
// API: documents.js
// Description: Document CRUD operations routes
// ========================

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { saveDocument, getDocument, listDocuments, deleteDocument } = require('../storage');

// ==== GET /api/documents ====
// List all documents (with pagination)
router.get('/', asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 100;
  const offset = parseInt(req.query.offset) || 0;
  
  const documents = listDocuments(limit, offset);
  
  // Don't send full content in listings
  const documentsWithoutContent = documents.map(doc => ({
    id: doc.id,
    name: doc.name,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt
  }));
  
  res.json(documentsWithoutContent);
}));

// ==== POST /api/documents ====
// Create a new document
router.post('/', asyncHandler(async (req, res) => {
  const { name, content } = req.body;
  
  // Validation
  if (!content) {
    res.status(400).json({ error: 'Content is required' });
    return;
  }
  
  const document = saveDocument(null, name || 'Untitled Document', content);
  res.status(201).json(document);
}));

// ==== GET /api/documents/:id ====
// Get a specific document
router.get('/:id', asyncHandler(async (req, res) => {
  const document = getDocument(req.params.id);
  
  if (!document) {
    res.status(404).json({ error: 'Document not found' });
    return;
  }
  
  res.json(document);
}));

// ==== PUT /api/documents/:id ====
// Update a document
router.put('/:id', asyncHandler(async (req, res) => {
  const { name, content } = req.body;
  
  try {
    const document = saveDocument(req.params.id, name, content);
    res.json(document);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}));

// ==== DELETE /api/documents/:id ====
// Delete a document
router.delete('/:id', asyncHandler(async (req, res) => {
  const success = deleteDocument(req.params.id);
  
  if (!success) {
    res.status(404).json({ error: 'Document not found' });
    return;
  }
  
  res.json({ message: 'Document deleted' });
}));

module.exports = router;
