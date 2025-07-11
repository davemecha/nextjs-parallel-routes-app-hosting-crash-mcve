# **App Name**: Next.js parallel route crash MCVE

## Core Features:

- Parallel Route Setup: Implement parallel routes with Next.js for demonstrating the bug. (home page with a slot, that contains the content of the page specified in the parallel route)
- Firebase Config: Configuration for deployment to Firebase App Hosting to show the bug.
- README: README to describe the repo and how to use it to reproduce the issue, that should be demonstrated. - The issue works locally in a dev server or most other production environments (e.g. running the prod build locally). But when deployed on App Hosting or Cloud Run the fetching of the parallel route fails with a ChunkLoadError which leads to a crash of the full app. Next.js bug description: https://github.com/vercel/next.js/issues/71626 Cloud run known issue: https://cloud.google.com/run/docs/known-issues#url-decode
- Workaround Description: Describe the workaround as mentioned in the nextjs github issue.

## Style Guidelines:

- Primary color: Dark indigo (#4B0082) to symbolize depth and clarity, suitable for a focused debugging environment.
- Background color: Very light lavender (#F0F8FF), almost white, providing a subtle contrast and minimizing distraction.
- Accent color: Muted violet (#8A2BE2), a slightly brighter color used for interactive elements to draw the user's attention.
- Body and headline font: 'Inter', a sans-serif font, for a clean and modern appearance.
- Simple, clean layout to focus on route demonstration without unnecessary distractions.
- Subtle transitions when switching between routes to indicate navigation flow.