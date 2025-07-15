"use client";

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyToClipboardProps {
  text: string;
  label?: string;
  className?: string;
  variant?: 'button' | 'icon';
}

export default function CopyToClipboard({
  text,
  label = "Copy",
  className = "",
  variant = "button"
}: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleCopy}
        className={`p-2 rounded-lg transition-colors ${copied
          ? 'bg-green-100 text-green-600 hover:bg-green-200'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          } ${className}`}
        title={copied ? 'Copied!' : 'Copy to clipboard'}
        aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm ${copied
        ? 'bg-green-100 text-green-700 hover:bg-green-200'
        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
        } ${className}`}
      disabled={copied}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      <span>{copied ? 'Copied!' : label}</span>
    </button>
  );
} 