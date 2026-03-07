import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  LogOut,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  UserCheck,
  UserX,
  RefreshCw,
  Mail,
  Download,
} from "lucide-react";
import { User } from "@supabase/supabase-js";
import { verifyAdminRole, withAdminCheck } from "@/lib/admin-auth";

type Registration = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  reg_number: string;
  year_of_study: string;
  course: string;
  school: string;
  career_interests: string | null;
  status: string;
  created_at: string;
};

type NewsletterSubscription = {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
};

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          navigate("/admin/auth");
        } else {
          setTimeout(() => checkAdminRole(session.user.id), 0);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/admin/auth");
      } else {
        checkAdminRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminRole = async (userId: string) => {
    const isAdmin = await verifyAdminRole(user);
    
    if (!isAdmin) {
      console.warn("User is not an admin");
      setIsAdmin(false);
      setIsLoading(false);
      navigate("/admin/auth");
      return;
    }

    setIsAdmin(true);
    await Promise.all([fetchRegistrations(), fetchSubscriptions()]);
  };

  const fetchRegistrations = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("member_registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch registrations.",
        variant: "destructive",
      });
    } else {
      setRegistrations(data || []);
    }
    setIsLoading(false);
  };

  const fetchSubscriptions = async () => {
    const { data, error } = await supabase
      .from("newsletter_subscriptions")
      .select("*")
      .order("subscribed_at", { ascending: false });

    if (error) {
      console.error("Error fetching subscriptions:", error);
    } else {
      setSubscriptions(data || []);
    }
  };

  const exportSubscriptions = () => {
    const activeEmails = subscriptions
      .filter((s) => s.is_active)
      .map((s) => s.email)
      .join("\n");
    
    const blob = new Blob([activeEmails], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Exported",
      description: `${subscriptions.filter((s) => s.is_active).length} emails exported.`,
    });
  };

  const updateStatus = async (id: string, status: string) => {
    setIsUpdating(id);
    const { error } = await supabase
      .from("member_registrations")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update status.",
        variant: "destructive",
      });
    } else {
      setRegistrations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
      toast({
        title: "Status Updated",
        description: `Registration marked as ${status}.`,
      });
    }
    setIsUpdating(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/auth");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-secondary text-secondary-foreground">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const stats = {
    total: registrations.length,
    pending: registrations.filter((r) => r.status === "pending").length,
    approved: registrations.filter((r) => r.status === "approved").length,
    rejected: registrations.filter((r) => r.status === "rejected").length,
  };

  if (isAdmin === false) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <Card className="p-8 max-w-md mx-4 text-center">
          <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-heading font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-6">
            You don't have admin privileges. Please contact an existing admin to grant you access.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Logged in as: {user?.email}
            </p>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (isLoading || isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage member registrations</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={fetchRegistrations}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <UserCheck className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.approved}</p>
                <p className="text-xs text-muted-foreground">Approved</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <UserX className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.rejected}</p>
                <p className="text-xs text-muted-foreground">Rejected</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Registrations Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Reg Number</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      No registrations yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  registrations.map((reg) => (
                    <TableRow key={reg.id}>
                      <TableCell className="font-medium">
                        {reg.first_name} {reg.last_name}
                      </TableCell>
                      <TableCell>{reg.email}</TableCell>
                      <TableCell>{reg.phone}</TableCell>
                      <TableCell>{reg.reg_number}</TableCell>
                      <TableCell className="max-w-[150px] truncate">
                        {reg.course}
                      </TableCell>
                      <TableCell>{reg.year_of_study}</TableCell>
                      <TableCell>{getStatusBadge(reg.status)}</TableCell>
                      <TableCell>
                        {new Date(reg.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-secondary hover:text-secondary"
                            onClick={() => updateStatus(reg.id, "approved")}
                            disabled={isUpdating === reg.id || reg.status === "approved"}
                          >
                            {isUpdating === reg.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <CheckCircle className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            onClick={() => updateStatus(reg.id, "rejected")}
                            disabled={isUpdating === reg.id || reg.status === "rejected"}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
        {/* Newsletter Subscriptions */}
        <Card className="mt-8 overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-heading font-semibold">Newsletter Subscriptions</h2>
                <p className="text-sm text-muted-foreground">
                  {subscriptions.filter((s) => s.is_active).length} active subscribers
                </p>
              </div>
            </div>
            <Button
              size="sm"
              onClick={exportSubscriptions}
              disabled={subscriptions.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Export Emails
            </Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Subscribed On</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                      No subscribers yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  subscriptions.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">{sub.email}</TableCell>
                      <TableCell>
                        {new Date(sub.subscribed_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={sub.is_active ? "bg-secondary text-secondary-foreground" : ""} variant={sub.is_active ? "default" : "outline"}>
                          {sub.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
