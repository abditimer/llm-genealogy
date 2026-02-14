"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ModelArchitecture } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { ConceptTooltip } from "@/components/genealogy/concept-tooltip";

export const columns: ColumnDef<ModelArchitecture>[] = [
    {
        accessorKey: "name",
        header: "Model",
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="font-semibold">{row.getValue("name")}</span>
                <span className="text-xs text-muted-foreground">
                    {row.original.organization}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "releaseYear",
        header: "Year",
        cell: ({ row }) => <div>{row.getValue("releaseYear")}</div>,
    },
    {
        accessorKey: "normType",
        header: "Norm",
        cell: ({ row }) => {
            const norm = row.getValue("normType") as string;
            return (
                <ConceptTooltip
                    term={norm}
                    display={
                        <Badge
                            variant={norm === "LayerNorm" ? "default" : "secondary"}
                            className={
                                norm === "LayerNorm"
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-purple-600 hover:bg-purple-700 text-white"
                            }
                        >
                            {norm}
                        </Badge>
                    }
                />
            );
        },
    },
    {
        accessorKey: "layerStyle",
        header: "Style",
        cell: ({ row }) => <div>{row.getValue("layerStyle")}</div>,
    },
    {
        accessorKey: "positionEmbedding",
        header: "Pos. Emb.",
        cell: ({ row }) => {
            const val = row.getValue("positionEmbedding") as string;
            // Handle "RoPE (MLA)" mapping to "RoPE (MLA)" concept key directly
            return (
                <ConceptTooltip
                    term={val}
                    className="font-medium text-sm"
                />
            );
        },
    },
    {
        accessorKey: "activation",
        header: "Activation",
        cell: ({ row }) => {
            const act = row.getValue("activation") as string;
            const isSwiGLU = act === "SwiGLU";
            return (
                <ConceptTooltip
                    term={act}
                    display={
                        <Badge
                            variant="outline"
                            className={
                                isSwiGLU
                                    ? "text-green-600 border-green-600 bg-green-50"
                                    : "text-gray-600 border-gray-400"
                            }
                        >
                            {act}
                        </Badge>
                    }
                />
            );
        },
    },
    {
        accessorKey: "stabilityTricks",
        header: "Tricks / Details",
        cell: ({ row }) => {
            const tricks = row.original.stabilityTricks || [];
            const details = row.original.details; // Assuming details might be mapped here too if needed, but currently separated in type

            return (
                <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {tricks.map((trick) => (
                        <Badge
                            key={trick}
                            variant="outline"
                            className="px-1 py-0 text-[10px] bg-yellow-50 text-yellow-800 border-yellow-200"
                        >
                            {trick}
                        </Badge>
                    ))}
                    {/* Also show generic details if any? */}
                    {details && !tricks.includes(details) && (
                        <Badge variant="outline" className="px-1 py-0 text-[10px]">
                            {details}
                        </Badge>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "paperUrl",
        header: "Paper",
        cell: ({ row }) => {
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" asChild>
                                <a
                                    href={row.original.paperUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary"
                                >
                                    <FileText className="h-4 w-4" />
                                </a>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{row.original.paperTitle}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        },
    },
];
