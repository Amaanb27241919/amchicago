import { useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { MoreHorizontal, MessageSquare } from "lucide-react";

type PreorderStatus = "pending" | "contacted" | "converted" | "cancelled";

interface PreOrder {
  id: string;
  created_at: string;
  email: string;
  name: string | null;
  phone: string | null;
  product_handle: string;
  product_title: string;
  variant_id: string;
  variant_title: string;
  quantity: number;
  price_at_order: number | null;
  status: PreorderStatus;
  notes: string | null;
}

interface PreOrderTableProps {
  preorders: PreOrder[];
  onUpdateStatus: (id: string, status: PreorderStatus) => void;
  onUpdateNotes: (id: string, notes: string) => void;
}

const statusColors: Record<PreorderStatus, string> = {
  pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  contacted: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  converted: "bg-green-500/10 text-green-600 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
};

export const PreOrderTable = ({
  preorders,
  onUpdateStatus,
  onUpdateNotes,
}: PreOrderTableProps) => {
  const [notesDialog, setNotesDialog] = useState<{ id: string; notes: string } | null>(null);
  const [editingNotes, setEditingNotes] = useState("");

  const handleOpenNotes = (preorder: PreOrder) => {
    setNotesDialog({ id: preorder.id, notes: preorder.notes || "" });
    setEditingNotes(preorder.notes || "");
  };

  const handleSaveNotes = () => {
    if (notesDialog) {
      onUpdateNotes(notesDialog.id, editingNotes);
      setNotesDialog(null);
    }
  };

  if (preorders.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-lg">
        <p className="text-muted-foreground">No pre-orders found</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Variant</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {preorders.map((preorder) => (
              <TableRow key={preorder.id}>
                <TableCell className="whitespace-nowrap">
                  {format(new Date(preorder.created_at), "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{preorder.name || "—"}</p>
                    <p className="text-sm text-muted-foreground">{preorder.email}</p>
                    {preorder.phone && (
                      <p className="text-sm text-muted-foreground">{preorder.phone}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {preorder.product_title}
                </TableCell>
                <TableCell>{preorder.variant_title}</TableCell>
                <TableCell className="text-right">{preorder.quantity}</TableCell>
                <TableCell className="text-right">
                  {preorder.price_at_order
                    ? `$${preorder.price_at_order.toFixed(2)}`
                    : "—"}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[preorder.status]}>
                    {preorder.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleOpenNotes(preorder)}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        {preorder.notes ? "Edit Notes" : "Add Notes"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onUpdateStatus(preorder.id, "pending")}
                        disabled={preorder.status === "pending"}
                      >
                        Mark as Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onUpdateStatus(preorder.id, "contacted")}
                        disabled={preorder.status === "contacted"}
                      >
                        Mark as Contacted
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onUpdateStatus(preorder.id, "converted")}
                        disabled={preorder.status === "converted"}
                      >
                        Mark as Converted
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onUpdateStatus(preorder.id, "cancelled")}
                        disabled={preorder.status === "cancelled"}
                        className="text-destructive"
                      >
                        Mark as Cancelled
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!notesDialog} onOpenChange={() => setNotesDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pre-Order Notes</DialogTitle>
          </DialogHeader>
          <Textarea
            value={editingNotes}
            onChange={(e) => setEditingNotes(e.target.value)}
            placeholder="Add notes about this pre-order..."
            className="min-h-[120px]"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setNotesDialog(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNotes}>Save Notes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
