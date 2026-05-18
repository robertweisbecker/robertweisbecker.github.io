/**
 * @see https://coss.com/ui/docs/hooks/use-copy-to-clipboard
 */

"use client";

import * as React from "react";

export function useCopyToClipboard({
  timeout = 2000,
  onCopy,
}: {
  timeout?: number;
  onCopy?: () => void;
} = {}): { copyToClipboard: (value: string) => Promise<boolean>; isCopied: boolean } {
  const [isCopied, setIsCopied] = React.useState(false);
  const timeoutIdRef = React.useRef<NodeJS.Timeout | null>(null);

  const copyToClipboard = async (value: string): Promise<boolean> => {
    if (typeof window === "undefined" || !navigator.clipboard.writeText) {
      return false;
    }

    if (!value) {
      return false;
    }

    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      console.error(error);
      return false;
    }

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    setIsCopied(true);

    if (onCopy) {
      onCopy();
    }

    if (timeout !== 0) {
      timeoutIdRef.current = setTimeout(() => {
        setIsCopied(false);
        timeoutIdRef.current = null;
      }, timeout);
    }

    return true;
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return (): void => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  return { copyToClipboard, isCopied };
}
