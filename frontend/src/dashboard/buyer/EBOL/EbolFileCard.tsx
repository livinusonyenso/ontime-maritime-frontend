
import { FileText, CheckCircle2, AlertTriangle, ExternalLink, Trash2, Eye } from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import type { EbolFile } from "./EBOLPage";

interface Props {
  file: EbolFile;
  onView: () => void;
  onDelete: () => void;
}

export default function EbolFileCard({ file, onView, onDelete }: Props) {
  const isVerified = file.status === "verified";

  return (
    <Card className="border-0 shadow-sm bg-background hover:shadow-md transition">
      <CardHeader className="flex justify-between items-start pb-3">
        <div>
          <CardTitle className="text-base">{file.bolNumber}</CardTitle>
          <CardDescription className="text-xs">
            {file.platform} {file.folder ? `· ${file.folder}` : ""}
          </CardDescription>
        </div>

        <div className="h-10 w-10 flex items-center justify-center bg-primary/10 rounded-lg">
          <FileText className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          {isVerified ? (
            <span className="flex items-center text-emerald-700 bg-emerald-100 text-xs px-2 py-0.5 rounded-md gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> Verified
            </span>
          ) : (
            <span className="flex items-center text-amber-700 bg-amber-100 text-xs px-2 py-0.5 rounded-md gap-1">
              <AlertTriangle className="h-3.5 w-3.5" /> Pending
            </span>
          )}
        </div>

        <p className="text-xs text-muted-foreground">Issued: {file.issueDate}</p>

        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-1 col-span-2"
            onClick={onView}
            disabled={!file.url}
          >
            <Eye className="h-4 w-4" />
            View PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-1 text-red-600"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>

        <Button variant="ghost" size="sm" className="w-full gap-1 text-xs justify-start">
          <ExternalLink className="h-3.5 w-3.5" />
          Verify on blockchain
        </Button>
      </CardContent>
    </Card>
  );
}
