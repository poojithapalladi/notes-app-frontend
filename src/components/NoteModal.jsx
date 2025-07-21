import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NoteModal = ({ closeModal, addNote, currentNote, editNote }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Load current note data when editing
  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    }
  }, [currentNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found! User is not logged in.');
      return;
    }


    try {
      if (currentNote) {
        // EDIT NOTE
        const response = await axios.put(
          `https://notes-app-backend-li0h.onrender.com/api/note/${currentNote._id}`,
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          editNote(currentNote._id, title, description);
          closeModal();
        }
      } else {
        // ADD NOTE
        const response = await axios.post(
          'http://notes-app-backend-li0h.onrender.com/api/note/add',
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          addNote(response.data.note);
          closeModal();
        }
      }
    } catch (error) {
      console.error('Note operation failed:', error);
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center'>
      <div className='bg-white p-8 rounded'>
        <h2 className='text-xl font-bold mb-4'>
          {currentNote ? 'Edit Note' : 'Add New Note'}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Note Title'
            className='border p-2 w-full mb-4'
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Note Description'
            className='border p-2 w-full mb-4'
          />

          <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
            {currentNote ? 'Update Note' : 'Add Note'}
          </button>
        </form>
        <button className='mt-4 text-red-500' onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};


export default NoteModal;
