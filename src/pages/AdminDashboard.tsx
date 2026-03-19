import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, AlertTriangle, FileText, TrendingUp, LogOut, Clock, BarChart3, PieChart, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RPieChart, Pie, Cell, LineChart, Line } from "recharts";
import { getReports, updateReportStatus, type Report } from "@/lib/reportStore";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";

const statusColor: Record<string, string> = {
  "Under Review": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Confirmed": "bg-red-100 text-red-800 border-red-200",
  "Dismissed": "bg-muted text-muted-foreground border-border",
  "Pending Review": "bg-blue-100 text-blue-800 border-blue-200",
};

const CATEGORY_COLORS: Record<string, string> = {
  "Scam / Fraud": "hsl(0, 84%, 60%)",
  "Phishing": "hsl(25, 95%, 53%)",
  "Impersonation": "hsl(45, 93%, 47%)",
  "Financial Fraud": "hsl(174, 58%, 39%)",
  "Romance Scam": "hsl(262, 83%, 58%)",
  "Pending Review": "hsl(215, 16%, 47%)",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const loadReports = async () => {
    try {
      const fetchedReports = await getReports();
      setReports(fetchedReports);
    } catch (error) {
      console.error("Failed to load reports:", error);
      toast.error("Failed to load reports. Please try again.");
      setReports([]); // Clear reports or keep previous state
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") !== "true") {
      navigate("/prajit07");
      return;
    }
    loadReports();
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    navigate("/prajit07");
  };

  const totalReports = reports.reduce((sum, r) => sum + (r.reportCount || 1), 0);
  const confirmedCount = reports.filter((r) => r.status === "Confirmed").length;
  const underReviewCount = reports.filter((r) => r.status === "Under Review" || r.status === "Pending Review").length;

  // Derive platform chart data
  const platformMap = new Map<string, number>();
  reports.forEach((r) => platformMap.set(r.platform, (platformMap.get(r.platform) || 0) + (r.reportCount || 1)));
  const platformData = Array.from(platformMap, ([name, reports]) => ({ name, reports })).sort((a, b) => b.reports - a.reports);

  // Derive category chart data
  const categoryMap = new Map<string, number>();
  reports.forEach((r) => categoryMap.set(r.category, (categoryMap.get(r.category) || 0) + (r.reportCount || 1)));
  const categoryData = Array.from(categoryMap, ([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] || "hsl(210, 10%, 60%)" }));

  // Derive trend data from dates
  const dateMap = new Map<string, number>();
  reports.forEach((r) => dateMap.set(r.date, (dateMap.get(r.date) || 0) + (r.reportCount || 1)));
  const trendData = Array.from(dateMap, ([date, reports]) => ({ date, reports })).sort((a, b) => a.date.localeCompare(b.date)).slice(-8);

  const filteredReports = reports.filter((report) => {
    const username = report.username || "";
    const platform = report.platform || "";
    const matchesSearch = username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         platform.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || report.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-accent" />
            <h1 className="text-lg font-bold text-foreground">NammaSpace Admin</h1>
            <Badge variant="outline" className="text-xs border-accent text-accent">Dashboard</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={loadReports} className="text-muted-foreground">
              <RefreshCw className="w-4 h-4 mr-2" /> Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Reports", value: totalReports, icon: FileText, color: "text-accent" },
            { label: "Flagged Accounts", value: reports.length, icon: AlertTriangle, color: "text-destructive" },
            { label: "Under Review", value: underReviewCount, icon: Clock, color: "text-yellow-600" },
            { label: "Confirmed Threats", value: confirmedCount, icon: TrendingUp, color: "text-red-600" },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg bg-muted flex items-center justify-center">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent" /> Reports Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                  <Tooltip />
                  <Line type="monotone" dataKey="reports" stroke="hsl(174, 58%, 39%)" strokeWidth={2} dot={{ fill: "hsl(174, 58%, 39%)" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <PieChart className="w-4 h-4 text-accent" /> By Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <RPieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" outerRadius={75} dataKey="value" label={({ name, percent }) => `${name.split(" ")[0]} ${(percent * 100).toFixed(0)}%`}>
                    {categoryData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-accent" /> Reports by Platform
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                <Tooltip />
                <Bar dataKey="reports" fill="hsl(174, 58%, 39%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Reports Table */}
        <Card>
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base">All Reports ({filteredReports.length})</CardTitle>
              <CardDescription>Community-reported accounts — newest first</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input 
                placeholder="Search username/platform..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64"
              />
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="All">All Categories</option>
                <option value="Scam / Fraud">Scam / Fraud</option>
                <option value="Harassment">Harassment</option>
                <option value="Phishing">Phishing</option>
                <option value="Impersonation">Impersonation</option>
                <option value="Spam">Spam</option>
                <option value="Cyberbullying">Cyberbullying</option>
                <option value="Financial Fraud">Financial Fraud</option>
                <option value="Romance Scam">Romance Scam</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Reports</TableHead>
                  <TableHead>Evidence</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium text-foreground">{report.username}</TableCell>
                    <TableCell>{report.platform}</TableCell>
                    <TableCell>{report.category}</TableCell>
                    <TableCell className="font-semibold">{report.reportCount}</TableCell>
                    <TableCell>
                      {report.evidence_urls && report.evidence_urls.length > 0 ? (
                        <div className="flex flex-col gap-1">
                          {report.evidence_urls.map((url, i) => (
                            <a
                              key={i}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-500 hover:underline flex items-center gap-1"
                            >
                              <FileText className="w-3 h-3" /> File {i + 1}
                            </a>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground italic">None</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColor[report.status] || statusColor["Under Review"]}`}>
                        {report.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{report.date}</TableCell>
                    <TableCell className="text-right">
                      {report.status !== "Confirmed" && report.status !== "Dismissed" ? (
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={async () => {
                              await updateReportStatus(report.id, "Confirmed");
                              await loadReports();
                              toast.success(`${report.username} confirmed — now visible on homepage`);
                            }}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" /> Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 px-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            onClick={async () => {
                              await updateReportStatus(report.id, "Dismissed");
                              await loadReports();
                              toast.info(`${report.username} dismissed`);
                            }}
                          >
                            <XCircle className="w-4 h-4 mr-1" /> Dismiss
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground italic">{report.status}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
