import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrums } from "@/components/custom/CustomBreadcrums";

export const SearchPage = () => {
    return (
        <>
            <CustomJumbotron title="Búsqueda de Superheroes"
                description="Descubre, explora y administra super héroes y villanos" />

            <CustomBreadcrums currentPage="Búscador de héroes" />

            {/* Stats Dashboard */}
            <HeroStats />

            {/* Filter and Seach */}
            <SearchControls />
        </>
    )
};

export default SearchPage;
