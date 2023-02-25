import { useEffect, useState } from "react"
import DOMPurify from "dompurify"
import { useAuthContext } from "../hooks/useAuthContext"
import { useParams } from "react-router-dom"
import Header from "../components/Header"

export default function Recipe() {
  let { recipeId } = useParams();
  let [recipe, setRecipe] = useState(null)
  let [loaded, setLoaded] = useState(false)
  let [image, setImage] = useState(null)

  const { user, username } = useAuthContext()
  
  useEffect(() => {
    const fetchRecipe = () => {
      fetch(`/api/${username}/${recipeId}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        setRecipe({...data})
        setImage(data.repo.image? [data.repo.image.slice(0,49), data.repo.image.slice(62)] : null)
        return data
      })
    }

    if (user && user.user) {
      fetchRecipe()
    }
  }, [user])


  return (
    <>
      <Header />
      {recipe &&
      (<main>
        <section>
          {recipe && <h1>{recipe.repo.title}</h1>}
          {image && <img className=""
    	sizes="(min-width: 30em) 50em, 28em, 100vw"
    	srcset={`${image[0]}/f_auto,q_70,w_256/${image[1]} 256w,
    	        ${image[0]}/f_auto,q_70,w_512/${image[1]} 512w,
    	        ${image[0]}/f_auto,q_70,w_768/${image[1]} 768w,
    	        ${image[0]}/f_auto,q_70,w_1024/${image[1]} 1024w,
    	        ${image[0]}/f_auto,q_70,w_1280/${image[1]} 1280w`}
    	src={`${image[0]}/f_auto,q_70,w_512/${image[1]}`}
    	alt="User provided image of recipe" />}
        </section>
        <section>
          <p>{recipe.repo.description}</p>
          <p>{recipe.repo.notes}</p>
        </section>
        <section>
          <h2>Ingredients</h2>
          <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(recipe.repo.versions[recipe.repo.latest || 0].ingredients)}}></div>
        </section>
        <section>
          <h2>Instructions</h2>
          <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(recipe.repo.versions[recipe.repo.latest || 0].instructions)}}></div>
        </section>
      </main>)
      }
    </>
  )
}