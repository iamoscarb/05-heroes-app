import { Search, Filter, SortAsc, Grid, Plus, SortDesc } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, } from "@/components/ui/accordion"
import { CustomSelect } from "@/components/custom/CustomSelect"
import { teams, categories, universes, statuses } from "../data/selectData"
import { useSearchControls } from "@/heroes/hooks/useSearchControls"


export const SearchControls = () => {

    const { inputRef, searchParams, setSearchParams, handleKeyDown, handleSelected, handleOrderBy, clearAllFilters, setQueryParams } = useSearchControls();

    const activeAccordion = searchParams.get('active-accordion') ?? '';
    const selectedStrength = searchParams.get('strength') ?? '0';
    const selectedTeam = searchParams.get('team') ?? 'all';
    const selectedCategory = searchParams.get('category') ?? 'all';
    const selectedUniverse = searchParams.get('universe') ?? 'all';
    const selectedStatus = searchParams.get('status') ?? 'all';
    const selectedOrderBy = searchParams.get('order') ?? 'asc'

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input placeholder="Search heroes, villains, powers, teams..." className="pl-12 h-12 text-lg bg-white"
                        ref={inputRef} onKeyDown={handleKeyDown} defaultValue={searchParams.get('name') ?? ''} />
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                    <Button variant={
                        activeAccordion === "advance-filters" ? "default" : "outline"}
                        className="h-12"
                        onClick={() => {
                            if (activeAccordion === 'advance-filters') {
                                //setQueryParams('active-accordion', '')
                                setSearchParams((prev) => {
                                    prev.delete('active-accordion'); //elimina el valor del param
                                    return prev
                                })
                                return;
                            }
                            setQueryParams('active-accordion', 'advance-filters')
                        }
                        }>
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </Button>

                    <Button variant={selectedOrderBy === 'desc' ? "default" : "outline"} className="h-12" onClick={() => handleOrderBy(selectedOrderBy)}>
                        {selectedOrderBy === 'desc' ?
                            <SortAsc className="h-4 w-4 mr-2" /> :
                            <SortDesc className="h-4 w-4 mr-2" />}
                        Sort by Name
                    </Button>

                    <Button variant="outline" className="h-12">
                        <Grid className="h-4 w-4" />
                    </Button>

                    <Button className="h-12">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Character
                    </Button>
                </div>
            </div>
            {/* Advanced Filters */}
            <Accordion type="single" collapsible value={activeAccordion}>
                <AccordionItem value="advance-filters">
                    <AccordionContent>
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
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </>
    )
}

