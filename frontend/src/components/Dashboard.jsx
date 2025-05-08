import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const API_URL = 'http://localhost:3000/api';

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchNotes = async () => {
    if (!currentUser) return;
    setIsLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API_URL}/notes`, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });
      setNotes(res.data.notes || []);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to fetch notes.');
      console.error('Fetch notes error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createNote = async () => {
    if (!newNote.trim()) {
      setError('Note cannot be empty');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const res = await axios.post(
        `${API_URL}/notes`,
        { content: newNote },
        { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
      );
      setNotes([{ id: res.data.note_id, content: res.data.content }, ...notes]);
      setNewNote('');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to create note.');
      console.error('Create note error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    setIsLoading(true);
    setError('');
    try {
      await axios.delete(`${API_URL}/notes/${id}`, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to delete note.');
      console.error('Delete note error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateNote = async (id) => {
    if (!editingContent.trim()) {
      setError('Note cannot be empty');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await axios.put(
        `${API_URL}/notes/${id}`,
        { content: editingContent },
        { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
      );
      setNotes(notes.map((note) => (note.id === id ? { ...note, content: editingContent } : note)));
      setEditingId(null);
      setEditingContent('');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to update note.');
      console.error('Update note error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [currentUser]);

  if (!currentUser) {
    return <p className="text-center text-gray-500 py-4">Please login to view your notes.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Create Note</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>
          )}
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            placeholder="Write your note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            disabled={isLoading}
          />
          <button
            onClick={createNote}
            disabled={isLoading}
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? 'Creating...' : 'Create Note'}
          </button>

          <div className="border-t pt-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Notes</h2>
            {isLoading && notes.length === 0 ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading notes...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="border p-4 rounded-md shadow-sm bg-white hover:shadow-md transition-shadow"
                  >
                    {editingId === note.id ? (
                      <>
                        <textarea
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          disabled={isLoading}
                        />
                        <div className="flex justify-end gap-2 mt-3">
                          <button
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                            onClick={() => updateNote(note.id)}
                            disabled={isLoading}
                          >
                            {isLoading ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
                            onClick={() => {
                              setEditingId(null);
                              setEditingContent('');
                            }}
                            disabled={isLoading}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-800 whitespace-pre-wrap">{note.content}</p>
                        <div className="flex justify-end gap-2 mt-3">
                          <button
                            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
                            onClick={() => {
                              setEditingId(note.id);
                              setEditingContent(note.content);
                            }}
                            disabled={isLoading}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                            onClick={() => deleteNote(note.id)}
                            disabled={isLoading}
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {notes.length === 0 && !isLoading && (
                  <p className="text-center text-gray-500 py-4">No notes yet. Create your first note above!</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;