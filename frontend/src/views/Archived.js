import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Note from "../components/Note";
import axios from "axios";
import EditNote from "../components/EditNote/EditNote";
import authHeader from "../services/authHeader";
import { API_URL } from "../constants/constants";
import styles from "../styles/Archived.module.css";

export default function Archived() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [reflectChanges, setReflectChanges] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authHeader()) return navigate("/login");
    console.log("Archived notes useEffect");
    axios
      .get(API_URL + "notes", {
        params: {
          isArchived: true,
        },
        headers: authHeader(),
      })
      .then(function (response) {
        setNotes(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [reflectChanges]);

  return (
    <>
      <div className={styles.container}>
        <h1>Archived notes</h1>
        <Link
          style={{
            marginLeft: 24,
            textDecoration: "none",
            color: "black",
            backgroundColor: "white",
            padding: 12,
          }}
          to="/"
        >
          Home
        </Link>
      </div>
      <section className="grid-1">
        {notes ? (
          notes.map((note) => (
            <Note
              key={note.id}
              setEditingNote={setEditingNote}
              setEditingId={setEditingId}
              note={note}
              reflectChanges={reflectChanges}
              setReflectChanges={setReflectChanges}
            />
          ))
        ) : (
          <p>Cargando</p>
        )}
        {editingNote && (
          <EditNote
            setEditingNote={setEditingNote}
            editingId={editingId}
            reflectChanges={reflectChanges}
            setReflectChanges={setReflectChanges}
          />
        )}
      </section>
    </>
  );
}