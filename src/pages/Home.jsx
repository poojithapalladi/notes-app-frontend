import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import NoteModal from '../components/NoteModal';
import NoteCard from '../components/NoteCard';
import { toast } from 'react-toastify';
import api from '../api';

const Home = () => {
  const [isModalOpen, setIsModalOpen]     = useState(false);
  const [notes, setNotes]                 = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [currentNote, setCurrentNote]     = useState(null);
  const [query, setQuery]                 = useState('');

  // Load notes on mount
  useEffect(() => {
    fetchNotes();
  }, []);

  // Filter when query or notes change
  useEffect(() => {
    const q = query.toLowerCase();
    setFilteredNotes(
      notes.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q)
      )
    );
  }, [query, notes]);

  const fetchNotes = async () => {
    try {
      const { data } = await api.get('/api/note');
      if (data.success) setNotes(data.notes);
    } catch (error) {
      console.log('fetchNotes error', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentNote(null);
  };

  const onEdit = (note) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  };

  const addNote = async (title, description) => {
    try {
      const { data } = await api.post('/api/note/add', { title, description });
      if (data.success) {
        toast.success('Note created');
        fetchNotes();
        closeModal();
      }
    } catch (error) {
      console.log('addNote error', error);
    }
  };

  const editNote = async (id, title, description) => {
    try {
      const { data } = await api.put(`/api/note/${id}`, { title, description });
      if (data.success) {
        toast.success('Note updated');
        fetchNotes();
        closeModal();
      }
    } catch (error) {
      console.log('editNote error', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const { data } = await api.delete(`/api/note/${id}`);
      if (data.success) {
        toast.success('Note deleted');
        fetchNotes();
      }
    } catch (error) {
      console.log('deleteNote error', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setQuery={setQuery} />

      <div className="px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map(note => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={onEdit}
              deleteNote={deleteNote}
            />
          ))
        ) : (
          <p>No notes</p>
        )}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className='fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-4 rounded-full'
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
