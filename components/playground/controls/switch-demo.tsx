"use client";

import { AnimatePresence, motion } from "motion/react";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import * as React from "react";

export function SwitchDemo() {
  const [checked, setChecked] = React.useState(false);

  return (
    <Field orientation="horizontal" className="flex w-auto items-center gap-3">
      <FieldLabel>
        <Switch checked={checked} onCheckedChange={setChecked} />
        <FieldContent orientation="horizontal">
          <FieldTitle>Switch</FieldTitle>
          <FieldDescription>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={checked ? "onText" : "offText"}
                className="inline-block min-w-20"
                initial={{ opacity: 0, filter: "blur(2px)", x: checked ? "-25%" : "25%" }}
                animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                exit={{ opacity: 0, filter: "blur(4px)", x: checked ? "-25%" : "25%" }}
                transition={{ duration: 0.2 }}
                style={{ color: checked ? "var(--foreground)" : "var(--muted-foreground)" }}
              >
                {checked ? "On" : "Off"}
              </motion.span>
            </AnimatePresence>
          </FieldDescription>
        </FieldContent>
      </FieldLabel>
    </Field>
  );
}
