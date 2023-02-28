import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Recipe() {
  let { recipeId } = useParams();
  let [recipe, setRecipe] = useState(null);
  let [loaded, setLoaded] = useState(false);
  let [image, setImage] = useState(null);
  let [confirm, setConfirm] = useState(false);

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

  const handleClick = (e) => {
    setConfirm(false)
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
      {username && !confirm && (
        <span onClick={() => setConfirm(true)} className="btn">
          delete
        </span>
      )}
      {username && confirm && (
        <span>
          Are you sure?{" "}
          <span onClick={handleClick} style={{ cursor: "pointer" }}>
            yes{" "}
          </span>
          <span onClick={() => setConfirm(false)} style={{ cursor: "pointer" }}>
            no{" "}
          </span>
        </span>
      )}
      {recipe && (
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
                alt="User provided image of recipe"
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
    </>
  );
}
