import React, { useState } from 'react';
import axios from 'axios';

function AddTodo({ onAdd }) {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert('Please enter a todo');
            return;
        }

        try {
            const response = await axios.post(
                'https://djangobackend-d9dq.onrender.com/api/backapp/',
                {
                    title: title,
                    completed: false
                }
            );

            console.log('Backend response:', response.data);

            onAdd(response.data);

            setTitle('');

        } catch (error) {
            console.error('POST ERROR:', error);
            alert('Todo add failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                placeholder="Enter todo"
                onChange={(e) => setTitle(e.target.value)}
            />

            <button type="submit">
                Add
            </button>
        </form>
    );
}

export default AddTodo;
