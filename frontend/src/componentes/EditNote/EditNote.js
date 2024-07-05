import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./EditNote.module.css";
import CategoriesContainer from "../CategoriesContainer/CategoriesContainer";
import AddCategory from "../AddCategory/AddCategory";
import authHeader from "../../services/authHeader";
import { API_URL } from "../../constants/constants";

const initialNote = {
  title: "",
  content: "",
  archived: false,
};

export default function EditNote({
  setEditingNote,
  editingId,
  reflectChanges,
  setReflectChanges,
}) {
  const [note, setNote] = useState(initialNote);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [addedCategory, setAddedCategory] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL + `notes/${editingId}`, {
        headers: authHeader(),
      })
      .then(function (response) {
        setNote(response.data[0]);
        setSelectedCategories(
          response.data[0].categories?.map((cat) => cat.id)
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [editingId]);

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

  function createNewCategory() {
    if (newCategory === "" || newCategory === undefined) return;

    axios
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

  async function handleSubmit() {
    await axios
      .patch(
        API_URL + `notes/${note.id}`,
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
    setEditingNote(false);
    setReflectChanges(!reflectChanges);
  }

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        padding: 20,
        gap: 12,
        top: "30%",
        left: "30%",
        transform: "translate(-50%, -50%)",
        boxShadow: "5px 6px 34px 0px rgba(0,0,0,0.75)",
      }}
    >
      <h3>Editing Note</h3>

      <label>
        Titulo:
        <input
          name="title"
          value={note.title}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Contenido:
        <input
          name="content"
          value={note.content}
          onChange={(e) => handleChange(e)}
        />
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
        <button onClick={() => setEditingNote(false)}>Cancel</button>
        <button onClick={() => handleSubmit()}>Save note</button>
      </div>
    </div>
  );
}
