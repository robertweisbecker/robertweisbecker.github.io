"use client";

export type { PhoneProps } from "./phone";
export { Phone } from "./phone";

export type { BrowserNavBarProps, BrowserProps, BrowserWindowProps } from "./browser";
export { Browser, BrowserNavBar, BrowserWindow } from "./browser";

export type { DesktopProps } from "./desktop";
export { Desktop } from "./desktop";

export type { ShineProps } from "./shared";
export {
  BatteryDisplay,
  DeviceProvider,
  Shine,
  SignalDisplay,
  Time,
  TrafficLights,
  useBatteryStatus,
  useCurrentTime,
} from "./shared";

import { Browser, BrowserNavBar, BrowserWindow } from "./browser";
import { Desktop } from "./desktop";
import { Phone } from "./phone";
import { Shine } from "./shared";

/** Compound namespace for ergonomic `<Device.Phone />` usage. Tree-shake named exports when possible. */
export const Device = {
  Phone,
  Browser: Object.assign(Browser, { NavBar: BrowserNavBar, Window: BrowserWindow }),
  Desktop,
  Shine,
};
