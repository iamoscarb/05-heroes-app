import * as z from "zod";

const FilterScheme = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    alias: z.string(),
    powers: z.array(z.string()),
    description: z.string(),
    strength: z.number(),
    intelligence: z.number(),
    speed: z.number(),
    durability: z.number(),
    team: z.string(),
    image: z.string(),
    firstAppearance: z.string(),
    status: z.string(),
    category: z.string(),
    universe: z.string()
});

const FavortieArrayScheme = z.array(FilterScheme);

export const useFavoritesValidation = () => {
    const localStorageFavorites = localStorage.getItem('favorites');
    if (!localStorageFavorites) {
        return;
    }

    const result = FavortieArrayScheme.safeParse(JSON.parse(localStorageFavorites));

    if (result.error) {
        return;
    }

    return result.data;
}
