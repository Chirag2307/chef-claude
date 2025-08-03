import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import {getRecipe as getRecipeFromAPI } from "../ai"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const recipeSection = React.useRef(null)
    
    React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView()
        }
    }, [recipe])

    async function getRecipe() {
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

    function addIngredient(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const newIngredient = formData.get("ingredient")
        if (newIngredient.trim()) {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient.trim()])
            e.target.reset()
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
                removeIngredient={removeIngredient}
                isLoading={isLoading}
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