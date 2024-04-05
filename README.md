# Obsidian Random names

This is a plugin for [Obsidian](https://obsidian.md) that will insert random names into a document. There's a lot of categories of names (both people and items). We use https://github.com/xaroth8088/random-names internally to get the names, and their [full list](https://github.com/xaroth8088/random-names?tab=readme-ov-file#full-list) has the complete set.

## How to use

1. Clone this repo.
2. Make sure your NodeJS is at least v16 (`node --version`).
3. `./pnpm i` to install dependencies.
4. `./pnpm dev` to start compilation in watch mode.

## Manually installing the plugin

1. Run `./pnpm build`
2. Copy over `main.js` and `manifest.json` to your vault `VaultFolder/.obsidian/plugins/obsidian-random-names/`.
