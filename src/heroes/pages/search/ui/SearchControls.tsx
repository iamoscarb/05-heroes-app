import { Search, Filter, SortAsc, Grid, Plus, SortDesc } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, } from "@/components/ui/accordion"
import { useSearchControls } from "@/heroes/hooks/useSearchControls"
import { AdvancedFilters } from "./AdvancedFilters"


export const SearchControls = () => {

    const { inputRef, searchParams, setSearchParams, handleKeyDown, handleOrderBy, setQueryParams } = useSearchControls();

    const activeAccordion = searchParams.get('active-accordion') ?? '';
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
                        <AdvancedFilters />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </>
    )
}

