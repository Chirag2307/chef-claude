import React from "react"

const IngredientsList = React.forwardRef((props, ref) => {
    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient} className="ingredient-item">
            <span>{ingredient}</span>
            <button 
                onClick={() => props.removeIngredient(ingredient)}
                className="remove-ingredient-btn"
                aria-label={`Remove ${ingredient}`}
            >
                ×
            </button>
        </li>
    ))
    return (
        <section>
            <h2>Ingredients on hand:</h2>
            {props.ingredients.length === 0 ? (
                <p className="empty-ingredients">Add some ingredients to get started!</p>
            ) : (
                <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
            )}
                         {props.ingredients.length > 0 && <div className="get-recipe-container">
                 <div ref={ref}>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button 
                    onClick={props.getRecipe} 
                    disabled={props.isLoading}
                    className={props.isLoading ? "loading" : ""}
                >
                    {props.isLoading ? "Cooking..." : "Get a recipe"}
                </button>
            </div>}
                 </section>
     )
 })

 export default IngredientsList