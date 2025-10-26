"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorComponent({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error caught by error boundary:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-destructive">
            Something went wrong!
          </h1>
          <p className="text-muted-foreground">
            We apologize for the inconvenience. An unexpected error has
            occurred.
          </p>
          {error.digest && (
            <p className="mt-2 rounded-md bg-muted p-2 font-mono text-sm">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={reset} className="w-full" variant="outline">
            Try again
          </Button>
          <Button
            onClick={() => window.location.reload()}
            className="w-full"
            variant="default"
          >
            Reload Page
          </Button>
        </div>

        {process.env.NODE_ENV === "development" && (
          <details className="mt-4 rounded-md border p-4">
            <summary className="cursor-pointer font-medium">
              Error Details
            </summary>
            <pre className="mt-2 overflow-auto rounded bg-muted p-2 text-sm text-muted-foreground">
              {error.message}
              {error.stack && (
                <>
                  <br />
                  <br />
                  {error.stack}
                </>
              )}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
