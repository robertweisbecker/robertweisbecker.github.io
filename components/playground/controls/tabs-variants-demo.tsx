import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsVariantsDemo() {
  const panelClass = "min-h-40 px-3 text-sm text-muted-foreground grid place-items-center bg-background rounded-lg";
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Tabs defaultValue="default" className="w-full">
        <TabsList>
          <TabsTrigger value="default">Account</TabsTrigger>
          <TabsTrigger value="details">Profile</TabsTrigger>
          <TabsTrigger value="settings">Payment</TabsTrigger>
        </TabsList>
        <TabsContent value="default" className={panelClass}>
          Default tabs use an elevated indicator.
        </TabsContent>
        <TabsContent value="details" className={panelClass}>
          Animation handled by CSS transitions.
        </TabsContent>
        <TabsContent value="settings" className={panelClass}>
          Built on Base UI.
        </TabsContent>
      </Tabs>
      <Tabs defaultValue="line" className="w-full">
        <TabsList variant="line">
          <TabsTrigger value="line">Dashboard</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="exports">Exports</TabsTrigger>
        </TabsList>
        <TabsContent className={panelClass} value="line">
          Line tabs keep the navigation lightweight.
        </TabsContent>
        <TabsContent className={panelClass} value="reports">
          Reports content.
        </TabsContent>
        <TabsContent className={panelClass} value="exports">
          Exports content.
        </TabsContent>
      </Tabs>
      <Tabs defaultValue="pill" className="w-full">
        <TabsList variant="pill">
          <TabsTrigger value="pill">Posts</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="archive">Archive</TabsTrigger>
        </TabsList>
        <TabsContent value="pill" className={panelClass}>
          Pill tabs work well for nested or inline contexts.
        </TabsContent>
        <TabsContent value="drafts" className={panelClass}>
          Drafts content.
        </TabsContent>
        <TabsContent value="archive" className={panelClass}>
          Archive content.
        </TabsContent>
      </Tabs>
    </div>
  );
}
