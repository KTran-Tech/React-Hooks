import React, {useState, useEffect, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';

import IngredientList from './IngredientList';

const Ingredients = () => {

  const [userIngredients, setUserIngredients] = useState([])

  
  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients);
  }, [])


  useEffect(()=>{
    console.log('RENDERING INGREDIENTS', userIngredients)
    //this means rerender everytime [userIngredients] is changed
  }, [userIngredients])

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-project-805ba.firebaseio.com/ingredients.json',{
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => response.json())
      .then(responseData => {
      setUserIngredients(prevIngredients => 
      [
        ...prevIngredients, 
        {id: responseData.name, ...ingredient}
      ]
    )
  })
}

  const removeIngredientHandler = ingredientId => {
    //filter always returns a new array
    //if the item returns false, then the item will be dropped from the new array
    setUserIngredients(prevIngredients => 

      prevIngredients.filter(ingredient=>
         ingredient.id !== ingredientId
      )
      
    )
  }

  return (
    <div className="App">

      <IngredientForm onAddIngredient={addIngredientHandler }/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList 
          ingredients={userIngredients} 
          onRemoveItem={removeIngredientHandler}
          />
      </section>

    </div>
  );
}

export default Ingredients;
