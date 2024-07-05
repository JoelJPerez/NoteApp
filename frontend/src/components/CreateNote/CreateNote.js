import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./CreateNote.module.css";
import CategoriesContainer from "../CategoriesContainer/CategoriesContainer";
import AddCategory from "../AddCategory/AddCategory";
import authHeader from "../../services/authHeader";
import { API_URL } from "../../constants/constants";

const initialNote = {
  title: "",
  content: "",
  archived: false,
};

export default function CreateNote({
  setCreatingNote,
  reflectChanges,
  setReflectChanges,
}) {
  const [note, setNote] = useState(initialNote);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [addedCategory, setAddedCategory] = useState(false);

  function handleChange(e) {
    setNote({
      ...note,
      [e.target.name]:
        e.target.value !== "on" ? e.target.value : e.target.checked,
    });
  }

  function handleNewCategory(e) {
    setNewCategory(e.target.value);
  }

  function handleCategory(myId) {
    if (selectedCategories.find((id) => id === myId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== myId));
    } else {
      setSelectedCategories((selectedCategories) => [
        ...selectedCategories,
        myId,
      ]);
    }
  }

  async function createNewCategory() {
    if (newCategory === "" || newCategory === undefined) return;

    await axios
      .post(
        API_URL + "categories/",
        {
          name: newCategory,
        },
        { headers: authHeader() }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setAddedCategory(!addedCategory);
        setNewCategory("");
      });
  }

  useEffect(() => {
    axios
      .get(API_URL + "categories", { headers: authHeader() })
      .then(function (response) {
        setCategories(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [addedCategory]);

  async function handleSubmit() {
    await axios
      .post(
        API_URL + "notes/",
        {
          ...note,
          categoriesIds: selectedCategories,
        },
        { headers: authHeader() }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setCreatingNote(false);
    setReflectChanges(!reflectChanges);
  }

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        maxWidth: "360px",
        padding: 20,
        gap: 12,
        top: "30%",
        left: "30%",
        transform: "translate(-50%, -50%)",
        boxShadow: "5px 6px 34px 0px rgba(0,0,0,0.75)",
      }}
    >
      <h3>Create Note</h3>

      <label>
        Titulo: <input name="title" onChange={(e) => handleChange(e)} />
      </label>
      <label>
        Contenido: <input name="content" onChange={(e) => handleChange(e)} />
      </label>
      <label>
        Archivada:
        <input
          type="checkbox"
          name="archived"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <CategoriesContainer
        categories={categories}
        selectedCategories={selectedCategories}
        handleCategory={handleCategory}
      />
      <AddCategory
        newCategory={newCategory}
        handleNewCategory={handleNewCategory}
        createNewCategory={createNewCategory}
      />
      <div className={styles.buttonsContainer}>
        <button onClick={() => setCreatingNote(false)}>Cancel</button>
        <button onClick={() => handleSubmit()}>Save note</button>
      </div>
    </div>
  );
}
