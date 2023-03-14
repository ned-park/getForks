import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Form from "../components/Form";

import { recipeFormItems } from "../components-data/RecipeForm";

export default function NewRecipe() {
  const navigate = useNavigate();
  const { user, username } = useAuthContext();
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    notes: "",
    ingredients: "",
    instructions: "",
    tags: "",
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

    const res = await fetch(`/api/${username}/create`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: data,
    });
    if (res.ok) {
      navigate(`/${username}`);
    }
  };

  return (
    <section className="shadow-xl mt-24 m-auto container flex flex-col">
      <h2 className="text-xl font-bold text-center">Add Recipe</h2>
      <Form
        formData={formData}
        formItems={recipeFormItems}
        handleChange={handleChange}
        handleClick={handleClick}
        submitText="Create Recipe"
      />
    </section>
  );
}
