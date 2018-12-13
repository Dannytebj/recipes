import { gql } from 'apollo-boost';

/* Recipe Queries */
export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      _id
      name 
      category
      description    
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username,
      email,
      joinDate
    }
  }
`

export const GET_RECIPE = gql`
 query($_id: ID!) {
  getRecipe(_id:$_id) {
    _id
    name
    category
    description
    instructions
    createdDate
    likes
    username
  }
  
}`;

export const SEARCH_RECIPES = gql`
query($searchTerm: String ) {
  searchRecipes(searchTerm:$searchTerm) {
    _id
    name
    likes
  }
}
`;

/* Recipe Mutations */

/* User Queries */

/* User Mutations */
export const SIGNUP_USER = gql`
mutation( $email: String!, $username: String!, $password: String!) {
  signupUser(email: $email, username: $username,
    password: $password) {
    token
  }
}
`;

export const SIGNIN_USER = gql`
mutation($username: String!, $password: String!) {
  signinUser(username: $username, password: $password) {
    token
  }
}
`;

export const ADD_RECIPE = gql`
  mutation(
    $name: String!, 
    $category: String!,
    $description: String!,
    $instructions: String!
    $username: String
    ) {
      addRecipe(
      name: $name
      category: $category,
      description: $description,
      instructions: $instructions,
      username: $username
      ) {
        _id
        name
        category
        description
        instructions
        createdDate
        likes
      }
    }
`;