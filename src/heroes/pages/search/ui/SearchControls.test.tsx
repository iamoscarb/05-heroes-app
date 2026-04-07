import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, test } from "vitest";
import { SearchControls } from "./SearchControls";

if (typeof window.ResizeObserver === 'undefined') {
    class ResizeObserver {
        observe() { }
        unobserve() { }
        disconnect() { }
    }
    window.ResizeObserver = ResizeObserver;
}

const renderWithRouter = (initialEntries: string[] = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <SearchControls />
        </MemoryRouter>
    )
}


describe('SearchControls', () => {
    test('should render SearchControls with default values', () => {
        const { container } = renderWithRouter();
        expect(container).toMatchSnapshot();
    });

    test('should set input value when search param name is set', () => {
        renderWithRouter(['/?name=spiderman']);

        const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');
        expect(input.getAttribute('value')).toBe('spiderman')
    });

    test('should change params when input is changed', () => {
        renderWithRouter(['/?name=spiderman']);

        const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');
        expect(input.getAttribute('value')).toBe('spiderman');

        fireEvent.change(input, { target: { value: 'Scarlet Witch' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(input.getAttribute('value')).toBe('Scarlet Witch');
    });

    test('should change params strength when slider is changed', () => {
        renderWithRouter(['/?name=spiderman&active-accordion=advance-filters']);
        const slider = screen.getByRole('slider');
        expect(slider.getAttribute('aria-valuenow')).toBe('0');
        fireEvent.keyDown(slider, { key: 'ArrowRight' });
        expect(slider.getAttribute('aria-valuenow')).toBe('1');
    });

    test('should accordion be open when active-accordion param is set', () => {
        renderWithRouter(['/?name=spiderman&active-accordion=advance-filters']);

        const accordion = screen.getByTestId('accordion');

        const accordionItem = accordion.querySelector('div');
        expect(accordionItem?.getAttribute('data-state')).toBe('open')
    });

    test('should accordion be closed when active-accordion param is not set', () => {
        renderWithRouter(['/?name=spiderman']);

        const accordion = screen.getByTestId('accordion');

        const accordionItem = accordion.querySelector('div');
        expect(accordionItem?.getAttribute('data-state')).toBe('closed')
    });
})