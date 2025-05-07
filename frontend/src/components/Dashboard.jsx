import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notes', {
        withCredentials: true,
      });
      setNotes(res.data);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    }
  };

  const createNote = async () => {
    if (!newNote.trim()) return;
    try {
      const res = await axios.post(
        'http://localhost:5000/api/notes',
        { content: newNote },
        { withCredentials: true }
      );
      setNotes([res.data, ...notes]);
      setNewNote('');
    } catch (err) {
      console.error('Failed to create note:', err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        withCredentials: true,
      });
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

  const updateNote = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/notes/${id}`,
        { content: editingContent },
        { withCredentials: true }
      );
      setNotes(
        notes.map((note) =>
          note.id === id ? { ...note, content: res.data.content } : note
        )
      );
      setEditingId(null);
      setEditingContent('');
    } catch (err) {
      console.error('Failed to update note:', err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchNotes();
    }
  }, [currentUser]);

  return (
    <div className='bg-gray-100 flex items-center justify-center h-screen'>
      <div className='w-[600px] rounded-lg shadow-lg p-6 bg-white'>
        <h2 className='text-2xl font-semibold mb-4'>Create Note</h2>
        <textarea
          className='w-full p-2 border border-gray-300 rounded-md h-32 resize-none'
          placeholder='Write your note...'
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        ></textarea>
        <button
          onClick={createNote}
          className='mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'
        >
          Create Note
        </button>

        <div className='border-t pt-4 mt-6'>
          <h2 className='text-2xl font-semibold mb-4'>Your Notes</h2>
          <div className='space-y-4 overflow-y-auto max-h-96'>
            {notes.map((note) => (
              <div key={note.id} className='border p-3 rounded-md shadow-sm bg-gray-50'>
                {editingId === note.id ? (
                  <>
                    <textarea
                      className='w-full p-2 border border-gray-300 rounded-md'
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                    />
                    <div className='flex justify-end gap-2 mt-2'>
                      <button
                        className='bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600'
                        onClick={() => updateNote(note.id)}
                      >
                        Save
                      </button>
                      <button
                        className='bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500'
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p>{note.content}</p>
                    <div className='flex justify-end gap-2 mt-2'>
                      <button
                        className='bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600'
                        onClick={() => {
                          setEditingId(note.id);
                          setEditingContent(note.content);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className='bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600'
                        onClick={() => deleteNote(note.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
            {notes.length === 0 && (
              <p className='text-center text-gray-500'>No notes yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
