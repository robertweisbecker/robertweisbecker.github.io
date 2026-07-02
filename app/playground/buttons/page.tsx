import { ButtonsPlayground } from "@/components/playground/buttons/buttons-playground";

export default function ButtonsPlaygroundPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10">
      <h1 className="w-full text-h1">Buttons</h1>
      <ButtonsPlayground />
    </div>
  );
}
