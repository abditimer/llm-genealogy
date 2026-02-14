"use client";

import * as React from "react";
import { Info } from "lucide-react";
import { concepts } from "@/data/concepts";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ConceptTooltipProps {
    term: string; // The key in concepts object or the display text if not exact match
    display?: React.ReactNode; // Optional custom display element
    className?: string;
    asChild?: boolean;
}

export function ConceptTooltip({
    term,
    display,
    className,
    asChild = false,
}: ConceptTooltipProps) {
    // Normalize term to find in dictionary (handle variations if needed)
    // For now, exact match or simple lookups.
    const concept = concepts[term];

    if (!concept) {
        // If no definition found, just render the text/display without tooltip
        return <span className={className}>{display || term}</span>;
    }

    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild={asChild} className={cn("cursor-help underline decoration-dotted decoration-muted-foreground/50 underline-offset-4", className)}>
                    {display || <span>{term}</span>}
                </TooltipTrigger>
                <TooltipContent className="max-w-xs p-4 space-y-3" side="right" align="start">
                    <div>
                        <h4 className="font-semibold text-sm flex items-center gap-2">
                            <Info className="h-3 w-3 text-primary" />
                            {concept.title}
                        </h4>
                        <div className="mt-2 text-xs text-muted-foreground leading-relaxed">
                            {concept.description}
                        </div>
                    </div>

                    {concept.diagram && (
                        <div className="rounded-md bg-muted/50 p-2 text-center text-xs">
                            {concept.diagram}
                        </div>
                    )}

                    {concept.links.length > 0 && (
                        <div className="pt-2 border-t flex flex-wrap gap-2">
                            {concept.links.map((link) => (
                                <a
                                    key={link.url}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full hover:bg-primary/20 transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    )}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
