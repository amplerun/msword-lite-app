// ========================
// UTIL: storage.js
// Description: Document storage interface using LowDB
// ========================

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

// Ensure data directory exists
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize database
const adapter = new FileSync(path.join(DATA_DIR, 'documents.json'));
const db = low(adapter);

// Set defaults if DB is empty
db.defaults({ documents: [] }).write();

// ==== Document Storage Functions ====

/**
 * Save a new document or update an existing one
 * @param {string|null} id - Document ID (null for new document)
 * @param {string} name - Document name
 * @param {string} content - Document HTML content
 * @returns {Object} Saved document
 */
const saveDocument = (id, name, content) => {
  const timestamp = new Date().toISOString();
  
  if (id) {
    // Update existing document
    const existingDoc = db.get('documents').find({ id }).value();
    
    if (!existingDoc) {
      throw new Error('Document not found');
    }
    
    const updatedDoc = {
      ...existingDoc,
      name,
      content,
      updatedAt: timestamp
    };
    
    db.get('documents')
      .find({ id })
      .assign(updatedDoc)
      .write();
      
    return updatedDoc;
  } else {
    // Create new document
    const newDocument = {
      id: uuidv4(),
      name,
      content,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    
    db.get('documents')
      .push(newDocument)
      .write();
      
    return newDocument;
  }
};

/**
 * Get a document by ID
 * @param {string} id - Document ID
 * @returns {Object|null} Document or null if not found
 */
const getDocument = (id) => {
  return db.get('documents').find({ id }).value() || null;
};

/**
 * List all documents (with optional pagination)
 * @param {number} limit - Max documents to return
 * @param {number} offset - Number of documents to skip
 * @returns {Array} Documents
 */
const listDocuments = (limit = 100, offset = 0) => {
  return db.get('documents')
    .sortBy('updatedAt')
    .reverse()
    .slice(offset, offset + limit)
    .value();
};

/**
 * Delete a document
 * @param {string} id - Document ID
 * @returns {boolean} Success
 */
const deleteDocument = (id) => {
  const existingDoc = db.get('documents').find({ id }).value();
  
  if (!existingDoc) {
    return false;
  }
  
  db.get('documents')
    .remove({ id })
    .write();
    
  return true;
};

module.exports = {
  saveDocument,
  getDocument,
  listDocuments,
  deleteDocument
};