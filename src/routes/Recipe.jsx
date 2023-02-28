import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { useAuthContext } from "../hooks/useAuthContext";
import { NavLink, Outlet, useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import EditRecipe from "./EditRecipe";

export default function Recipe() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [image, setImage] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [editing, setEditing] = useState(false);

  const { user, username } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = () => {
      fetch(`/api/${username}/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setRecipe({ ...data });
          setImage(
            data.repo.image
              ? [data.repo.image.slice(0, 49), data.repo.image.slice(62)]
              : null
          );
          return data;
        });
    };

    if (user && user.user) {
      fetchRecipe();
    }
  }, [user]);

  const handleDelete = (e) => {
    setConfirm(false);
    fetch(`/api/${username}/${recipeId}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then((res) => {
      console.log(res.json());
      navigate(`/${username}`);
    });
  };

  return (
    <>
      <Header />
      {username && username == user.user.username && !confirm ? (
        <button onClick={() => setConfirm(true)} className="btn">
          Delete
        </button>
      ) : (
        <span>
          Are you sure?{" "}
          <button onClick={handleDelete} style={{ cursor: "pointer" }}>
            yes{" "}
          </button>
          <button
            onClick={() => setConfirm(false)}
            style={{ cursor: "pointer" }}
          >
            no{" "}
          </button>
        </span>
      )}
      {user && user.user && username == user.user.username && (
        <button
          onClick={() => setEditing((oldEditing) => !oldEditing)}
          className="btn"
        >
          {!editing ? `Edit Recipe` : `Discard Changes`}
        </button>
      )}
      {recipe && !editing && (
        <main>
          <section>
            {recipe && <h1>{recipe.repo.title}</h1>}
            {image && (
              <img
                className=""
                sizes="(min-width: 30em) 50em, 28em, 100vw"
                srcSet={`${image[0]}/f_auto,q_70,w_256/${image[1]} 256w,
    	        ${image[0]}/f_auto,q_70,w_512/${image[1]} 512w,
    	        ${image[0]}/f_auto,q_70,w_768/${image[1]} 768w,
    	        ${image[0]}/f_auto,q_70,w_1024/${image[1]} 1024w,
    	        ${image[0]}/f_auto,q_70,w_1280/${image[1]} 1280w`}
                src={`${image[0]}/f_auto,q_70,w_512/${image[1]}`}
                alt={`User provided image of ${recipe.repo.title}`}
              />
            )}
          </section>
          <section>
            <p>{recipe.repo.description}</p>
            <p>{recipe.repo.notes}</p>
          </section>
          <section>
            <h2>Ingredients</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  recipe.repo.versions[recipe.repo.latest || 0].ingredients
                ),
              }}
            ></div>
          </section>
          <section>
            <h2>Instructions</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  recipe.repo.versions[recipe.repo.latest || 0].instructions
                ),
              }}
            ></div>
          </section>
        </main>
      )}
      {recipe && editing && (
        <EditRecipe recipeData={recipe} stopEditing={() => setEditing(false)} />
      )}
    </>
  );
}
