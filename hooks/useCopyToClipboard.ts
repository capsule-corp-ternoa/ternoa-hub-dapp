import { useState } from "react";

function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState<string>();

  const isClipboardSupported = navigator?.clipboard;

  const copyToClipboard = async (text: string) => {
    if (!isClipboardSupported) {
      console.warn("Clipboard not supported");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setCopiedText(undefined);
      return false;
    }
  };

  return { copiedText, copyToClipboard, isClipboardSupported };
}

export default useCopyToClipboard;
