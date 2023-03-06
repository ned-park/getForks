import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function EditRecipe({
  recipeData,
  stopEditing,
  setImage,
  setRecipe,
}) {
  const { recipeId } = useParams();
  const { user, username } = useAuthContext();
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: recipeData.repo.title,
    description: recipeData.repo.description,
    notes: recipeData.repo.versions[recipeData.repo.latest || 0].notes,
    ingredients:
      recipeData.repo.versions[recipeData.repo.latest || 0].ingredients,
    instructions:
      recipeData.repo.versions[recipeData.repo.latest || 0].instructions,
    tags: recipeData.repo.tags,
  });

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setFile(e.target.files[0]);
    } else {
      setFormData((oldFormData) => ({
        ...oldFormData,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let name in formData) {
      data.append(name, formData[name]);
    }
    if (file) {
      data.append("file", file);
    }

    console.log(`/api/${username}/${recipeId}`);
    fetch(`/api/${username}/${recipeId}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: data,
    })
      .then((res) => {
        if (res.ok) {
          stopEditing();
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <section className="">
        <h2 className="">Update Recipe</h2>
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
              onChange={handleChange}
            />
          </div>
          <input type="submit" value="Update Recipe" className="" />
        </form>
      </section>
    </>
  );
}
