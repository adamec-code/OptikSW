function TodoItem({ id, name }) {
  return (
    <li>
      <input type="checkbox" id={id} />
      <label htmlFor={id}>{name}</label>
    </li>
  );
}

export default TodoItem;
