import React, { FunctionComponent, useState, useEffect } from "react";
import "../components/newTodo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";

const NewTodo: FunctionComponent<{}> = () => {
  const [newTodo, setNewTodo] = useState<string>("");
  const [allTodo, setAllTodo] = useState([] as any);
  const [isError, setIsError] = useState<boolean>(false);

  const handleChange = (e: any) => {
    setNewTodo(e.target.value);
    setIsError(false);
  };

  const handleClick = () => {
    if (newTodo !== "") {
      setIsError(false);
      setAllTodo([...allTodo, { text: newTodo, key: Date.now() }]);
      setNewTodo("");
    } else {
      setIsError(true);
    }
  };

  const removeItem = (id: number) => {
    const filteredItem = allTodo.filter((item: any) => {
      return item.key !== id;
    });
    setAllTodo(filteredItem);
  };

  const editItem = (id: number) => {
    allTodo.map((item: any) => {
      if (item.key === id) {
        setNewTodo(item.text);
        const filteredItem = allTodo.filter((item: any) => {
          return item.key !== id;
        });
        setAllTodo(filteredItem);
      }
    });
  };
  useEffect(() => {
    const data = localStorage.getItem("myTodo");
    if (data) {
      setAllTodo(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("myTodo", JSON.stringify(allTodo));
  });

  return (
    <div className="container">
      <h1>What needs to be done?</h1>
      <div className="form">
        <input
          type="text"
          className={isError ? "error-input" : "input-box"}
          placeholder="Enter your todos..."
          value={newTodo}
          onChange={(e) => handleChange(e)}
        />
        <button className="add-btn" onClick={handleClick}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      {allTodo.map((item: any) => {
        return (
          <li className="todos" key={item.key}>
            {item.text}
            <a
              href="/#"
              className="delete-btn"
              onClick={() => removeItem(item.key)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </a>
            <a
              href="/#"
              className="edit-btn"
              onClick={() => editItem(item.key)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </a>
          </li>
        );
      })}
    </div>
  );
};

export default NewTodo;
