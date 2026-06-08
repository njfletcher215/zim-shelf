# zim-shelf

An alternate frontend for [kiwix-serve](https://github.com/kiwix/kiwix-tools), built with React and shadcn/ui.

> **Note:** This project is currently in beta, and does not yet have full feature-parity with the default kiwix-serve frontend.

## Dependencies

- [Node.js](https://nodejs.org/) — v18 or later
- A running [kiwix-serve](https://github.com/kiwix/kiwix-tools) instance

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/njfletcher215/zim-shelf ~/zim-shelf
   cd ~/zim-shelf
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the project root and set your kiwix-serve base URL:

   ```sh
   VITE_KIWIX_SERVE_BASE_URL=http://localhost:80
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```

   Or build for production:

   ```sh
   npm run build
   npm run preview
   ```
