
import { useState } from "react";
import { Folder, Calendar, MoreVertical, Edit2, Trash2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import type { EbolFolder } from "../BuyerEBOLPage";

interface Props {
  folder: EbolFolder;
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
}

export default function EbolFolderCard({ folder, onRename, onDelete }: Props) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [nameDraft, setNameDraft] = useState(folder.name);

  const handleRenameSubmit = () => {
    if (!nameDraft.trim()) return;
    onRename(folder.id, nameDraft);
    setIsRenaming(false);
  };

  return (
    <Card className="hover:shadow-md transition bg-background">
      <CardHeader className="flex flex-row items-start justify-between gap-2 pb-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center bg-primary/10 rounded-lg">
            <Folder className="h-5 w-5 text-primary" />
          </div>
          <div>
            {isRenaming ? (
              <input
                className="text-sm font-semibold border rounded px-1 py-0.5 w-full bg-background"
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                onBlur={handleRenameSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRenameSubmit();
                  if (e.key === "Escape") {
                    setNameDraft(folder.name);
                    setIsRenaming(false);
                  }
                }}
                autoFocus
              />
            ) : (
              <CardTitle className="text-base">{folder.name}</CardTitle>
            )}
            <CardDescription className="text-xs flex items-center gap-1 mt-1">
              <Calendar className="h-3 w-3" />
              Created: {folder.created?.slice(0, 10)}
            </CardDescription>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <MoreVertical className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-xs">
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => {
                setIsRenaming(true);
                setNameDraft(folder.name);
              }}
            >
              <Edit2 className="h-3 w-3" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 text-red-600"
              onClick={() => onDelete(folder.id)}
            >
              <Trash2 className="h-3 w-3" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-[11px] text-muted-foreground">
          Organize e-BOL documents by month, vessel, or contract as needed.
        </p>
      </CardContent>
    </Card>
  );
}
