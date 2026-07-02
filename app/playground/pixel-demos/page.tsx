import { PixelsPlayground } from "@/components/playground/pixels/pixels-playground";

export default function PixelDemosPlaygroundPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10">
      <h1 className="w-full text-h1">Pixels</h1>
      <PixelsPlayground />
    </div>
  );
}
