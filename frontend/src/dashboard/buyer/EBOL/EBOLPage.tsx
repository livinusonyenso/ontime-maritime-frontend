
"use client";

import { useState } from "react";
import { FolderPlus, Upload, FolderTree } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import EbolFolderCard from "./EbolFolderCard"
import EbolFileCard from "./EbolFileCard";
import CreateFolderModal from "./modal/CreateFolderModal";
import UploadEbolModal from "./modal//UploadEbolModal";
import ViewPdfModal from "./modal//ViewPdfModal";

export type EbolFolder = {
  id: string;
  name: string;
  created: string;
};

export type EbolFileStatus = "verified" | "pending";

export type EbolFile = {
  id: string;
  bolNumber: string;
  folder: string;
  platform: string;
  status: EbolFileStatus;
  issueDate: string;
  url?: string;
};

const initialFolders: EbolFolder[] = [
  { id: "1", name: "February Shipments", created: "2025-02-01" },
  { id: "2", name: "January Shipments", created: "2025-01-04" },
];

const initialFiles: EbolFile[] = [
  {
    id: "1",
    bolNumber: "BOL-ONTM-9021",
    folder: "February Shipments",
    platform: "CargoX",
    status: "verified",
    issueDate: "2025-02-14",
    url: "https://example.com/sample-bol-9021.pdf",
  },
  {
    id: "2",
    bolNumber: "BOL-ONTM-8874",
    folder: "February Shipments",
    platform: "WAVE BL",
    status: "pending",
    issueDate: "2025-02-02",
    url: "https://example.com/sample-bol-8874.pdf",
  },
];

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

export default function BuyerEBOLPage() {
  const [folders, setFolders] = useState<EbolFolder[]>(initialFolders);
  const [files, setFiles] = useState<EbolFile[]>(initialFiles);

  const [openFolderModal, setOpenFolderModal] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);

  const [pdfToView, setPdfToView] = useState<EbolFile | null>(null);

  const handleCreateFolder = (folderName: string) => {
    const trimmed = folderName.trim();
    if (!trimmed) return;
    setFolders((prev) => [
      ...prev,
      { id: createId(), name: trimmed, created: new Date().toISOString() },
    ]);
  };

  const handleUploadEbol = (fileData: Omit<EbolFile, "id">) => {
    setFiles((prev) => [
      ...prev,
      { ...fileData, id: createId() },
    ]);
  };

  const handleRenameFolder = (id: string, newName: string) => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    setFolders((prev) =>
      prev.map((f) => (f.id === id ? { ...f, name: trimmed } : f))
    );
    // Update files that belonged to this folder
    setFiles((prev) =>
      prev.map((file) =>
        file.folder === folders.find((f) => f.id === id)?.name
          ? { ...file, folder: trimmed }
          : file
      )
    );
  };

  const handleDeleteFolder = (id: string) => {
    const folder = folders.find((f) => f.id === id);
    if (!folder) return;
    const hasFiles = files.some((file) => file.folder === folder.name);
    const confirmText = hasFiles
      ? `This folder contains linked e-BOL files. Deleting it will not delete the files, but they will lose folder association. Continue?`
      : `Delete folder "${folder.name}"?`;
    if (!window.confirm(confirmText)) return;
    setFolders((prev) => prev.filter((f) => f.id !== id));
    if (hasFiles) {
      setFiles((prev) =>
        prev.map((file) =>
          file.folder === folder.name ? { ...file, folder: "" } : file
        )
      );
    }
  };

  const handleDeleteFile = (id: string) => {
    const file = files.find((f) => f.id === id);
    if (!file) return;
    if (!window.confirm(`Delete e-BOL ${file.bolNumber}?`)) return;
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleViewPdf = (file: EbolFile) => {
    setPdfToView(file);
  };

  const handleClosePdf = () => {
    setPdfToView(null);
  };

  return (
    <div className="flex-1 px-4 py-6 md:px-6 lg:px-10 bg-muted/40">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-3">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center bg-primary/10 rounded-xl">
            <FolderTree className="h-6 w-6 text-primary" />
          </span>
          <div>
            <h1 className="text-2xl font-semibold">Digital BOL Manager</h1>
            <p className="text-sm text-muted-foreground">
              Create folders, upload electronic BOL documents, rename or delete items, and view PDF copies.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="gap-2" onClick={() => setOpenFolderModal(true)}>
            <FolderPlus className="h-4 w-4" /> New Folder
          </Button>

          <Button className="gap-2" onClick={() => setOpenUploadModal(true)}>
            <Upload className="h-4 w-4" /> Upload e-BOL
          </Button>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* FOLDERS */}
      <h2 className="text-sm font-semibold mb-2">Folders</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {folders.map((folder) => (
          <EbolFolderCard
            key={folder.id}
            folder={folder}
            onRename={handleRenameFolder}
            onDelete={handleDeleteFolder}
          />
        ))}
        {folders.length === 0 && (
          <p className="text-xs text-muted-foreground col-span-full">
            No folders yet. Click "New Folder" to create your first e-BOL folder.
          </p>
        )}
      </div>

      {/* FILES */}
      <h2 className="text-sm font-semibold mb-2">e-BOL Documents</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {files.map((file) => (
          <EbolFileCard
            key={file.id}
            file={file}
            onView={() => handleViewPdf(file)}
            onDelete={() => handleDeleteFile(file.id)}
          />
        ))}
        {files.length === 0 && (
          <p className="text-xs text-muted-foreground col-span-full">
            No e-BOL documents yet. Use "Upload e-BOL" to add your first document.
          </p>
        )}
      </div>

      {/* MODALS */}
      <CreateFolderModal
        open={openFolderModal}
        onOpenChange={setOpenFolderModal}
        onSubmit={handleCreateFolder}
      />

      <UploadEbolModal
        open={openUploadModal}
        onOpenChange={setOpenUploadModal}
        onSubmit={handleUploadEbol}
        folders={folders}
      />

      <ViewPdfModal
        open={!!pdfToView}
        onOpenChange={(open) => {
          if (!open) handleClosePdf();
        }}
        file={pdfToView}
      />
    </div>
  );
}
