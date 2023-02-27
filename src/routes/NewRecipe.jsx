import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Header from "../components/Header";

export default function NewRecipe() {
  const { user, username } = useAuthContext();
  const [file, setFile] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    notes: '',
    ingredients: '',
    instructions: '',
    tags: '',
  })

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setFile(e.target.files[0])
    } else {
      setFormData(oldFormData => ({
        ...oldFormData,
        [e.target.name]: e.target.value
      }))
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    console.log(formData)
    const data = new FormData()
    for (let name in formData) {
      data.append(name, formData[name])
    }
    if (file) {
      data.append('file', file)
    }

    fetch(`/api/${username}/create`, {
      method: 'post',
      headers: {
      // 'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${user.token}`,
      },
      body: data,
    }).then(res => {
        let data = res.json()
        console.log(data)
      })
      .catch(error => console.log(error))
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
            onChange={handleChange}
          />
        </div>
        <input type="submit" value="Create Recipe" className="" />
      </form>
    </section>
    </>

  )
}
