import client from "../client"
import { Recipe } from "../components/Recipe"

const HomePage = (props) => {
  const {recipes} = props
  console.log(props)
  console.log(recipes)

  return (
    <div className="home">
      <h1>Kokeboka!</h1>
      <div className="recipes-list">
        {recipes.map(recipe => 
            <Recipe recipe={recipe}/>
          )}
      </div>
    </div>
  )
}

HomePage.getInitialProps = async () => {
  return {recipes: await client.fetch(`*[_type == 'recipe']`)}
}

export default HomePage
