
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

import type { EbolFile } from "../BuyerEBOLPage";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: EbolFile | null;
}

export default function ViewPdfModal({ open, onOpenChange, file }: Props) {
  if (!file) {
    return null;
  }

  const hasUrl = !!file.url;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>View e-BOL PDF</DialogTitle>
          <DialogDescription>
            {file.bolNumber} · {file.platform} {file.folder ? `· ${file.folder}` : ""}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          {hasUrl ? (
            <div className="border rounded-md overflow-hidden h-[60vh] bg-muted">
              <iframe
                src={file.url}
                title={file.bolNumber}
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No PDF URL is attached to this e-BOL record yet. Edit or re-upload the document to
              link a PDF location.
            </p>
          )}

          {hasUrl && (
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => {
                  if (file.url) {
                    window.open(file.url, "_blank", "noopener,noreferrer");
                  }
                }}
              >
                Open in new tab
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
