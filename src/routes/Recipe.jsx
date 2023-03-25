import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams, useNavigate } from "react-router-dom";
import EditRecipe from "./EditRecipe";
import reactMarkdown from "react-markdown";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function Recipe() {
  const { userId, recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [image, setImage] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [version, setVersion] = useState(0);

  const { user, username } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(`/api/${userId}/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      updateRecipe(data.repo);
    };

    if (user && user.user) {
      fetchRecipe();
    }
  }, [user]);

  const initiateFork = async (e) => {
    const res = await fetch(`/api/${userId}/${recipeId}/fork`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      navigate(`/${username}/${data.repoId}`);
    }
  };

  const updateRecipe = (data) => {
    setEditing(false);
    setRecipe({ ...data });
    setImage(
      data.image ? [data.image.slice(0, 49), data.image.slice(62)] : null
    );
    setVersion(data.latest);
  };

  const handleDelete = async (e) => {
    setConfirm(false);
    const res = await fetch(`/api/${username}/${recipeId}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (res.ok) navigate(`/${username}`);
  };

  return (
    <main className="bg-secondary text-secondary mx-auto pt-12 px-4 md:px-16 lg:px-64 pb-20">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 md:flex-row">
          {user && user.user && username == userId && (
            <button
              onClick={() => setEditing((oldEditing) => !oldEditing)}
              className="bg-primary text-primary rounded px-5 py-2 shadow shadow-gray-500"
            >
              {!editing ? `Edit Recipe` : `Discard Changes`}
            </button>
          )}
          {username && userId == user.user.username && !confirm ? (
            <button
              onClick={() => setConfirm(true)}
              className="bg-primary text-primary rounded px-5 py-2 shadow shadow-gray-500"
            >
              Delete
            </button>
          ) : (
            username &&
            userId == user.user.username && (
              <span>
                <button
                  onClick={handleDelete}
                  style={{ cursor: "pointer" }}
                  className="bg-primary text-primary rounded px-5 py-2 shadow shadow-gray-500"
                >
                  Confirm&nbsp;
                </button>
                <button
                  onClick={() => setConfirm(false)}
                  style={{ cursor: "pointer" }}
                  className="ml-4 bg-primary text-primary rounded px-5 py-2 shadow shadow-gray-500"
                >
                  Cancel{" "}
                </button>
              </span>
            )
          )}
        </div>
        <div className="flex flex-col gap-2 items-center md:flex-row">
          <label htmlFor="version">Version:</label>
          {recipe && (
            <select
              defaultValue={version}
              onChange={(e) => setVersion(e.target.value)}
              className="bg-primary text-primary rounded p-2"
              name="version"
              id="version"
            >
              {recipe.versions.map((v, i) => (
                <option value={i} key={i}>
                  {i}
                </option>
              ))}
            </select>
          )}
          {user && user.user && username != userId && (
            <button
              onClick={initiateFork}
              className="bg-primary text-primary rounded px-5 py-2 shadow shadow-gray-500"
            >
              Fork
            </button>
          )}
        </div>
      </div>

      {recipe && !editing && (
        <article className="mx-auto p-2 container">
          <section>
            {recipe && (
              <h1 className="mt-8 font-bold text-3xl text-center">
                {recipe.title}
              </h1>
            )}
            {image && (
              <img
                className="mx-auto my-8 max-w-2xs md:max-w-md h-auto rounded"
                sizes="(min-width: 30em) 50em, 28em, 100vw"
                srcSet={`${image[0]}/f_auto,q_70,w_256/${image[1]} 256w,
    	        ${image[0]}/f_auto,q_70,w_512/${image[1]} 512w,
    	        ${image[0]}/f_auto,q_70,w_768/${image[1]} 768w,
    	        ${image[0]}/f_auto,q_70,w_1024/${image[1]} 1024w,
    	        ${image[0]}/f_auto,q_70,w_1280/${image[1]} 1280w`}
                src={`${image[0]}/f_auto,q_70,w_512/${image[1]}`}
                alt={`User provided image of ${recipe.title}`}
              />
            )}
          </section>
          <section className="mb-6">
            {recipe.description.length && (
              <>
                <h2 className="font-bold text-lg">Description</h2>
                <p className="mb-6">{recipe.description}</p>
              </>
            )}
            {recipe.versions[version].notes.length && (
              <>
                <h2 className="font-bold text-lg">Notes</h2>
                <p>{recipe.versions[version].notes}</p>
              </>
            )}
          </section>
          <section className="mb-6 max-w-[60rem] ">
            <h2 className="font-bold text-lg">Ingredients</h2>
            <ReactMarkdown>
              {recipe.versions[version].ingredients[0]}
            </ReactMarkdown>
          </section>
          <section className="mb-6 max-w-[60rem]">
            <h2 className="font-bold text-lg">Instructions</h2>
            <ReactMarkdown>
              {recipe.versions[version].instructions[0]}
            </ReactMarkdown>
          </section>
        </article>
      )}
      {recipe && editing && (
        <EditRecipe recipeData={recipe} updateRecipe={updateRecipe} />
      )}
      <style>{`
        ol > li {
          padding-bottom: 12px;
        }
        ul > li {
          padding-bottom: 6px;
        }
      `}</style>
    </main>
  );
}
