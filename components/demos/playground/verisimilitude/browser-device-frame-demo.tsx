import { DeviceFrame } from "@/components/device-frame";
import { BrowserFramePreview } from "@/components/demos/playground/frames/browser-frame-preview";

export function BrowserDeviceFrameDemo() {
  return (
    <DeviceFrame.Browser address="bob.fyi">
      <BrowserFramePreview />
    </DeviceFrame.Browser>
  );
}
