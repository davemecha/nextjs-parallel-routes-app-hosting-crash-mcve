# Next.js Parallel Route Crash MCVE

This repository is a Minimal, Complete, and Verifiable Example (MCVE) demonstrating a bug related to the interaction between **Next.js Parallel Routes** and **`next-intl` middleware**.

The bug manifests as a `ChunkLoadError` in client-rendered parallel routes when deployed on platforms like **Firebase App Hosting** or **Google Cloud Run**, which are examples where this specific interaction causes issues with URL decoding.

## The Bug Explained

- **Next.js Parallel Routes** use the `@` symbol in the directory structure (e.g., `src/app/[locale]/@parallel/page.tsx`). When these routes are client-rendered (e.g., using `'use client'`).
- During the build, Next.js creates JavaScript chunks for these routes with paths like `/_next/static/chunks/app/%40parallel/page.js`.
- The `next-intl` middleware, when processing incoming requests, decodes the `%40` in the URL path to `@`.
- This decoded path (`/@parallel/...`) is then used internally, but it doesn't match the actual file path on the server which still expects the encoded `%40`.
- This results in a 404 error for the chunk, leading to a `ChunkLoadError` on the client and a full application crash.

### Relevant Issues:

- **`next-intl` GitHub Issue**: [amannn/next-intl#255](https://github.com/amannn/next-intl/issues/255) (This is the core `next-intl` issue discussing the decoding behavior)

These issues may be related. I'm not sure...

- **Next.js GitHub Issue**: [vercel/next.js#71626](https://github.com/vercel/next.js/issues/71626)
- **Google Cloud Run Known Issue**: [URL-encoded characters are decoded in paths](https://cloud.google.com/run/docs/known-issues#url-decode) (This platform behavior might contribute to the issue manifesting)

## How to Reproduce

1. **Clone the repository:**
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
 This bug can be observed when deploying to platforms like Firebase App Hosting or Google Cloud Run.

 You can see a hosted demo reproducing the bug here: [https://bug-demo--bug-next-slots-mcve.us-central1.hosted.app/de](https://bug-demo--bug-next-slots-mcve.us-central1.hosted.app/de). On the initial load, you may need to manually refresh the page to trigger the `ChunkLoadError`.

## The Workaround

A workaround for this issue involves adding a rewrite rule in your `/next.config.ts` file. This rule intercepts requests for Next.js static chunks that have had the `@` symbol decoded by the middleware and re-encodes it back to `%40`. This ensures the server receives the path in the expected format, preventing the 404 error and subsequent `ChunkLoadError`.

The `next.config.ts` file in this repository includes a commented-out `rewrites` configuration that serves as a workaround. There is also a `workaround` branch, which includes this configuration.

``` ts
const nextConfig: NextConfig = {
  rewrites: async () => ({
    beforeFiles: [
      {
        source: '/_next/static/chunks/app/:folder*/@:slotName/:path*',
        destination: '/_next/static/chunks/app/:folder*/%40:slotName/:path*',
      },
    ],
    afterFiles: [],
    fallback: [],
  }),
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
```