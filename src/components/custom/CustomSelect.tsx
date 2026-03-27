import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRef } from "react";

interface Selected {
    value: string;
    text: string;
}

interface Props {
    options: Selected[],
    selectedValue: string;
    placeholder?: string;
    disabled?: boolean;
    onValueChange: (value: string) => void;
}

export const CustomSelect = ({ options, placeholder = 'Selecciona una opción', selectedValue, onValueChange }: Props) => {
    const triggerRef = useRef<HTMLButtonElement>(null);

    return (
        <Select value={selectedValue} onValueChange={onValueChange}>
            <SelectTrigger className="w-full h-20" ref={triggerRef}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {
                        options.map(select => (
                            <SelectItem key={select.value} value={select.value}>{select.text}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
