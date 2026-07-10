import { DeviceFrame } from "@/components/device-frame";
import { BubbleDemo } from "@/components/demos/chat-demo";

export function PhoneDeviceFrameDemo() {
  return (
    <DeviceFrame.Phone island toolbar address="bob.fyi" gutter className="max-w-xs">
      <BubbleDemo />
    </DeviceFrame.Phone>
  );
}
