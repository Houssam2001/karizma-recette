'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getAuthToken, setAuthToken, clearAuthToken } from '@/app/auth'
import NavBar from '@/components/navbar/Navbar'
const RecipeApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    ingredients: '',
    instructions: '',
  });
  const [authToken, setAuthToken] = useState(getAuthToken());




  useEffect(() => {
    fetchRecipes();
  }, [authToken]);

  const fetchRecipes = async () => {
    try {
      if (!authToken) {
        console.error('Authentication token is missing.');
        return;
      }

      const response = await fetch('http://127.0.0.1:5000/recipes', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);  // Log the response
        setRecipes(data.recipes || []);
      } else {
        console.error('Error fetching recipes:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };


  const addRecipe = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/add_recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });
      const data = await response.json();
      console.log(data.message);
      fetchRecipes();
      setNewRecipe({ name: '', ingredients: '', instructions: '' });
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <div>
      {/* <h1>Recipe App</h1> */}

      <nav>
        {/* <Link href="/login">Login</Link> */}
        <NavBar/>
      </nav>

      <div>
        <h2>Add a Recipe</h2>
        <form>
          <label>
            Name:
            <input
              type="text"
              value={newRecipe.name}
              onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
            />
          </label>
          <br />
          <label>
            Ingredients (comma-separated):
            <input
              type="text"
              value={newRecipe.ingredients}
              onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
            />
          </label>
          <br />
          <label>
            Instructions:
            <textarea
              value={newRecipe.instructions}
              onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
            />
          </label>
          <br />
          <button type="button" onClick={addRecipe}>
            Add Recipe
          </button>
        </form>
      </div>
      <div>
        <h2>Recipes</h2>
        {recipes.length === 0 ? (
          <p>No recipes available.</p>
        ) : (
          <ul>
            {recipes.map((recipe:{name:string,ingredients:string[],instructions:string}, index:number) => (
              <li key={index}>
                <strong>{recipe.name}</strong>
                <br />
                Ingredients: {recipe.ingredients.toLocaleString().replace(',',' ')}
                <br />
                Instructions: {recipe.instructions}
              </li>
            ))}
          </ul>
        )}


      </div>
    </div>
  );
};

export default RecipeApp;
