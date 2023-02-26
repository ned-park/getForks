import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Header from "../components/Header";

export default function NewRecipe() {
  const { user, username } = useAuthContext();
  const [formData, setFormData] = useState({})

  const handleChange = (e) => {
    setFormData(oldFormData => ({
      ...oldFormData,
      [e.target.name]: e.target.value
    }))
  };

  const handleClick = (e) => {
    e.preventDefault();

  }

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
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          placeholder="Description (optional)"
          name="description"
          className=""
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor="notes">Notes</label>
        <input
          type="text"
          placeholder="Notes (optional)"
          name="notes"
          className=""
          value={formData.notes}
          onChange={handleChange}
        />
        <label htmlFor="ingredients">Ingredients</label>
        <textarea
          placeholder="Ingredients"
          name="ingredients"
          id="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          placeholder="Instructions"
          name="instructions"
          id="instructions"
          required
          className=""
          value={formData.instructions}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          placeholder="Space separated tags"
          name="tags"
          className=""
          value={formData.tags}
          onChange={handleChange}
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
            value={formData.file}
            onChange={handleChange}
          />
        </div>
        <input type="submit" value="Create Recipe" className="" />
      </form>
    </section>
    </>

  )
}
