import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { ADD_RECIPE, GET_ALL_RECIPES } from '../../queries/index';
import Error from '../commons/Error';

const initialState = {
  name: '',
  instructions: '',
  category: 'breakfast',
  description: '',
  username: ''

}
class AddRecipe extends React.Component {
  state ={ ...initialState };

  clearState = () => {
    this.setState({ ...initialState })
  }

  componentDidMount() {
    console.log(this.props)
    this.setState({
      username: this.props.session.getCurrentUser.username
    });
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event, addRecipe) => {
    event.preventDefault();
    addRecipe().then(({ data }) => {
      this.clearState();
    })
    this.props.history.push('/');
  }

  validateForm = () => {
    const { name, description, category, instructions } = this.state;

    const isInvalid = !name || !category || !description || !instructions;

    return isInvalid;
  }
  updateCache = (cache, {data: { addRecipe }}) => {
    const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });

    cache.writeQuery({
      query: GET_ALL_RECIPES,
      data: {
        getAllRecipes: [addRecipe, ...getAllRecipes]
      }
    });
  }

  render() {
    const { name, description, category, instructions, username } = this.state;

    return (
    <Mutation 
      mutation={ADD_RECIPE} 
      variables={{ name, description, category, instructions, username }}
      update={this.updateCache}
    >
      {(addRecipe, { data, loading, error }) => {

        return (
          <div className="recipe-card">
            <h2>Add Recipe</h2>
            <form className="form" onSubmit={(event) => this.handleSubmit(event, addRecipe)}>
              <input
                type="text"
                name="name"
                placeholder= "Recipe Name"
                onChange= {this.handleChange}
                value= {name}
              />
              <select name="category" onChange={this.handleChange}>
                <option value="breakfast">Breakfast</option>
                <option value="swallow">Swallow</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>

              <input 
                type="text" 
                name="description" 
                placeholder="Enter a description.." 
                onChange={this.handleChange} 
                value={description}
              />
              <textarea 
                name="instructions" 
                onChange={this.handleChange} 
                placeholder="Add Instructions"
                value={instructions} 
              />
              <button type="submit" className="button-primary" disabled={ loading || this.validateForm()}>Submit</button>
              { error && <Error error ={error} />}
            </form>
          </div>
        )
      }}
    </Mutation>
    )
  }
};

export default withRouter(AddRecipe);
