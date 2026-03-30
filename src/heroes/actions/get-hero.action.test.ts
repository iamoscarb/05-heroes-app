import { describe, expect, test } from "vitest";
import { getHeroAction } from "./get-hero.action";

const BASE_URL = import.meta.env.VITE_API_URL;

describe('GetHeroAction', () => {
    test('should fetch hero data and return with complete image url', async () => {
        const result = await getHeroAction('peter-parker');
        expect(result).toStrictEqual({
            "id": "5",
            "name": "Peter Parker",
            "slug": "peter-parker",
            "alias": "Spider-Man",
            "powers": [
                "Escalar muros",
                "Sentido arácnido",
                "Lanzar telarañas",
                "Agilidad sobrehumana",
                "Reflejos mejorados"
            ],
            "description": "Tu amistoso vecino Spider-Man, con gran poder viene una gran responsabilidad.",
            "strength": 7,
            "intelligence": 9,
            "speed": 7,
            "durability": 7,
            "team": "Vengadores",
            "image": `${BASE_URL}/images/5.jpg`,
            "firstAppearance": "1962",
            "status": "Active",
            "category": "Hero",
            "universe": "Marvel"
        })

        expect(result.image).toContain('http')
    });

    test('should throw an error if hero is not found', async () => {
        const idSlug = 'peter-parker2';
        const result = await getHeroAction(idSlug).catch(error => {
            expect(error).toBeDefined();
            expect(error.status).toBe(404)
        });

        expect(result).toBeUndefined();
    });
});