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
            <CardTitle className="font-headline">Next.js Parallel Route Bug</CardTitle>
            <CardDescription>
              This page demonstrates a ChunkLoadError issue.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            This is the main content of the application, rendered from{" "}
            <code className="font-code rounded bg-muted px-1 py-0.5">src/app/page.tsx</code>.
          </p>
          <p>
            Below, you should see content loaded from a parallel route. When this application is deployed to
            Firebase App Hosting or Google Cloud Run, fetching the JavaScript chunk for the parallel route fails,
            causing a fatal application crash.
          </p>
          <p>
            The issue is related to how these platforms handle URL-encoded characters (like{" "}
            <code className="font-code rounded bg-muted px-1 py-0.5">@</code>) in chunk paths, which Next.js uses for parallel routes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
