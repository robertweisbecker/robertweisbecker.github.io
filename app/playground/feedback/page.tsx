import { FeedbackPlayground } from "@/components/playground/feedback/feedback-playground";

export default function FeedbackPlaygroundPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10">
      <h1 className="w-full text-h1">Feedback</h1>
      <FeedbackPlayground />
    </div>
  );
}
