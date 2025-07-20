import React from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';

const NoteCard=({note,onEdit,deleteNote})=>{
    return (
        <div className='bg-white shadow-md rounded-lg p-4 mb-4'>
<h2 className="text-xl font-bold mb-2">{note.title}</h2>
<p>{note.description}</p>
<div className='flex justify-between mt-4'>

<button className="text-blue-500 mr-2" onClick={()=>onEdit(note)}>
<FaEdit/> 
</button>
<button className="text-red-500" onClick={()=>deleteNote(note._id)}>

    <FaTrash/>
</button>

</div>
        </div>
    )

}

export default NoteCard;