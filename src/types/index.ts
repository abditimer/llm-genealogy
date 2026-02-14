export type ModelArchitecture = {
    id: string;
    name: string;
    releaseYear: number;
    organization: string;
    normType: "LayerNorm" | "RMSNorm";
    layerStyle: "Serial" | "Parallel";
    isPreNorm: boolean;
    positionEmbedding: "Sine" | "Absolute" | "Relative" | "RoPE" | "ALiBi" | "Hybrid" | "RoPE (MLA)";
    activation: "ReLU" | "GeLU" | "SwiGLU" | "GeGLU" | "SqReLU" | "SiLU";
    stabilityTricks?: string[]; // e.g., ["z-loss", "QK-norm", "logit soft-capping", "Pre+Post Norm"]
    paperTitle: string;
    paperUrl: string;
    details?: string; // For extra notes like "Aux-loss-free balancing"
};
