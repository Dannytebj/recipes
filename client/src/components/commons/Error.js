import React from 'react';

export default Error = ({ error }) => {
  console.log(error);
 return (<p>{error.message}</p>) 
}
