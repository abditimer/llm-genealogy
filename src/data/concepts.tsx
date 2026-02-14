export type ConceptDefinition = {
    title: string;
    description: string;
    diagram?: React.ReactNode; // SVG or CSS visualization
    links: { label: string; url: string }[];
};

export const concepts: Record<string, ConceptDefinition> = {
    // Normalization
    LayerNorm: {
        title: "Layer Normalization",
        description:
            "Normalizes inputs across the feature dimension for each token independently. It stabilizes training by keeping activation distributions consistent.",
        links: [
            { label: "Paper", url: "https://arxiv.org/abs/1607.06450" },
            { label: "Explained", url: "https://paperswithcode.com/method/layer-normalization" },
        ],
    },
    RMSNorm: {
        title: "Root Mean Square Normalization",
        description:
            "A simplified version of LayerNorm that scales inputs by their root mean square, omitting the mean centering operation. It is computationally cheaper and often performs equally well.",
        links: [
            { label: "Paper", url: "https://arxiv.org/abs/1910.07467" },
        ],
    },

    // Positional Embeddings
    Sine: {
        title: "Sinusoidal Embeddings",
        description: "Fixed, absolute position encodings using sine and cosine functions of different frequencies. Used in the original Transformer.",
        links: [{ label: "Visual Guide", url: "https://kazemnejad.com/blog/transformer_architecture_positional_encoding/" }],
    },
    Absolute: {
        title: "Learned Absolute Embeddings",
        description: "Learnable vectors added to the input embeddings to represent absolute positions (1st, 2nd, 3rd token, etc.). Limited by context length seen during training.",
        links: [],
    },
    Relative: {
        title: "Relative Positional Encoding",
        description: "Encodes the distance between tokens rather than their absolute positions. Allows for better generalization to sequence lengths longer than seen during training.",
        links: [{ label: "Paper", url: "https://arxiv.org/abs/1803.02155" }],
    },
    RoPE: {
        title: "Rotary Positional Embeddings",
        description: "Encodes position by rotating the query and key vectors in a high-dimensional space. It combines the benefits of absolute and relative information and extrapolates well.",
        links: [
            { label: "RoFormer Paper", url: "https://arxiv.org/abs/2104.09864" },
            { label: "EleutherAI Blog", url: "https://blog.eleuther.ai/rotary-embeddings/" },
        ],
    },
    "RoPE (MLA)": {
        title: "RoPE with Multi-Head Latent Attention",
        description: "A specialized implementation of RoPE used in DeepSeek-V3's Multi-Head Latent Attention architecture to compress KV cache while maintaining positional information.",
        links: [{ label: "DeepSeek V3", url: "https://arxiv.org/abs/2412.19437" }],
    },
    ALiBi: {
        title: "Attention with Linear Biases",
        description: "Adds a static, non-learned bias to attention scores based on the distance between tokens. Allows training on short sequences and inference on very long ones.",
        links: [{ label: "Paper", url: "https://arxiv.org/abs/2108.12409" }],
    },

    // Activations
    ReLU: {
        title: "Rectified Linear Unit",
        description: "Simple activation function: f(x) = max(0, x). Computationally efficient but can suffer from 'dead neurons'.",
        links: [],
    },
    GeLU: {
        title: "Gaussian Error Linear Unit",
        description: "A smooth approximation of ReLU that weights inputs by their percentile in a Gaussian distribution. Used in GPT-2, BERT.",
        links: [{ label: "Paper", url: "https://arxiv.org/abs/1606.08415" }],
    },
    SwiGLU: {
        title: "Swish-Gated Linear Unit",
        description: "A Gated Linear Unit (GLU) using the Swish activation function. It allows the model to select which information to pass through, generally improving performance.",
        links: [{ label: "Paper (GLU Variants)", url: "https://arxiv.org/abs/2002.05202" }],
    },
    GeGLU: {
        title: "GELU-Gated Linear Unit",
        description: "A variant of GLU using GeLU as the gate activation. Used in PaLM and Gemma models.",
        links: [],
    },
    SiLU: {
        title: "Sigmoid Linear Unit (Swish)",
        description: "f(x) = x * sigmoid(x). Smooth, non-monotonic activation function.",
        links: [],
    },
};
