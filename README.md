# target-video-app

A short-form video streaming app built with [Expo](https://expo.dev) (SDK 58) and Expo Router. It has a browse feed, show details, a video player, pay-per-episode unlocks with coins, and a premium paywall.

## Prerequisites

- [Bun](https://bun.sh) (the project uses `bun.lock`)
- For iOS: macOS with Xcode and an iOS Simulator
- For Android: Android Studio with an emulator, or a physical device
- Optional: [Expo Go](https://expo.dev/go) on a phone for quick testing

## Setup

```bash
bun install
```

## Running the app

Start the dev server:

```bash
bun start
```

Then press `i` for the iOS Simulator, `a` for the Android emulator, or `w` for web. You can also scan the QR code with Expo Go.

You can also launch a platform directly:

```bash
bun run ios
bun run android
bun run web
```

## Project structure

```
app/                 # Expo Router screens (file-based routing)
  (tabs)/            # Tab navigator screens
  details/[id].tsx   # Show details
  watch/[id].tsx     # Video player
  coins.tsx          # Coin shop
  premium.tsx        # Premium paywall
src/
  components/        # Shared UI components
  constants/         # TMDB types and mock data
  store/             # Zustand stores (favorites, unlocks)
  tokens/            # Design tokens (colors, spacing, styles)
  utils/             # Helpers
assets/              # Fonts and images
```
