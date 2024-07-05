import React from "react";
import styles from "./DeleteNote.module.css";
export default function DeleteNote({ setDeletingNote, handleDelete }) {
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
      <h3>Do you want to delete the note?</h3>
      <div className={styles.buttonsContainer}>
        <button onClick={() => setDeletingNote(false)}>Cancel</button>
        <button onClick={() => handleDelete()}>Delete note</button>
      </div>
    </div>
  );
}
