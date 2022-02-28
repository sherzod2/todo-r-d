import { useState, useRef, useEffect } from "react";
import "./todos.css";

const Todos = () => {
  const inputValue = useRef();
  const checkboxCopmleted = useRef();
  const [todos, setTodos] = useState([]);
  const [renderTodo, setRenderTodo] = useState(todos);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setTodos(json));
  }, []);

  function addTodo(todoTitle) {
    const newTodo = {
      id: todos[todos.length - 1].id + 1 || 1,
      title: todoTitle,
      completed: false,
    };

    setTodos((state) => [...state, newTodo]);
    setRenderTodo((state) => [...state, newTodo]);
  }

  function deleteTodo(id) {
    setTodos((state) => {
      return state.filter((todo) => todo.id !== id);
    });
    setRenderTodo((state) => {
      return state.filter((todo) => todo.id !== id);
    });
  }

  function changeCompleted(todo) {
    // console.log(todo);
    setTodos((state) => {
      state[todo.id] = todo;
      return [...state];
    });
    // console.log(completed, id);
    // console.log(todos[id]);
    // setTodos((state) => {
    //   state[id].completed = !completed;
    //   return [...state];
    //   // const newTodos = state;
    //   // newTodos[id].completed = !completed;
    //   // return [...newTodos];
    // }
    // );

    // if (!completed) {
    // }

    setTodos((state) => state);
  }

  function controlButtonsFn(completed) {
    setRenderTodo(todos);
    setRenderTodo((state) => {
      return state.filter((todo) => todo.completed === completed);
    });
  }

  function renderAll() {
    setRenderTodo(todos);
  }

  return (
    <>
      <form className="form">
        <input
          ref={inputValue}
          type="text"
          className="input"
          placeholder="typing..."
          required
        />
        <button
          className="form__btn"
          onClick={() => addTodo(inputValue.current.value)}
          type="button"
        >
          Add
        </button>
      </form>

      <div className="sec-title">
        <h2>Your's tasks</h2>
      </div>

      <div className="buttons">
        <button onClick={() => renderAll()} className="button-all form__btn">
          All {todos.length}
        </button>
        <button
          onClick={() => controlButtonsFn(true)}
          className="button-completed form__btn"
        >
          Completed {todos.filter((todo) => todo.completed).length}
        </button>
        <button
          onClick={() => controlButtonsFn(false)}
          className="button-uncompleted form__btn"
        >
          Uncompleted {todos.filter((todo) => !todo.completed).length}
        </button>
      </div>

      {renderTodo.map((todo) => {
        return (
          <li key={todo.id} className="todo__item">
            <div className="todo__item-checkbox-wrapper">
              <input
                checked={todo.completed}
                onChange={() => changeCompleted(todo)}
                className="todo__item-checkbox"
                type="checkbox"
              />
            </div>
            <label
              ref={checkboxCopmleted}
              style={{
                color: todo.completed ? "red" : "black",
                textDecoration: todo.completed ? "line-through" : "none",
                fontStyle: todo.completed ? "italic" : "normal",
              }}
              className="todo__item-label"
            >
              {todo.title} {todo.id}
            </label>
            <button
              className="delete-btn"
              onClick={() => deleteTodo(todo.id)}
              type="button"
            >
              Delete
            </button>
          </li>
        );
      })}
    </>
  );
};

export default Todos;
