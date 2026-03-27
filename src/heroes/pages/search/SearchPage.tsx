import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrums } from "@/components/custom/CustomBreadcrums";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useSeachHero } from "@/heroes/hooks/useSeachHero";
import { useSearchParams } from "react-router";

export const SearchPage = () => {
    const [searchParams] = useSearchParams({ tab: 'all' });

    const name = searchParams.get('name') ?? undefined;
    const strength = searchParams.get('strength') ?? undefined;
    const team = searchParams.get('team') ?? undefined;

    const { data: heroesResponse = [] } = useSeachHero({ name, strength, team })
    //useQuery

    if (!heroesResponse) return <h1>Loading....</h1>
    return (
        <>
            <CustomJumbotron title="Búsqueda de Superheroes"
                description="Descubre, explora y administra super héroes y villanos" />

            <CustomBreadcrums currentPage="Búscador de héroes" />

            {/* Stats Dashboard */}
            <HeroStats />

            {/* Filter and Seach */}
            <SearchControls />

            {/* */}
            {
                heroesResponse.length > 0 ? (
                    <HeroGrid heroes={heroesResponse} />
                ) : (
                    <h4 className="text-center font-bold pb-10">No se encontró información</h4>
                )
            }
        </>
    )
};

export default SearchPage;
