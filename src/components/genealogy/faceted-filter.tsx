"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FacetedFilterProps {
    title: string;
    options: {
        label: string;
        value: string;
        icon?: React.ComponentType<{ className?: string }>;
    }[];
    selectedValues: Set<string>;
    onSelect: (value: string) => void;
}

export function FacetedFilter({
    title,
    options,
    selectedValues,
    onSelect,
}: FacetedFilterProps) {
    // We use a simple toggle logic: if it's in the set, remove it; otherwise add it.
    // The parent component handles the state mutation.

    return (
        <div className="space-y-1">
            <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                {title}
            </h3>
            <div className="flex flex-col space-y-1">
                {options.map((option) => {
                    const isSelected = selectedValues.has(option.value);
                    return (
                        <div
                            key={option.value}
                            className={cn(
                                "flex items-center space-x-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-muted transition-colors text-sm",
                                isSelected ? "bg-muted font-medium" : ""
                            )}
                            onClick={() => onSelect(option.value)}
                        >
                            <div
                                className={cn(
                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                    isSelected
                                        ? "bg-primary text-primary-foreground"
                                        : "opacity-50 [&_svg]:invisible"
                                )}
                            >
                                <Check className={cn("h-3 w-3")} />
                            </div>
                            {option.icon && (
                                <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                            )}
                            <span>{option.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
