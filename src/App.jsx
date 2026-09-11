import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList.jsx';
import AddTodo from './components/AddTodo.jsx';

function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/backapp/')
            .then(res => setTodos(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleAdd = (newTodo) => {
        setTodos([...todos, newTodo]);
    };

    return (
        <div className="container py-3">

            <div className="card shadow-sm mx-auto" style={{ maxWidth: '500px' }}>

                <div className="card-body p-3">

                    <h4 className="text-center mb-3">
                        Todo List
                    </h4>

                    <AddTodo onAdd={handleAdd} />

                    <div className="mt-3">
                        <TodoList
                            todos={todos}
                            setTodos={setTodos}
                        />
                    </div>

                </div>

            </div>

        </div>
    );
}

export default App;