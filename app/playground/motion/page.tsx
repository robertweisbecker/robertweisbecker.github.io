import { MotionPlayground } from "@/components/playground/motion/motion-playground";

export default function MotionPlaygroundPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10">
      <h1 className="w-full text-h1">Motion</h1>
      <MotionPlayground />
    </div>
  );
}
