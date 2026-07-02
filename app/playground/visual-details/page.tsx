import { VisualDetailsPlayground } from "@/components/playground/visual-details/visual-details-playground";

export default function VisualDetailsPlaygroundPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10">
      <h1 className="w-full text-h1">Visual details</h1>
      <VisualDetailsPlayground />
    </div>
  );
}
