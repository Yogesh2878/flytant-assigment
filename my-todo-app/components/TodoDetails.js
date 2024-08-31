import { useState } from 'react';

const TodoDetails = ({ todo }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleUpdate = () => {
    const updates = {
      title,
      description,
    };
    fetch(`/api/todos/${todo._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea value={description} onChange={e => setDescription(e.target.value)} />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default TodoDetails;