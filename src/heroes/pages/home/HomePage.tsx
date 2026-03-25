import { useMemo } from "react"
import { useSearchParams } from "react-router"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrums } from "@/components/custom/CustomBreadcrums"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"

const validTabs = ['all', 'favorites', 'heroes', 'villians'];

export const HomePage = () => {

    const [searchParams, setSearchParams] = useSearchParams({ tab: 'all' });

    const activeTab = searchParams.get('tab') ?? 'all';
    const page = searchParams.get('page') ?? '1';
    const limit = searchParams.get('limit') ?? '6';

    const selectedTab = useMemo(() => {
        return validTabs.includes(activeTab) ? activeTab : 'all';
    }, [activeTab]);

    const { data: heroesResponse } = usePaginatedHero(+page, +limit)
    const { data: summary } = useHeroSummary()

    return (
        <>
            <>
                {/* Header */}
                <CustomJumbotron title="Universo de Superheroes"
                    description="Descubre, explora y administra super héroes y villanos" />

                <CustomBreadcrums currentPage="Superhéroes" />

                {/* Stats Dashboard */}
                <HeroStats />

                {/* Tabs */}
                <Tabs value={selectedTab} className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all"
                            onClick={() =>
                                setSearchParams((prev) => {
                                    prev.set('tab', 'all');
                                    return prev;
                                })}>
                            All Characters ({summary?.totalHeroes})
                        </TabsTrigger>

                        <TabsTrigger value="favorites"
                            onClick={() =>
                                setSearchParams((prev) => {
                                    prev.set('tab', 'favorites');
                                    return prev;
                                })}>
                            Favorites (3)
                        </TabsTrigger>

                        <TabsTrigger value="heroes"
                            onClick={() =>
                                setSearchParams((prev) => {
                                    prev.set('tab', 'heroes');
                                    return prev;
                                })}>
                            Heroes ({summary?.heroCount})
                        </TabsTrigger>

                        <TabsTrigger value="villians"
                            onClick={() =>
                                setSearchParams((prev) => {
                                    prev.set('tab', 'villians');
                                    return prev;
                                })}>
                            Villains ({summary?.villainCount})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        {/* Mostrar todos los personajes */}
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>

                    <TabsContent value="favorites">
                        {/* Mostrar todos los personajes favoritos */}
                        <h1>Favoritos</h1>
                        <HeroGrid heroes={[]} />
                    </TabsContent>

                    <TabsContent value="heroes">
                        {/* Mostrar todos los heroes */}
                        <h1>Heroes</h1>
                        <HeroGrid heroes={[]} />
                    </TabsContent>

                    <TabsContent value="villians">
                        {/* Mostrar todos los villanos */}
                        <h1>Villanos</h1>
                        <HeroGrid heroes={[]} />
                    </TabsContent>

                </Tabs>

                {/* Pagination */}
                <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
            </>
        </>
    )
}