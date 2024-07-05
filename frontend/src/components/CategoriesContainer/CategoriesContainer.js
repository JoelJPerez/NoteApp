import React from "react";
import styles from "./CategoriesContainer.module.css";

function CategoriesContainer({
  categories,
  selectedCategories,
  handleCategory,
}) {
  return (
    <div className={styles.categoriesContainer}>
      {categories &&
        categories.map((category) => (
          <button
            style={
              selectedCategories.find((id) => id === category.id)
                ? { backgroundColor: "#accddd", color: "black" }
                : null
            }
            onClick={() => handleCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
    </div>
  );
}

export default CategoriesContainer;
