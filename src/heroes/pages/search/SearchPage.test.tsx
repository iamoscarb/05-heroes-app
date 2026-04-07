import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";
import SearchPage from "./SearchPage";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";
import type { Hero } from "@/heroes/types/hero.interface";

vi.mock('@/heroes/actions/search-heroes.action')
const mockSearchHeroesAction = vi.mocked(searchHeroesAction);

vi.mock('@/heroes/components/HeroGrid', () => ({
    HeroGrid: ({ heroes }: { heroes: Hero[] }) => (<div data-testid="hero-grid">
        {
            heroes.map((hero) => (
                <div key={hero.id}>{hero.name}</div>
            ))
        }
    </div>)
}));

vi.mock('./ui/SearchControls', () => ({
    SearchControls: () => <div data-testid="search-controls"></div>
}));

const queryClient = new QueryClient();

const renderSearchPage = (initialEntries: string[] = ['']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <QueryClientProvider client={queryClient}>
                <SearchPage />
            </QueryClientProvider>
        </MemoryRouter>
    )
}

describe('SearchPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })
    test('should render  with default values', () => {
        const { container } = renderSearchPage();
        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            category: undefined,
            name: undefined,
            order: undefined,
            status: undefined,
            strength: undefined,
            team: undefined,
            universe: undefined,
        });

        expect(container).toMatchSnapshot();
    });

    test('should call search action with name parameter', () => {
        const { container } = renderSearchPage(['/search/?name=spiderman']);
        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            category: undefined,
            name: 'spiderman',
            order: undefined,
            status: undefined,
            strength: undefined,
            team: undefined,
            universe: undefined,
        });

        expect(container).toMatchSnapshot();
    });

    test('should call search action with strength parameter', () => {
        const { container } = renderSearchPage(['/search/?strength=6']);
        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            category: undefined,
            name: undefined,
            order: undefined,
            status: undefined,
            strength: '6',
            team: undefined,
            universe: undefined,
        });

        expect(container).toMatchSnapshot();
    });

    test('should call search action with strength and name parameter', () => {
        const { container } = renderSearchPage(['/search/?name=spiderman&strength=6']);
        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            category: undefined,
            name: 'spiderman',
            order: undefined,
            status: undefined,
            strength: '6',
            team: undefined,
            universe: undefined,
        });

        expect(container).toMatchSnapshot();
    });

    test('should render herogrid with search results', async () => {
        const mockHeroes = [
            { id: '1', name: 'Peter Parker' } as unknown as Hero,
            { id: '2', name: 'Barry Allen' } as unknown as Hero
        ];

        mockSearchHeroesAction.mockResolvedValue(mockHeroes);

        renderSearchPage();

        await waitFor(() => {
            expect(screen.getByText('Peter Parker')).toBeDefined();
            expect(screen.getByText('Barry Allen')).toBeDefined();
        });
    });
})