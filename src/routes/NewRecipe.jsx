import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

export default function NewRecipe() {
  const { user, username } = useAuthContext();
  console.log(`new recipe page`)

  const handleClick = (e) => {
    e.preventDefault();
    const formData = e.target;
    console.log(formData);
  };

  return (
    <>
    <Header />
    <section className="">
      <h2 className="">Add Recipe</h2>
      <form onSubmit={handleClick} className="">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          required
          className=""
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          placeholder="Description (optional)"
          name="description"
          className=""
        />
        <label htmlFor="notes">Notes</label>
        <input
          type="text"
          placeholder="Notes (optional)"
          name="notes"
          className=""
        />
        <label htmlFor="ingredients">Ingredients</label>
        <textarea
          placeholder="Ingredients"
          name="ingredients"
          id="ingredients"
        ></textarea>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          placeholder="Instructions"
          name="instructions"
          id="instructions"
          required
          className=""
        ></textarea>
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          placeholder="Space separated tags"
          name="tags"
          className=""
        />
        <div className="">
          <label htmlFor="imgUpload" className="">
            Image (optional):{" "}
          </label>
          <input
            type="file"
            id="imageUpload"
            name="file"
            placeholder=""
            className=""
          />
        </div>
        <input type="submit" value="Create Recipe" className="" />
      </form>
    </section>
    </>

  )
}
