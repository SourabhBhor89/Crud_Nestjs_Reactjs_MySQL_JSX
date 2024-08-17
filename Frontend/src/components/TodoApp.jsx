import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/todoService';
import { FaEdit, FaTrash, FaCheck, FaPlus } from 'react-icons/fa';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      setError('Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (title) {
      try {
        setLoading(true);
        await createTodo(title);
        setTitle('');
        fetchTodos();
      } catch (err) {
        setError('Failed to create todo');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdate = async () => {
    if (editId && title) {
      try {
        setLoading(true);
        await updateTodo(editId, title);
        setEditId(null);
        setTitle('');
        fetchTodos();
      } catch (err) {
        setError('Failed to update todo');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteTodo(id);
      fetchTodos();
    } catch (err) {
      setError('Failed to delete todo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center ">Todo List</h1>
    <hr className='border-2 ' />
    <br></br>
    <div className="mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo title"
        className="border border-gray-300 rounded-lg p-3 w-full mb-2 transition duration-300 ease-in-out transform hover:scale-105"
      />
      <button
        onClick={editId ? handleUpdate : handleCreate}
        className={`w-full py-3 font-semibold rounded-lg text-white transition duration-300 ease-in-out ${editId ? 'bg-green-500 hover:bg-green-600' : 'bg-slate-500 hover:bg-slate-800'}`}
      >
        {editId ? 'Update Todo' : 'Add Todo'}
      </button>
    </div>
    {loading && <p className="text-gray-500">Loading...</p>}
    {error && <p className="text-red-500 mb-4">{error}</p>}
    <div className="max-h-80 overflow-y-auto">
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between border-b border-gray-200 py-3 hover:bg-gray-50 transition duration-300 ease-in-out"
          >
            {editId === todo.id ? (
              <div className="flex bg-orange-600 items-center flex-1 space-x-3">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 flex-1"
                />
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => { setEditId(null); setTitle(''); }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="border-2 p-3 bg-stone-300 rounded-xl flex items-center flex-1 space-x-3">
                <span className="text-gray-800 font-semibold text-2xl flex-1">{todo.title}</span>
                <div className="flex space-x-2 ml-auto">
                  <button
                    onClick={() => { setEditId(todo.id); setTitle(todo.title); }}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}

export default TodoApp;