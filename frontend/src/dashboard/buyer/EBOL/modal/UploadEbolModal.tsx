
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import type { EbolFolder, EbolFile, EbolFileStatus } from "../EBOLPage";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (file: Omit<EbolFile, "id">) => void;
  folders: EbolFolder[];
}

const platforms = ["CargoX", "WAVE BL", "TradeLens"];
const defaultStatus: EbolFileStatus = "pending";

export default function UploadEbolModal({
  open,
  onOpenChange,
  onSubmit,
  folders,
}: Props) {
  const [bolNumber, setBolNumber] = useState("");
  const [folder, setFolder] = useState("");
  const [platform, setPlatform] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!open) {
      setBolNumber("");
      setFolder("");
      setPlatform("");
      setIssueDate("");
      setUrl("");
    }
  }, [open]);

  const handleUpload = () => {
    if (!bolNumber.trim() || !folder || !platform || !issueDate) return;
    onSubmit({
      bolNumber: bolNumber.trim(),
      folder,
      platform,
      issueDate,
      status: defaultStatus,
      url: url || undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload e-BOL</DialogTitle>
          <DialogDescription>
            Register a new electronic Bill of Lading. You can optionally attach a PDF URL for quick preview.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Input
            placeholder="BOL Number"
            value={bolNumber}
            onChange={(e) => setBolNumber(e.target.value)}
          />

          <Select value={folder} onValueChange={setFolder}>
            <SelectTrigger>
              <SelectValue placeholder="Select folder" />
            </SelectTrigger>
            <SelectContent>
              {folders.map((f) => (
                <SelectItem key={f.id} value={f.name}>
                  {f.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger>
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              {platforms.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
          />

          <Input
            placeholder="PDF URL (optional)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <Button className="w-full" onClick={handleUpload}>
            Save e-BOL
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
