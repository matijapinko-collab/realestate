"use client";

import { Button } from "@/components/ui/Button";

/**
 * Opens the browser's print dialogue, which also saves a PDF.
 *
 * No "download PDF" is offered because no PDF file exists; promising one
 * that is not there is exactly the kind of small lie this site avoids.
 * The button is hidden when the page is actually printing.
 */
export function PrintButton() {
  return (
    <Button
      type="button"
      className="cv-print-hide mt-7"
      onClick={() => window.print()}
    >
      Ispišite ili spremite kao PDF
    </Button>
  );
}
