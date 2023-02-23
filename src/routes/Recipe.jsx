import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useParams } from "react-router-dom"
import Header from "../components/Header"

export default function Recipe() {
  let { recipeId } = useParams();
  let [recipe, setRecipe] = useState([])
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
        console.log('data', data)
        setRecipe(data.repo)
      })
    }

    if (user && user.user) {
      fetchRecipe()
    }
  }, [user])


  return (
    <>
      <Header />
      <main>
        <section>
          {recipe && <h1>{recipe.title}</h1>}
        </section>
        <section>

        </section>
      </main>
    </>
  )
}