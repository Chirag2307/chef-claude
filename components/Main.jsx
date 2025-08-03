import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import {getRecipe as getRecipeFromAPI } from "../ai"

export default function Main() {
    const [ingredients, setIngredients] = React.useState(
        ["chicken", "all the main spices", "corn", "heavy cream", "pasta"]
    )
    const [recipe, setRecipe] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const recipeSection = React.useRef(null)
    
    React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView()
        }
    }, [recipe])

    async function getRecipe() {
        if (ingredients.length === 0) {
            return // Don't generate recipe if no ingredients
        }
        setIsLoading(true)
        try {
            const recipeMarkdown = await getRecipeFromAPI(ingredients)
            setRecipe(recipeMarkdown)
        } catch (error) {
            console.error("Failed to get recipe:", error)
        } finally {
            setIsLoading(false)
        }
    }

    function addIngredient(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const newIngredient = formData.get("ingredient")
        if (newIngredient.trim()) {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient.trim()])
            event.target.reset() // Clear the input field
        }
    }

    function removeIngredient(ingredientToRemove) {
        setIngredients(prevIngredients => 
            prevIngredients.filter(ingredient => ingredient !== ingredientToRemove)
        )
    }
    
    return (
        <main>
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            <IngredientsList
                ref={recipeSection}
                ingredients={ingredients}
                getRecipe={getRecipe}
                isLoading={isLoading}
                onRemoveIngredient={removeIngredient}
            />

            {isLoading && (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Chef Claude is cooking up a recipe...</p>
                </div>
            )}
            {recipe && !isLoading && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}