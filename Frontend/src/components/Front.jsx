import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./front.css"
function Front() {
    const [todos, setTodos] = useState([]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/todos').then((response) => {
            setTodos(response.data);
        });
    }, []);

    const addTodo = () => {
        axios.post('http://localhost:5000/todos', { description, status: 'ongoing' })
            .then((response) => setTodos([...todos, response.data]));
        setDescription('');
    };

    const deleteTodo = (id) => {
        axios.delete(`http://localhost:5000/todos/${id}`).then(() => {
            setTodos(todos.filter(todo => todo._id !== id));
        });
    };

    const toggleStatus = (todo) => {
        const newStatus = todo.status === 'completed' ? 'ongoing' : 'completed';
        axios.put(`http://localhost:5000/todos/${todo._id}`, { status: newStatus }).then((response) => {
            setTodos(todos.map((item) => (item._id === todo._id ? response.data : item)));
        });
    };

    return (
        <div className='wrap'>
            <h2>Todo Dashboard</h2>
            <div className="input">
             <label htmlFor="add"><b>Add more:</b></label>   
            <input id='add'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description"
            />
            <button className='add' onClick={addTodo}>Add</button></div>
            <div className="data">
            <ul>
                {todos.map((todo) => (
                    <li key={todo._id} style={{ textDecoration: todo.status === 'completed' ? 'line-through' : 'none' }}>
                        <input
                            type="checkbox"
                            checked={todo.status === 'completed'}
                            onChange={() => toggleStatus(todo)}
                        />
                       <span className='font'> {todo.description}</span> <sub><label ><b>status: </b></label>{todo.status}</sub>
                        <button className='del' onClick={() => deleteTodo(todo._id) }>Delete</button>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
}

export default Front;
