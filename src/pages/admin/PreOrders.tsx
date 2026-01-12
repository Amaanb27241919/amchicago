import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { PreOrderStats } from "@/components/admin/PreOrderStats";
import { PreOrderTable } from "@/components/admin/PreOrderTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Download, Search, Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { usePageMeta } from "@/hooks/usePageMeta";

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

const ADMIN_PASSWORD = "aspire2025"; // Simple password protection

const PreOrders = () => {
  usePageMeta({
    title: "Pre-Orders Dashboard | Aspire Manifest",
    description: "Manage and track pre-orders",
  });

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [preorders, setPreorders] = useState<PreOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Check session storage for authentication
  useEffect(() => {
    const isAuth = sessionStorage.getItem("admin_authenticated") === "true";
    setIsAuthenticated(isAuth);
    if (isAuth) {
      fetchPreorders();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchPreorders = async () => {
    setIsLoading(true);
    try {
      // Using service role key via edge function for admin access
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-preorders`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch pre-orders");
      }

      const data = await response.json();
      setPreorders(data.preorders || []);
    } catch (error) {
      console.error("Error fetching preorders:", error);
      toast.error("Failed to load pre-orders");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_authenticated", "true");
      setIsAuthenticated(true);
      fetchPreorders();
    } else {
      toast.error("Invalid password");
    }
  };

  const handleUpdateStatus = async (id: string, status: PreorderStatus) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-preorders`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, status }),
        }
      );

      if (!response.ok) throw new Error("Failed to update status");

      setPreorders((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status } : p))
      );
      toast.success("Status updated");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleUpdateNotes = async (id: string, notes: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-preorders`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, notes }),
        }
      );

      if (!response.ok) throw new Error("Failed to update notes");

      setPreorders((prev) =>
        prev.map((p) => (p.id === id ? { ...p, notes } : p))
      );
      toast.success("Notes updated");
    } catch (error) {
      console.error("Error updating notes:", error);
      toast.error("Failed to update notes");
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "Date",
      "Email",
      "Name",
      "Phone",
      "Product",
      "Variant",
      "Quantity",
      "Price",
      "Status",
      "Notes",
    ];

    const rows = filteredPreorders.map((p) => [
      new Date(p.created_at).toLocaleDateString(),
      p.email,
      p.name || "",
      p.phone || "",
      p.product_title,
      p.variant_title,
      p.quantity.toString(),
      p.price_at_order?.toFixed(2) || "",
      p.status,
      p.notes || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `preorders-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredPreorders = useMemo(() => {
    return preorders.filter((p) => {
      const matchesSearch =
        searchQuery === "" ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.product_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.name && p.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        statusFilter === "all" || p.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [preorders, searchQuery, statusFilter]);

  const stats = useMemo(() => {
    const totalPreorders = preorders.length;
    const potentialRevenue = preorders.reduce(
      (sum, p) => sum + (p.price_at_order || 0) * p.quantity,
      0
    );
    const pendingCount = preorders.filter((p) => p.status === "pending").length;

    const productCounts = preorders.reduce((acc, p) => {
      acc[p.product_title] = (acc[p.product_title] || 0) + p.quantity;
      return acc;
    }, {} as Record<string, number>);

    const topProducts = Object.entries(productCounts)
      .map(([title, count]) => ({ title, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return { totalPreorders, potentialRevenue, pendingCount, topProducts };
  }, [preorders]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Access</h1>
            <p className="text-muted-foreground mt-2">
              Enter password to view pre-orders
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12"
            />
            <Button type="submit" className="w-full h-12">
              Access Dashboard
            </Button>
          </form>
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="w-full mt-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Store
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Pre-Orders</h1>
              <p className="text-muted-foreground">
                Track demand and manage inventory
              </p>
            </div>
          </div>
          <Button onClick={handleExportCSV} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-8">
              <PreOrderStats {...stats} />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by email, name, or product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <PreOrderTable
              preorders={filteredPreorders}
              onUpdateStatus={handleUpdateStatus}
              onUpdateNotes={handleUpdateNotes}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PreOrders;
