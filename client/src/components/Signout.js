import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';


const handleSignout = (client, history) => {
  localStorage.clear();
  client.resetStore();
  history.push("/");

}
const Signout = ({ history }) => (
  <ApolloConsumer>
    {client => {
      return <button onClick={() => handleSignout(client, history)}>SignOut</button>
    }}
  </ApolloConsumer>
);

export default withRouter(Signout);
