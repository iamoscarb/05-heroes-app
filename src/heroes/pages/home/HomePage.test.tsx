import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { HomePage } from "./HomePage";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoriteHeroProvider } from "@/heroes/context/FavoriteHeroContext";

vi.mock('@/heroes/hooks/usePaginatedHero')
const mockUsePaginatedHero = vi.mocked(usePaginatedHero);
mockUsePaginatedHero.mockReturnValue({
    data: [],
    isLoading: false,
    isError: false,
    success: true
} as unknown as ReturnType<typeof usePaginatedHero>);

const queryClient = new QueryClient();

const renderHomePage = (initialEntries: string[] = ['']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <FavoriteHeroProvider>
                <QueryClientProvider client={queryClient}>
                    <HomePage />
                </QueryClientProvider>
            </FavoriteHeroProvider>

        </MemoryRouter>
    )
}
describe('HomePage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })
    test('should render HomePage with default values', () => {
        const { container } = renderHomePage();
        expect(container).toMatchSnapshot();
    });

    test('should call usePaginateHero with default values', () => {
        renderHomePage();
        expect(mockUsePaginatedHero).toHaveBeenCalledWith(1, 6, 'all');
    });

    test('should call usePaginateHero with custom query params', () => {
        renderHomePage(['/?page=2&limit=10&category=villians']);
        expect(mockUsePaginatedHero).toHaveBeenCalledWith(2, 10, 'villians');
    });

    test('should called usePaginatedHero page and same limit on tab clicked', () => {
        renderHomePage(['/?tab=favorites&page=2&limit=10']);
        const [, , , villiansTab] = screen.getAllByRole('tab');
        fireEvent.click(villiansTab);
        expect(mockUsePaginatedHero).toHaveBeenCalledWith(1, 10, 'villain');
    });
})