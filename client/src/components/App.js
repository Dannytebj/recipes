import React from 'react';
import { Query } from 'react-apollo';
import { GET_ALL_RECIPES } from '../queries';
import RecipeItem from './Recipes/RecipeItem';


const App = () => (
  <div className="home-page">
    <h1>Home</h1>
    <Query query={GET_ALL_RECIPES}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>An error occured!</div>
        console.log(data);
        return (
          <ul>{data.getAllRecipes.map(recipe =>
            <RecipeItem key={recipe._id} {...recipe} />
          )}
          </ul>
        )
      }
      }
    </Query>
  </div>
)

export default App;
