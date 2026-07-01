"use client";

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ClipPathEditorCanvas } from "./canvas";
import { ClipPathEditorProvider } from "./context";
import { ClipPathEditorAdvanced, ClipPathEditorResetButton, ClipPathEditorSettings, ClipPathEditorStyle } from "./controls";
import { ClipPathEditorOutput } from "./output";

export function ClipPathCurveTool({ className }: React.ComponentProps<"div">) {
  return (
    <ClipPathEditorProvider>
      <div className={cn("grid w-full gap-4", className)}>
        <div className="grid items-stretch gap-2 sm:grid-cols-4">
          <Card className="self-start sm:col-span-2">
            <CardHeader>
              <CardTitle>Playground</CardTitle>
              <CardAction>
                <ClipPathEditorResetButton />
              </CardAction>
            </CardHeader>
            <CardContent className="mb-4">
              <ClipPathEditorCanvas />
            </CardContent>
          </Card>

          <div className="flex min-w-0 flex-col gap-1 sm:col-span-2">
            <Card variant="muted">
              <CardHeader>
                <CardTitle>Customize</CardTitle>
              </CardHeader>
              <CardContent>
                <ClipPathEditorSettings />
              </CardContent>
            </Card>
            <ClipPathEditorAdvanced />

            <Card variant="muted">
              <CardHeader>
                <CardTitle>Style</CardTitle>
              </CardHeader>
              <CardContent>
                <ClipPathEditorStyle />
              </CardContent>
            </Card>
          </div>
        </div>
        <ClipPathEditorOutput />
      </div>
    </ClipPathEditorProvider>
  );
}
