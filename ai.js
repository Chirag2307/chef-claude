const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getRecipe(ingredientsArr) {
    try {
        const response = await fetch(`${API_URL}/recipe`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ingredients: ingredientsArr }),
        });

        const data = await response.json();
        return data.recipe;
    } catch (err) {
        console.error("Error fetching recipe:", err.message);
        return "Failed to fetch recipe";
    }
}

