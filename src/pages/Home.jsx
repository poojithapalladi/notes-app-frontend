// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import NoteModal from '../components/NoteModal';
import NoteCard from '../components/NoteCard';
import { toast } from 'react-toastify';
import api from '../api';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState('');

  // Fetch notes on mount
  useEffect(() => {
    fetchNotes();
  }, []);

  // Filter
  useEffect(() => {
    const q = query.toLowerCase();
    setFilteredNotes(
      notes.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.description.toLowerCase().includes(q)
      )
    );
  }, [query, notes]);

  const fetchNotes = async () => {
    try {
      const { data } = await api.get('/api/note');
      if (data.success) setNotes(data.notes);
    } catch (err) {
      console.error('Fetch notes error:', err);
    }
  };

  const addNote = async (title, description) => {
    try {
      const { data } = await api.post('/api/note/add', { title, description });
      if (data.success) {
        setNotes((prev) => [data.note, ...prev]);
        toast.success('Note added');
      }
    } catch (err) {
      console.error('Add note error:', err);
      toast.error(err.response?.data?.message || 'Error adding note');
    }
  };

  const editNote = async (id, title, description) => {
    try {
      const { data } = await api.put(`/api/note/${id}`, { title, description });
      if (data.success) {
        setNotes((prev) =>
          prev.map((n) => (n._id === id ? data.note : n))
        );
        toast.success('Note updated');
      }
    } catch (err) {
      console.error('Edit note error:', err);
      toast.error(err.response?.data?.message || 'Error updating note');
    }
  };

  const deleteNote = async (id) => {
    try {
      const { data } = await api.delete(`/api/note/${id}`);
      if (data.success) {
        setNotes((prev) => prev.filter((n) => n._id !== id));
        toast.success('Note deleted');
      }
    } catch (err) {
      console.error('Delete note error:', err);
      toast.error(err.response?.data?.message || 'Error deleting note');
    }
  };

  const openAddModal = () => {
    setCurrentNote(null);
    setIsModalOpen(true);
  };

  const openEditModal = (note) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setQuery={setQuery} />
      <div className="px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={() => openEditModal(note)}
              deleteNote={() => deleteNote(note._id)}
            />
          ))
        ) : (
          <p>No notes</p>
        )}
      </div>

      <button
        onClick={openAddModal}
        className="fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-4 rounded-full"
      >
        +
      </button>

      {isModalOpen && (
        <NoteModal
          closeModal={closeModal}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default Home;
