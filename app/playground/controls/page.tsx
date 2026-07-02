import { ControlsPlayground } from "@/components/playground/controls/controls-playground";

export default function ControlsPlaygroundPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10">
      <h1 className="w-full text-h1">Controls</h1>
      <ControlsPlayground />
    </div>
  );
}
