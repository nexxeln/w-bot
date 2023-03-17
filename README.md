# TypeScript Sapphire Bot example

This is a basic setup of a Discord bot using the [sapphire framework][sapphire] written in TypeScript

## How to use it?

### Prerequisite

```sh
pnpm install
```

### Development

This example can be run with `tsc-watch` to watch the files and automatically restart your bot.

```sh
pnpm watch:start
```

### Production

You can also run the bot with `pnpm dev`, this will first build your code and then run `node ./dist/index.js`. But this is not the recommended way to run a bot in production.
