import React from "react";

export default function AddCategory({
  newCategory,
  handleNewCategory,
  createNewCategory,
}) {
  return (
    <label style={{ display: "flex", gap: 18 }}>
      <input
        name="addCategory"
        value={newCategory}
        onChange={(e) => handleNewCategory(e)}
      />
      <button
        style={{
          padding: "8px 12px",
          backgroundColor: "gray",
          color: "white",
          fontSize: "small",
        }}
        onClick={(e) => createNewCategory(e)}
      >
        Add
      </button>
    </label>
  );
}
