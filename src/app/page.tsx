"use client";

import * as React from "react";
import { columns } from "@/components/genealogy/columns";
import { DataTable } from "@/components/ui/data-table";
import { FacetedFilter } from "@/components/genealogy/faceted-filter";
import { models } from "@/data/models";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, PlusCircle, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";

// Filter Options
const normOptions = [
  { label: "LayerNorm", value: "LayerNorm" },
  { label: "RMSNorm", value: "RMSNorm" },
];
const actOptions = [
  { label: "ReLU", value: "ReLU" },
  { label: "GeLU", value: "GeLU" },
  { label: "SwiGLU", value: "SwiGLU" },
  { label: "GeGLU", value: "GeGLU" },
  { label: "SiLU", value: "SiLU" },
];
const posOptions = [
  { label: "Sine", value: "Sine" },
  { label: "Absolute", value: "Absolute" },
  { label: "Relative", value: "Relative" },
  { label: "RoPE", value: "RoPE" },
  { label: "RoPE (MLA)", value: "RoPE (MLA)" },
  { label: "iRoPE", value: "iRoPE" },
  { label: "Hybrid", value: "Hybrid" },
];
const styleOptions = [
  { label: "Serial", value: "Serial" },
  { label: "Parallel", value: "Parallel" },
];

interface FiltersContentProps {
  selectedYears: [number, number];
  setSelectedYears: (val: [number, number]) => void;
  selectedNorms: Set<string>;
  setSelectedNorms: React.Dispatch<React.SetStateAction<Set<string>>>;
  selectedActivations: Set<string>;
  setSelectedActivations: React.Dispatch<React.SetStateAction<Set<string>>>;
  selectedPosEmbs: Set<string>;
  setSelectedPosEmbs: React.Dispatch<React.SetStateAction<Set<string>>>;
  selectedStyles: Set<string>;
  setSelectedStyles: React.Dispatch<React.SetStateAction<Set<string>>>;
  toggleFilter: (
    set: Set<string>,
    setState: React.Dispatch<React.SetStateAction<Set<string>>>,
    value: string
  ) => void;
}

function FiltersContent({
  selectedYears,
  setSelectedYears,
  selectedNorms,
  setSelectedNorms,
  selectedActivations,
  setSelectedActivations,
  selectedPosEmbs,
  setSelectedPosEmbs,
  selectedStyles,
  setSelectedStyles,
  toggleFilter,
}: FiltersContentProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xs font-semibold uppercase text-muted-foreground">
          Release Year
        </h3>
        <div className="px-2">
          <Slider
            defaultValue={[2017, 2025]}
            min={2017}
            max={2025}
            step={1}
            value={selectedYears}
            onValueChange={(val) => setSelectedYears(val as [number, number])}
            className="my-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{selectedYears[0]}</span>
            <span>{selectedYears[1]}</span>
          </div>
        </div>
      </div>

      <FacetedFilter
        title="Normalization"
        options={normOptions}
        selectedValues={selectedNorms}
        onSelect={(val) => toggleFilter(selectedNorms, setSelectedNorms, val)}
      />
      <FacetedFilter
        title="Activation"
        options={actOptions}
        selectedValues={selectedActivations}
        onSelect={(val) =>
          toggleFilter(selectedActivations, setSelectedActivations, val)
        }
      />
      <FacetedFilter
        title="Positional Embedding"
        options={posOptions}
        selectedValues={selectedPosEmbs}
        onSelect={(val) =>
          toggleFilter(selectedPosEmbs, setSelectedPosEmbs, val)
        }
      />
      <FacetedFilter
        title="Layer Style"
        options={styleOptions}
        selectedValues={selectedStyles}
        onSelect={(val) => toggleFilter(selectedStyles, setSelectedStyles, val)}
      />
    </div>
  );
}


// ... (existing imports and options)

