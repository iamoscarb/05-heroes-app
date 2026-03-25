import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroContext {
    //state
    favorites: Hero[];
    favoriteCount: number;

    //methods
    isFavorite: (hero: Hero) => boolean;
    toggleFavorite: (hero: Hero) => void;

}
export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

const getFavortiesFromLocalStorage = () => {
    const favorites = localStorage.getItem('favorite');
    return favorites ? JSON.parse('favorites') : [];
}

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {

    const [favorites, setFavorites] = useState<Hero[]>(getFavortiesFromLocalStorage);

    const toggleFavorite = (hero: Hero) => {
        const heroExist = favorites.find(h => h.id === hero.id);

        if (heroExist) {
            setFavorites(favorites.filter(h => h.id !== hero.id));
            return;
        }

        setFavorites([...favorites, hero]);
    }

    const isFavorite = (hero: Hero) => {
        const isFavortie = favorites.some(h => h.id === hero.id);
        return isFavortie;
    }

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites])

    return (
        <FavoriteHeroContext value={{
            //state
            favoriteCount: favorites.length,
            favorites: favorites,

            //methods
            isFavorite: isFavorite,
            toggleFavorite: toggleFavorite
        }}>
            {children}
        </FavoriteHeroContext>
    )
}
