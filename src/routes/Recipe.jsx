import { useEffect, useState } from "react"
import DOMPurify from "dompurify"
import { useAuthContext } from "../hooks/useAuthContext"
import { useParams } from "react-router-dom"
import Header from "../components/Header"

export default function Recipe() {
  let { recipeId } = useParams();
  let [recipe, setRecipe] = useState(null)
  let [loaded, setLoaded] = useState(false)

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
        console.log({data}, data.repo)
        setRecipe({...data})
        return data
      })
      .then(() => setTimeout(console.log({recipe}), 3000))
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