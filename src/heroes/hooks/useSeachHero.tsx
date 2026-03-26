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

export const useSeachHero = ({ name }: Options) => {
    return useQuery({
        queryKey: ['search', { name }],
        queryFn: () => searchHeroesAction({ name }),
        staleTime: 1000 * 60 * 5,
        retry: false
    })
}
