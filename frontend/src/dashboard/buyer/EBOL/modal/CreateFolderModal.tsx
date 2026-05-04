
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string) => void;
}

export default function CreateFolderModal({ open, onOpenChange, onSubmit }: Props) {
  const [folderName, setFolderName] = useState("");

  useEffect(() => {
    if (!open) {
      setFolderName("");
    }
  }, [open]);

  const handleCreate = () => {
    if (!folderName.trim()) return;
    onSubmit(folderName.trim());
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new folder</DialogTitle>
          <DialogDescription>
            Use folders to group e-BOL documents by month, client, vessel, or contract.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Input
            placeholder="Folder name (e.g. Q1 2025 Cargo, Client X Shipments)"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />

          <Button className="w-full" onClick={handleCreate}>
            Create folder
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
