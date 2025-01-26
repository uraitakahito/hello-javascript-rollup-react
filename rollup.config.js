/* eslint-disable max-len */

// A Rollup plugin to convert CommonJS modules to ES6
import commonjs from 'rollup-plugin-commonjs';

import copy from 'rollup-plugin-copy';

// https://rollupjs.org/command-line-interface/#config-intellisense
import { defineConfig } from 'rollup';

// The @rollup/plugin-node-resolve plugin teaches Rollup how to find external modules.
import resolve from '@rollup/plugin-node-resolve';

//
// This project has no barrel files and multiple entry points, so defineConfig() accepts an array of configurations
//
const config = defineConfig(
  [
    {
      input: 'src/import-check/import-conditional-exports.js',
      output: [
        {
          dir: 'dist/es6',
          format: 'es',
          preserveModules: true,
        },
        {
          dir: 'dist/iife/src/import-check',
          format: 'iife',
        },
        {
          dir: 'dist/umd/src/import-check',
          format: 'umd',
        },
      ],
      plugins: [
        resolve(),
      ],

      //
      // Sample configuration to explicitly throw an error if an external dependency is not found.
      // By default, Rollup only shows a warning and the build succeeds if an external dependency is not found.
      // https://rollupjs.org/configuration-options/#onwarn
      //
      onwarn(warning, warn) {
        if (warning.code === 'UNRESOLVED_IMPORT') {
          throw new Error(`Unresolved import: ${warning.source}`);
        }
        warn(warning);
      },
    },

    {
      input: 'src/import-check/import-external-commonjs.js',
      output: [
        {
          dir: 'dist/es6',
          format: 'es',
          preserveModules: true,
        },
        {
          dir: 'dist/iife/src/import-check',
          format: 'iife',
        },
        {
          dir: 'dist/umd/src/import-check',
          format: 'umd',
        },
      ],
      plugins: [
        commonjs(),
        resolve(),
      ],

      //
      // Sample configuration to explicitly throw an error if an external dependency is not found.
      // By default, Rollup only shows a warning and the build succeeds if an external dependency is not found.
      // https://rollupjs.org/configuration-options/#onwarn
      //
      onwarn(warning, warn) {
        if (warning.code === 'UNRESOLVED_IMPORT') {
          throw new Error(`Unresolved import: ${warning.source}`);
        }
        warn(warning);
      },
    },

    {
      input: 'src/import-check/import-external-esmodule.js',
      output: [
        {
          dir: 'dist/es6',
          format: 'es',
          preserveModules: true,
        },
        {
          dir: 'dist/iife/src/import-check',
          format: 'iife',
        },
        {
          dir: 'dist/umd/src/import-check',
          format: 'umd',
        },
      ],
      plugins: [
        commonjs(),
        resolve(),
      ],

      //
      // Sample configuration to explicitly throw an error if an external dependency is not found.
      // By default, Rollup only shows a warning and the build succeeds if an external dependency is not found.
      // https://rollupjs.org/configuration-options/#onwarn
      //
      onwarn(warning, warn) {
        if (warning.code === 'UNRESOLVED_IMPORT') {
          throw new Error(`Unresolved import: ${warning.source}`);
        }
        warn(warning);
      },
    },

    // In the case of Vite, it seems difficult to disable code splitting for multiple files.
    // https://github.com/uraitakahito/hello-javascript-vite/blob/954cc418e1d7549b78bfd7d1e0f6556ccd4affd4/vite.config.mjs#L16-L25
    //
    // Issues:
    // https://github.com/rollup/rollup/issues/2756
    {
      input: 'src/import-check/import-internal-esmodule.js',
      output: [
        {
          dir: 'dist/es6/src/import-check',
          format: 'es',
          preserveModules: true,
        },
        {
          dir: 'dist/iife/src/import-check',
          format: 'iife',
        },
        {
          dir: 'dist/umd/src/import-check',
          format: 'umd',
        },
      ],
      plugins: [
        resolve(),
      ],
    },

    {
      input: 'src/import-check/suppress-warning.js',
      output: [
        {
          dir: 'dist/es6/src/import-check',
          format: 'es',
          preserveModules: true,
        },
      ],
      // The hello-esmodule package is not bundled into the output.
      // https://rollupjs.org/troubleshooting/#warning-treating-module-as-external-dependency
      external: ['@uraitakahito/hello-esmodule'],
    },

    {
      input: 'src/entry.js',
      output: [
        {
          dir: 'dist',
          format: 'es',
          preserveModules: true,
        },
      ],
      plugins: [
        copy({
          targets: [
            { src: 'src/test.html', dest: 'dist' },
          ],
        }),
      ],
    },
  ],
);

export default config;
