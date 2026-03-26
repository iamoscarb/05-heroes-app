import { useQuery } from "@tanstack/react-query";
import { searchHeroesAction } from "../actions/search-heroes.action";

interface Options {
    name?: string;
    team?: string;
    category?: string;
    universe?: string;
    status?: string;
    strength?: string;
}

export const useSeachHero = (options: Options) => {
    const { name, team, category, universe, status, strength } = options;
    return useQuery({
        queryKey: ['search', { name, team, category, universe, status, strength }],
        queryFn: () => searchHeroesAction({ name, team, category, universe, status, strength }),
        staleTime: 1000 * 60 * 5,
        retry: false
    })
}
