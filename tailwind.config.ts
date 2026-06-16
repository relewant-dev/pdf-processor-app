type TailwindConfig = {
  content: string[];
  theme: {
    extend: Record<string, never>;
  };
  plugins: unknown[];
};

const config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies TailwindConfig;

export default config;
