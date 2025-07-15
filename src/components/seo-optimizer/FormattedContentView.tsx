"use client";

import { useState } from 'react';
import { Eye, Code, FileText } from 'lucide-react';
import CopyToClipboard from './CopyToClipboard';

interface FormattedContentViewProps {
  title: string;
  content: string;
  className?: string;
}

export default function FormattedContentView({
  title,
  content,
  className = ""
}: FormattedContentViewProps) {
  const [viewMode, setViewMode] = useState<'formatted' | 'raw' | 'html'>('formatted');

  // Check if content contains HTML tags
  const hasHtmlTags = /<[^>]*>/.test(content);

  // Function to parse HTML content and extract readable text
  const parseHtmlContent = (htmlContent: string) => {
    if (!hasHtmlTags) {
      return htmlContent; // Return as-is if no HTML tags
    }
    // Remove HTML tags and decode entities
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  // Function to format HTML with syntax highlighting
  const formatHtmlWithHighlighting = (html: string) => {
    let contentToHighlight = html;

    if (!hasHtmlTags) {
      // Convert plain text to HTML format for highlighting
      contentToHighlight = convertPlainTextToHtml(html);
    }

    return contentToHighlight
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/&lt;(\/?)(h1|h2|h3|h4|h5|h6|p|div|span|strong|em|b|i|ul|ol|li|a|br|hr)([^&]*?)&gt;/g,
        '<span class="text-blue-600 dark:text-blue-400">&lt;$1$2$3&gt;</span>')
      .replace(/&lt;(\/?)([^&]*?)&gt;/g,
        '<span class="text-gray-600 dark:text-gray-400">&lt;$1$2&gt;</span>')
      .replace(/\n/g, '<br>');
  };

  // Function to convert plain text to HTML format
  const convertPlainTextToHtml = (plainText: string) => {
    // Split content into paragraphs
    const paragraphs = plainText.split('\n\n').filter(p => p.trim());

    return paragraphs.map((paragraph, index) => {
      const trimmedParagraph = paragraph.trim();

      // Check if this looks like a title (first paragraph, shorter, ends without period)
      if (index === 0 && trimmedParagraph.length < 100 && !trimmedParagraph.endsWith('.')) {
        return `<h1>${trimmedParagraph}</h1>`;
      }

      // Check if this looks like a subtitle (shorter paragraphs that might be headings)
      if (trimmedParagraph.length < 80 && !trimmedParagraph.endsWith('.') && !trimmedParagraph.endsWith('!') && !trimmedParagraph.endsWith('?')) {
        return `<h2>${trimmedParagraph}</h2>`;
      }

      // Regular paragraph
      return `<p>${trimmedParagraph}</p>`;
    }).join('\n\n');
  };

  // Function to create formatted view with proper spacing
  const createFormattedView = (contentToFormat: string) => {
    if (!hasHtmlTags) {
      // Convert plain text to HTML format for better display
      const htmlContent = convertPlainTextToHtml(contentToFormat);
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;

      const elements = Array.from(tempDiv.children);
      const formattedElements: string[] = [];

      elements.forEach((element) => {
        const tagName = element.tagName.toLowerCase();
        const textContent = element.textContent?.trim() || '';

        if (textContent) {
          let formattedText = '';

          switch (tagName) {
            case 'h1':
              formattedText = `<div class="text-2xl font-bold text-gray-900 dark:text-white mb-4">${textContent}</div>`;
              break;
            case 'h2':
              formattedText = `<div class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">${textContent}</div>`;
              break;
            case 'h3':
              formattedText = `<div class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">${textContent}</div>`;
              break;
            case 'p':
              formattedText = `<div class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">${textContent}</div>`;
              break;
            case 'ul':
            case 'ol':
              const listItems = Array.from(element.children).map(li =>
                `<li class="text-gray-700 dark:text-gray-300 mb-1 ml-4">${li.textContent?.trim()}</li>`
              ).join('');
              formattedText = `<div class="mb-4"><ul class="list-disc space-y-1">${listItems}</ul></div>`;
              break;
            default:
              formattedText = `<div class="text-gray-700 dark:text-gray-300 mb-2">${textContent}</div>`;
          }

          formattedElements.push(formattedText);
        }
      });

      return formattedElements.join('');
    }

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = contentToFormat;

    const elements = Array.from(tempDiv.children);
    const formattedElements: string[] = [];

    elements.forEach((element) => {
      const tagName = element.tagName.toLowerCase();
      const textContent = element.textContent?.trim() || '';

      if (textContent) {
        let formattedText = '';

        switch (tagName) {
          case 'h1':
            formattedText = `<div class="text-2xl font-bold text-gray-900 dark:text-white mb-4">${textContent}</div>`;
            break;
          case 'h2':
            formattedText = `<div class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">${textContent}</div>`;
            break;
          case 'h3':
            formattedText = `<div class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">${textContent}</div>`;
            break;
          case 'p':
            formattedText = `<div class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">${textContent}</div>`;
            break;
          case 'ul':
          case 'ol':
            const listItems = Array.from(element.children).map(li =>
              `<li class="text-gray-700 dark:text-gray-300 mb-1 ml-4">${li.textContent?.trim()}</li>`
            ).join('');
            formattedText = `<div class="mb-4"><ul class="list-disc space-y-1">${listItems}</ul></div>`;
            break;
          default:
            formattedText = `<div class="text-gray-700 dark:text-gray-300 mb-2">${textContent}</div>`;
        }

        formattedElements.push(formattedText);
      }
    });

    return formattedElements.join('');
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              Content Preview
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {hasHtmlTags ? 'HTML Content' : 'Plain Text Content'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-2">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('formatted')}
                className={`flex items-center justify-center space-x-1 px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors ${viewMode === 'formatted'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Formatted</span>
                <span className="sm:hidden">Format</span>
              </button>
              <button
                onClick={() => setViewMode('raw')}
                className={`flex items-center justify-center space-x-1 px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors ${viewMode === 'raw'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Plain Text</span>
                <span className="sm:hidden">Text</span>
              </button>
              <button
                onClick={() => setViewMode('html')}
                className={`flex items-center justify-center space-x-1 px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors ${viewMode === 'html'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                <Code className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>HTML</span>
              </button>
            </div>

            {/* Copy Button */}
            <CopyToClipboard
              text={
                viewMode === 'formatted'
                  ? parseHtmlContent(content)
                  : viewMode === 'html'
                    ? (hasHtmlTags ? content : convertPlainTextToHtml(content))
                    : content
              }
              label="Copy"
              variant="button"
            />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-6">
        {viewMode === 'formatted' && (
          <div className="space-y-4">
            {/* Title */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {title}
              </h1>
            </div>

            {/* Formatted Content */}
            <div
              className="prose prose-gray dark:prose-invert max-w-none prose-sm sm:prose-base"
              dangerouslySetInnerHTML={{
                __html: createFormattedView(content)
              }}
            />
          </div>
        )}

        {viewMode === 'raw' && (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 sm:p-4">
            <pre className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono">
              {parseHtmlContent(content)}
            </pre>
          </div>
        )}

        {viewMode === 'html' && (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 sm:p-4">
            <pre
              className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono"
              dangerouslySetInnerHTML={{
                __html: formatHtmlWithHighlighting(content)
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
} 