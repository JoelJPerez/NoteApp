import React, { useState } from "react";
import styles from "./Note.module.css";
import {
  ArchiveBoxArrowDownIcon,
  ArrowUpOnSquareStackIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import DeleteNote from "./DeleteNote/DeleteNote";
import authHeader from "../services/authHeader";
import { API_URL } from "../constants/constants";

export default function Note({
  note,
  setEditingNote,
  setEditingId,
  reflectChanges,
  setReflectChanges,
}) {
  const { id, title, content, archived, categories } = note;
  const [deletingNote, setDeletingNote] = useState(false);

  const handleDelete = async () => {
    await axios
      .delete(API_URL + `notes/${id}`, { headers: authHeader() })
      .then((response) => {
        console.log(`Deleted post with ID ${id}`);
      })
      .catch((error) => {
        console.error(error);
      });
    setReflectChanges(!reflectChanges);
  };

  const handleArchive = async () => {
    await axios
      .patch(
        API_URL + `notes/${id}`,
        { archived: !archived },
        { headers: authHeader() }
      )
      .then((response) => {
        console.log(`Updated post with ID ${id}`);
      })
      .catch((error) => {
        console.error(error);
      });
    setReflectChanges(!reflectChanges);
  };

  const handleUpdate = () => {
    setEditingId(id);
    setEditingNote(true);
    setReflectChanges(!reflectChanges);
  };

  return (
    <div key={id} className={styles.item}>
      <h3>{title}</h3>
      <p>{content}</p>
      <div
        style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 8 }}
      >
        {categories &&
          categories.map((category) => (
            <button
              key={category.id}
              style={{
                textDecoration: "none",
                color: "gray",
                backgroundColor: "#f7e6c4",
                padding: "4px 8px",
                borderRadius: 15,
                fontSize: "small",
                boxShadow: "2px 2px 4px 0px rgba(0,0,0,0.35)",
              }}
              to="/archived"
            >
              {category.name}
            </button>
          ))}
      </div>
      <div className={styles.buttons}>
        <button onClick={() => handleArchive()}>
          {archived ? (
            <ArchiveBoxArrowDownIcon width={20} height={20} />
          ) : (
            <ArrowUpOnSquareStackIcon width={20} height={20} />
          )}
        </button>
        <button onClick={() => handleUpdate()}>
          <PencilIcon width={20} height={20} />
        </button>
        <button onClick={() => setDeletingNote(true)}>
          <TrashIcon width={20} height={20} />
        </button>
      </div>
      {deletingNote && (
        <DeleteNote
          handleDelete={handleDelete}
          setDeletingNote={setDeletingNote}
        />
      )}
    </div>
  );
}
