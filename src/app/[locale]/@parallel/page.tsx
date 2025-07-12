'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Puzzle } from "lucide-react";

export default function ParallelPage() {
  return (
    <Card className="w-full border-dashed border-accent shadow-lg">
      <CardHeader>
         <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
            <Puzzle className="h-6 w-6 text-accent" />
          </div>
          <div className="flex flex-col">
            <CardTitle className="font-headline">Parallel Route Content</CardTitle>
            <CardDescription>
              Loaded from <code className="font-code rounded bg-muted px-1 py-0.5">@parallel/page.tsx</code>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong>If you are seeing this, the parallel route has loaded successfully.</strong>
          </p>
          <p>
            This works as expected on a local development server. However, on certain cloud platforms that improperly decode URL paths, the request for this component's JavaScript chunk will fail, and you would see an error instead of this card.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
