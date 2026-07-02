import { FramesPlayground } from "@/components/playground/frames/frames-playground";

export default function MediaComparisonPlaygroundPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10">
      <h1 className="w-full text-h1">Frames</h1>
      <FramesPlayground />
    </div>
  );
}
