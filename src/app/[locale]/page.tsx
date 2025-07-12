import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bug } from "lucide-react";

export default function Home() {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
            <Bug className="h-6 w-6 text-destructive" />
          </div>
          <div className="flex flex-col">
            <CardTitle className="font-headline">Next.js, next-intl Parallel Route Bug</CardTitle>
            <CardDescription className="text-destructive">
              This page demonstrates a <code>ChunkLoadError</code> issue.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            This is the main content of the application, rendered from{" "}
            <code className="font-code rounded bg-muted px-1 py-0.5">src/app/[locale]/page.tsx</code>.
          </p>
          <p>
            Below, you should see content loaded from a parallel route. When this application is deployed to
            a production environment like Firebase App Hosting or Google Cloud Run, fetching the JavaScript chunk for the parallel route fails,
            resulting in a <code className="font-code rounded bg-muted px-1 py-0.5">ChunkLoadError</code> and a fatal application crash.
          </p>
          <p>
            The issue is related to how the next-intl middleware handle URL-encoded characters (like{" "}
            <code className="font-code rounded bg-muted px-1 py-0.5">%40</code> resulting from <code className="font-code rounded bg-muted px-1 py-0.5">@</code>) in chunk paths, which Next.js uses for parallel routes. Specifically, requests to paths like{" "}
            <code className="font-code rounded bg-muted px-1 py-0.5">/_next/static/chunks/app/%5Blocale%5D/%40parallel/page.js</code>{" "}
            fail with a 404 error on some production environments like Firebase App Hosting or Google Cloud Run.
          </p>
          <p>
            This Minimum Complete Verifiable Example (MCVE) is hosted on GitHub: <a href="https://github.com/davemecha/nextjs-parallel-routes-crash-mcve" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://github.com/davemecha/nextjs-parallel-routes-crash-mcve</a>.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
