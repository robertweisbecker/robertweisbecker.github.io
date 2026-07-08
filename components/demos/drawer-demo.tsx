"use client";
import { Drawer } from "@base-ui/react/drawer";
import { Button } from "@/components/ui/button";

export default function ExampleDrawerNested() {
  return (
    <Drawer.Root>
      <Drawer.Trigger render={<Button />}>Open drawer stack</Drawer.Trigger>
      <Drawer.VirtualKeyboardProvider>
        <Drawer.Portal>
          <Drawer.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] [--backdrop-opacity:0.1] [--bleed:3rem] data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-starting-style:opacity-0 data-swiping:duration-0 supports-[-webkit-touch-callout:none]:absolute dark:[--backdrop-opacity:0.7]" />
          <Drawer.Viewport className="fixed inset-0 flex items-end justify-center">
            <Drawer.Popup className={popupClassName}>
              <div className={handleClassName} />
              <Drawer.Content className={contentClassName}>
                <Drawer.Title className="fontmedium mb-1 text-center text-base">Account</Drawer.Title>
                <Drawer.Description className="mb-6 text-center text-sm">
                  Nested drawers can be styled to stack, while each drawer remains independently focus managed.
                </Drawer.Description>

                <div className="flex items-center justify-end gap-4">
                  <div className="mr-auto">
                    <Drawer.Root>
                      <Drawer.Trigger render={<Button />}>Security settings</Drawer.Trigger>
                      <Drawer.Portal>
                        <Drawer.Viewport className="fixed inset-0 flex items-end justify-center">
                          <Drawer.Popup className={popupClassName}>
                            <div className={handleClassName} />
                            <Drawer.Content className={contentClassName}>
                              <Drawer.Title className="fontmedium mb-1 text-center text-base">Security</Drawer.Title>
                              <Drawer.Description className="mb-6 text-center text-sm">
                                Review sign-in activity and update your security preferences.
                              </Drawer.Description>
                              <ul className="mb-6 list-disc pl-5">
                                <li>Passkeys enabled</li>
                                <li>2FA via authenticator app</li>
                                <li>3 signed-in devices</li>
                              </ul>

                              <div className="flex items-center justify-end gap-4">
                                <div className="mr-auto">
                                  <Drawer.Root>
                                    <Drawer.Trigger render={<Button />}>Advanced options</Drawer.Trigger>
                                    <Drawer.Portal>
                                      <Drawer.Viewport className="fixed inset-0 flex items-end justify-center">
                                        <Drawer.Popup className={popupClassName}>
                                          <div className={handleClassName} />
                                          <Drawer.Content className={contentClassName}>
                                            <Drawer.Title className="fontmedium mb-1 text-center text-base">Advanced</Drawer.Title>
                                            <Drawer.Description className="mb-6 text-center text-sm">
                                              This drawer is taller to demonstrate variable-height stacking.
                                            </Drawer.Description>

                                            <div className="mb-4 grid gap-2">
                                              <label className="text-sm font-medium" htmlFor="device-name-tw">
                                                Device name
                                              </label>
                                              <input
                                                id="device-name-tw"
                                                className="h-8 w-full border bg-background px-2 text-sm font-normal text-foreground focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring any-pointer-coarse:text-base"
                                                defaultValue="Personal laptop"
                                              />
                                            </div>

                                            <div className="mb-4 grid gap-2">
                                              <label className="text-sm font-medium" htmlFor="notes-tw">
                                                Notes
                                              </label>
                                              <textarea
                                                id="notes-tw"
                                                className="min-h-32 w-full resize-y border bg-card p-2 text-sm font-normal text-foreground focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring any-pointer-coarse:text-base"
                                                defaultValue="Rotate recovery codes and revoke older sessions."
                                                rows={3}
                                              />
                                            </div>

                                            <div className="flex justify-end">
                                              <Drawer.Close className="flex h-8 items-center justify-center gap-2 border bg-card px-3 text-sm leading-none font-normal whitespace-nowrap text-foreground select-none">
                                                Done
                                              </Drawer.Close>
                                            </div>
                                          </Drawer.Content>
                                        </Drawer.Popup>
                                      </Drawer.Viewport>
                                    </Drawer.Portal>
                                  </Drawer.Root>
                                </div>

                                <Drawer.Close className="flex h-8 items-center justify-center gap-2 border bg-card px-3 text-sm leading-none font-normal whitespace-nowrap text-foreground select-none">
                                  Close
                                </Drawer.Close>
                              </div>
                            </Drawer.Content>
                          </Drawer.Popup>
                        </Drawer.Viewport>
                      </Drawer.Portal>
                    </Drawer.Root>
                  </div>

                  <Drawer.Close className="flex h-8 items-center justify-center gap-2 border bg-card px-3 text-sm leading-none font-normal whitespace-nowrap text-foreground select-none">
                    Close
                  </Drawer.Close>
                </div>
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.VirtualKeyboardProvider>
    </Drawer.Root>
  );
}

const popupClassName =
  "[--bleed:3rem] [--peek:1rem] [--stack-progress:clamp(0,var(--drawer-swipe-progress),1)] [--stack-step:0.05] [--stack-peek-offset:max(0px,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))] [--scale-base:calc(max(0,1-(var(--nested-drawers)*var(--stack-step))))] [--scale:clamp(0,calc(var(--scale-base)+(var(--stack-step)*var(--stack-progress))),1)] [--shrink:calc(1-var(--scale))] [--height:max(0px,calc(var(--drawer-frontmost-height,var(--drawer-height))-var(--bleed)))] group/popup relative -mx-px -mb-[3rem] w-[calc(100%+2px)] max-h-[calc(80vh+3rem)] [height:var(--drawer-height,auto)] ui-popup rounded-b-none px-6 pt-4 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px)+3rem)] outline-none overflow-y-auto overscroll-contain touch-auto [transform-origin:50%_calc(100%-var(--bleed))] [transform:translateY(calc(var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--shrink)*var(--height))))_scale(var(--scale))] after:pointer-events-none after:absolute after:inset-0 after:bg-transparent after:content-[''] after:transition-[background-color] after:duration-[450ms] after:ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:select-none data-swiping:duration-0 data-nested-drawer-swiping:duration-0 data-starting-style:[transform:translateY(calc(100%-var(--bleed)+2px))] data-ending-style:[transform:translateY(calc(100%-var(--bleed)+2px))] data-ending-style:opacity-[0.9999] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-ending-style:data-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-ending-style:data-nested-drawer-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-nested-drawer-open:h-[calc(var(--height)+var(--bleed))] data-nested-drawer-open:overflow-hidden data-nested-drawer-open:after:bg-black/5 transition-[transform,box-shadow,height] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]";

const contentClassName =
  "mx-auto w-full max-w-[32rem] transition-opacity duration-[300ms] ease-[cubic-bezier(0.45,1.005,0,1.005)] group-data-nested-drawer-open/popup:opacity-0 group-data-nested-drawer-swiping/popup:opacity-100";

const handleClassName =
  "mx-auto mb-4 h-1 w-12 bg-input rounded-full transition-opacity duration-[200ms] group-data-nested-drawer-open/popup:opacity-0 group-data-nested-drawer-swiping/popup:opacity-100";
