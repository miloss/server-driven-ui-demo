import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        ignores: [
            ".next/**/*",
            "node_modules/**/*",
            "out/**/*",
            "dist/**/*",
            "next-env.d.ts"
        ],
        rules: {
            "indent": ["error", 4, { "SwitchCase": 1 }],
            "react/jsx-indent": ["error", 4],
            "react/jsx-indent-props": ["error", 4],
            "no-trailing-spaces": "error",
            "max-len": ["error", {
                "code": 100,
                "tabWidth": 4,
                "ignoreUrls": true,
                "ignoreStrings": true,
                "ignoreTemplateLiterals": true
            }],
        },
    },
];

export default eslintConfig;
