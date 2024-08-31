import { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const limit = 10;
    const skip = (page - 1) * limit;
    fetch(`/api/todos?limit=${limit}&skip=${skip}`)
      .then(response => response.json())
      .then(data => {
        setTodos(data);
        setLoading(false);
      });
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleTodoClick = () => {
    const todo = {
      title: 'New Todo',
      description: 'New Todo description',
    };

    fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span>{todo.title}</span>
            <button onClick={() => handleTodoClick()}>Create Todo</button>
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      <button onClick={handlePrevPage}>Prev</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default TodoList;