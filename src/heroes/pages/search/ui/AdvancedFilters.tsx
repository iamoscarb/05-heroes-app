import { CustomSelect } from "@/components/custom/CustomSelect"
import { teams, categories, universes, statuses } from "../data/selectData"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { useSearchControls } from "@/heroes/hooks/useSearchControls"


export const AdvancedFilters = () => {
    const { searchParams, handleSelected, clearAllFilters } = useSearchControls();
    const selectedStrength = searchParams.get('strength') ?? '0';
    const selectedTeam = searchParams.get('team') ?? 'all';
    const selectedCategory = searchParams.get('category') ?? 'all';
    const selectedUniverse = searchParams.get('universe') ?? 'all';
    const selectedStatus = searchParams.get('status') ?? 'all';

    return (
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Advanced Filters</h3>
                <Button variant="ghost" onClick={clearAllFilters}>Clear All</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Team</label>
                    <CustomSelect key='team' onValueChange={(data) => handleSelected('team', data)} options={teams} selectedValue={selectedTeam} />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <CustomSelect key='category' onValueChange={(data) => handleSelected('category', data)} options={categories} selectedValue={selectedCategory} />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Universe</label>
                    <CustomSelect key='universe' onValueChange={(data) => handleSelected('universe', data)} options={universes} selectedValue={selectedUniverse} />

                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <CustomSelect key='status' onValueChange={(data) => handleSelected('status', data)} options={statuses} selectedValue={selectedStatus} />

                </div>
            </div>
            <div className="mt-4">
                <label className="text-sm font-medium">Minimum Strength: {selectedStrength}/10</label>
                <Slider defaultValue={[+selectedStrength]} max={10} step={1} value={[+selectedStrength]}
                    onValueChange={value => handleSelected('strength', value[0].toString())} />
            </div>
        </div>
    )
}
