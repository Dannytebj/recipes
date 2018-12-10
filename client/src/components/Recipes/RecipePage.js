import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_RECIPE } from '../../queries';
import Error from '../commons/Error';

const RecipePage = ({ match }) => {
  const { _id } = match.params;
  
  return (
    <Query query={GET_RECIPE} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <div>loading</div>
        if (error) return <Error error={error} />
        console.log(data, " Recipe Page")
        const { name, category, description, instructions, likes, username } = data.getRecipe;
        return (
          <div className="recipe-card">
            <h4>{data.getRecipe.name}</h4>
            <div className="recipe-info">
              <p><strong>Category: </strong>{ category }</p>
              <p><strong>Description: </strong> { description }</p>
              <p><strong>Instructions: </strong>{ instructions }</p>
              <p><strong>Likes: </strong>{ likes }</p>
              <p><strong>Created By: </strong>{ username }</p>
            </div>
            <button type="button">Like</button>
          </div>
        )
      }
      }
    </Query>
  );
};

export default withRouter(RecipePage);
