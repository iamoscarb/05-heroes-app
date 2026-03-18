import { HeroGridCard } from './HeroGridCard'

export const HeroGrid = () => {
    {/* Character Grid */ }
    return (
        < div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8" >
            <HeroGridCard />
        </div >
    )
}