export default function Home() {
  // State for filters
  const [selectedYears, setSelectedYears] = React.useState<[number, number]>([
    2017, 2025,
  ]);
  const [selectedNorms, setSelectedNorms] = React.useState<Set<string>>(
    new Set()
  );
  const [selectedActivations, setSelectedActivations] = React.useState<
    Set<string>
  >(new Set());
  const [selectedPosEmbs, setSelectedPosEmbs] = React.useState<Set<string>>(
    new Set()
  );
  const [selectedStyles, setSelectedStyles] = React.useState<Set<string>>(
    new Set()
  );

  // Sorting State
  const [sortOrder, setSortOrder] = React.useState<string>("newest");

  // Filter Data
  const filteredData = React.useMemo(() => {
    const data = models.filter((model) => {
      // Year Filter
      if (
        model.releaseYear < selectedYears[0] ||
        model.releaseYear > selectedYears[1]
      ) {
        return false;
      }

      // Exact Match Filters (OR logic within category, AND logic across categories)
      if (selectedNorms.size > 0 && !selectedNorms.has(model.normType))
        return false;
      if (
        selectedActivations.size > 0 &&
        !selectedActivations.has(model.activation)
      )
        return false;
      if (
        selectedPosEmbs.size > 0 &&
        !selectedPosEmbs.has(model.positionEmbedding)
      ) {
        if (model.positionEmbedding === "RoPE (MLA)" && selectedPosEmbs.has("RoPE")) {
          return false;
        }
        return false;
      }
      if (selectedStyles.size > 0 && !selectedStyles.has(model.layerStyle))
        return false;

      return true;
    });

    // Apply Sorting
    return data.sort((a, b) => {
      switch (sortOrder) {
        case "newest":
          return b.releaseYear - a.releaseYear;
        case "oldest":
          return a.releaseYear - b.releaseYear;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [
    selectedYears,
    selectedNorms,
    selectedActivations,
    selectedPosEmbs,
    selectedStyles,
    sortOrder,
  ]);

  // Handler helpers
  const toggleFilter = (
    set: Set<string>,
    setState: React.Dispatch<React.SetStateAction<Set<string>>>,
    value: string
  ) => {
    const newSet = new Set(set);
    if (newSet.has(value)) {
      newSet.delete(value);
    } else {
      newSet.add(value);
    }
    setState(newSet);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="font-bold text-lg tracking-tight">
              LLM Genealogy
            </h1>
            <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded-full hidden sm:inline-block">
              2017–2025
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              <PlusCircle className="mr-2 h-4 w-4" />
              Submit Model
            </Button>
            {/* Mobile Filter Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Refine the model list by architecture.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <FiltersContent
                    selectedYears={selectedYears}
                    setSelectedYears={setSelectedYears}
                    selectedNorms={selectedNorms}
                    setSelectedNorms={setSelectedNorms}
                    selectedActivations={selectedActivations}
                    setSelectedActivations={setSelectedActivations}
                    selectedPosEmbs={selectedPosEmbs}
                    setSelectedPosEmbs={setSelectedPosEmbs}
                    selectedStyles={selectedStyles}
                    setSelectedStyles={setSelectedStyles}
                    toggleFilter={toggleFilter}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 py-6 flex gap-8">
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:block w-64 flex-shrink-0 space-y-8">
          <FiltersContent
            selectedYears={selectedYears}
            setSelectedYears={setSelectedYears}
            selectedNorms={selectedNorms}
            setSelectedNorms={setSelectedNorms}
            selectedActivations={selectedActivations}
            setSelectedActivations={setSelectedActivations}
            selectedPosEmbs={selectedPosEmbs}
            setSelectedPosEmbs={setSelectedPosEmbs}
            selectedStyles={selectedStyles}
            setSelectedStyles={setSelectedStyles}
            toggleFilter={toggleFilter}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredData.length} models
            </p>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground hidden sm:inline-block">Sort by:</span>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[180px] h-9">
                  <ArrowUpDown className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DataTable columns={columns} data={filteredData} />
        </main>
      </div>
    </div>
  );
}
