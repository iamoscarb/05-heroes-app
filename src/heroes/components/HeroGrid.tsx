import { HeroGridCard } from './HeroGridCard'
import type { Hero } from '../types/hero.interface';

interface Props {
    heroes: Hero[];
}
export const HeroGrid = ({ heroes }: Props) => {
    {/* Character Grid */ }
    return (
        < div className="pt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8" >
            {
                heroes.map((heroe) =>
                    <HeroGridCard key={heroe.id} heroe={heroe} />
                )
            }
        </div >
    )
}
