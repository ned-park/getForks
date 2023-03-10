import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Form from "../components/Form";

import { recipeFormItems } from "../components-data/RecipeForm";

export default function EditRecipe({ recipeData, updateRecipe }) {
  const { recipeId } = useParams();
  const { user, username } = useAuthContext();
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: recipeData.title,
    description: recipeData.description,
    notes: recipeData.versions[recipeData.latest || 0].notes,
    ingredients: recipeData.versions[recipeData.latest || 0].ingredients,
    instructions: recipeData.versions[recipeData.latest || 0].instructions,
    tags: recipeData.tags,
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

  const handleClick = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let name in formData) {
      data.append(name, formData[name]);
    }
    if (file) {
      data.append("file", file);
    }

    const res = await fetch(`/api/${username}/${recipeId}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: data,
    });

    const repo = await res.json();
    updateRecipe(repo);
  };

  return (
    <>
      <section className="">
        <h2 className="">Update Recipe</h2>
        {formData && formData.title.length > 0 && (
          <Form
            formData={formData}
            formItems={recipeFormItems}
            handleChange={handleChange}
            handleClick={handleClick}
          />
        )}
      </section>
    </>
  );
}
