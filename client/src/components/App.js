import React from 'react';
import { Query } from 'react-apollo';
import { GET_ALL_RECIPES } from '../queries'
import './styles.scss';

const App = () => (
  <div className="App">
  <h1>Home</h1>
  <Query query={GET_ALL_RECIPES}>
  {({ data, loading, error }) => {
    if (loading) return <div>Loading...</div>
    if(error) return <div>An error occured!</div>
    console.log(data);
    return <div>Recipes!</div>
  }
  }
  </Query>
  </div>
)

export default App;
