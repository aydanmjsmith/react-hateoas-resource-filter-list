import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';

export default [
    {
        input: './src/index.js',
        output: [
            {
                file: 'dist/index.js',
                format: 'cjs',
            },
            {
                file: 'dist/index.es.js',
                format: 'es', 
                exports: 'named',
            },
        ],
        plugins: [
            commonjs({ 
                include: /node_modules/ 
            }),
            babel({
                exclude: 'node_modules/**',
                babelHelpers: 'bundled',
                presets: ['@babel/preset-react'],
            }),
            external(),
            resolve({
                preferBuiltins: true,
            }),
            
            json(),
            terser(),
        ]
    }
];