import React from 'react';
import axios from 'axios';

function TodoList({ todos, setTodos }) {

    const handleDone = async (todo) => {
        try {
            const response = await axios.patch(
                `http://127.0.0.1:8000/api/backapp/${todo.id}/`,
                {
                    completed: !todo.completed
                }
            );

            setTodos(
                todos.map(item =>
                    item.id === todo.id ? response.data : item
                )
            );

        } catch (error) {
            console.error('Done Error:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `http://127.0.0.1:8000/api/backapp/${id}/`
            );

            setTodos(
                todos.filter(todo => todo.id !== id)
            );

        } catch (error) {
            console.error('Delete Error:', error);
        }
    };

    return (
        <div style={{ width: '100%' }}>

            {todos.map(todo => (
                <div
                    key={todo.id}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                        padding: '6px 0',
                        borderBottom: '1px solid #ddd'
                    }}
                >

                    {/* Todo Name */}
                    <span
                        style={{
                            fontSize: '15px',
                            flex: 1,
                            textDecoration: todo.completed
                                ? 'line-through'
                                : 'none'
                        }}
                    >
                        {todo.title}
                    </span>

                    {/* Buttons */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '5px'
                        }}
                    >

                        <button
                            onClick={() => handleDone(todo)}
                            style={{
                                fontSize: '12px',
                                padding: '4px 9px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            {todo.completed ? 'Undo' : 'Done'}
                        </button>

                        <button
                            onClick={() => handleDelete(todo.id)}
                            style={{
                                fontSize: '12px',
                                padding: '4px 9px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            Delete
                        </button>

                    </div>

                </div>
            ))}

        </div>
    );
}

export default TodoList;