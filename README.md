# Next.js Parallel Route Crash MCVE

This repository is a Minimal, Complete, and Verifiable Example (MCVE) demonstrating a critical bug where Next.js Parallel Routes fail to load when deployed on **Firebase App Hosting** or **Google Cloud Run**.

The application crashes with a `ChunkLoadError` because these platforms incorrectly handle URL-encoded characters (like `%40` for `@`) in the paths for JavaScript chunks.

## The Bug Explained

- **Next.js Parallel Routes** use the `@` symbol in the directory structure (e.g., `src/app/@parallel/page.tsx`).
- During the build, Next.js creates JavaScript chunks for these routes with paths like `/_next/static/chunks/app/%40parallel/page.js`.
- When the browser requests this chunk, Firebase App Hosting / Google Cloud Run attempts to decode the URL path.
- The `%40` is decoded back to `@`, but the platform's routing or static file serving mechanism fails to find the file with the `@` symbol in its path.
- This results in a 404 error for the chunk, leading to a `ChunkLoadError` on the client and a full application crash.

### Relevant Issues:

- **Next.js GitHub Issue**: [vercel/next.js#71626](https://github.com/vercel/next.js/issues/71626)
- **Google Cloud Run Known Issue**: [URL-encoded characters are decoded in paths](https://cloud.google.com/run/docs/known-issues#url-decode)

## How to Reproduce

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run locally (It will work):**
    ```bash
    npm run dev
    # or for a production build
    npm run build
    npm start
    ```
    When you open `http://localhost:3000` (or your port), you will see both the main page content and the parallel route content load correctly.

4.  **Deploy to Firebase App Hosting (It will fail):**
    - Set up a Firebase project and install the Firebase CLI.
    - Initialize App Hosting: `firebase apphosting:backends:create`
    - Deploy: `firebase deploy --only apphosting`
    - Open the deployed URL. The application will crash, and you can see the `ChunkLoadError` in the browser's developer console.

## The Workaround

As discussed in the GitHub issue, there are two primary workarounds. You can apply one of them in `next.config.ts`.

### Option 1: Disable Partial Prerendering (PPR)

This is the most direct workaround. PPR seems to be related to how chunks are generated or fetched in a way that triggers this platform bug.

```javascript
// next.config.ts
const nextConfig = {
  experimental: {
    ppr: false,
  },
};

export default nextConfig;
```

### Option 2: Enable Trailing Slashes

This changes how Next.js generates URLs, which can also circumvent the issue.

```javascript
// next.config.ts
const nextConfig = {
  trailingSlash: true,
};

export default nextConfig;
```

This repository has these options commented out in `next.config.ts` for easy testing. Uncomment one of them and redeploy to see the workaround in action.
