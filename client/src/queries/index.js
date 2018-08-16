import { gql } from 'apollo-boost';

/* Recipe Queries */
export const GET_ALL_RECIPES = gql`
query {
  getAllRecipes {
    name 
    category
    description
    instructions    
    username   
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