export default function IngredientsList(props) {
    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient} className="ingredient-item">
            <span className="ingredient-text">{ingredient}</span>
            <button 
                onClick={() => props.onRemoveIngredient(ingredient)}
                className="remove-ingredient-btn"
                aria-label={`Remove ${ingredient}`}
                title={`Remove ${ingredient}`}
            >
                ×
            </button>
        </li>
    ))
    return (
        <section>
            <h2>Ingredients on hand:</h2>
            {props.ingredients.length === 0 ? (
                <div className="empty-ingredients-placeholder">
                    <p>No ingredients added yet. Add some ingredients above to get started!</p>
                </div>
            ) : (
                <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
            )}
            {props.ingredients.length > 0 && <div className="get-recipe-container">
                <div ref={props.ref}>
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
}