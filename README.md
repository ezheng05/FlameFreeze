# Wildfire App

A Next.js application for wildfire monitoring and management.

## Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Update the environment variables in `.env.local`:
   - `NEXT_PUBLIC_MAPBOX_TOKEN`: Your Mapbox access token (required for map functionality)
   - `NEXT_PUBLIC_API_URL`: The URL of your API server (defaults to http://localhost:3000/api)

## Development

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm dev
   ```

3. Build for production:
   ```bash
   pnpm build
   ```

## Environment Variables

The following environment variables are required:

- `NEXT_PUBLIC_MAPBOX_TOKEN`: Your Mapbox access token for map functionality
- `NEXT_PUBLIC_API_URL`: The URL of your API server

Make sure to set these variables in your `.env.local` file before running the application. 