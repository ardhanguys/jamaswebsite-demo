import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FileText, FolderOpen, LogOut, Settings, Plus } from "lucide-react";
import { isAuthenticated, logout } from "@/lib/auth";
import { getPosts } from "@/lib/posts";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalPosts: 0,
    categories: {
      study: 0,
      dakwah: 0,
      activity: 0
    }
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/admin/login");
      return;
    }

    const posts = getPosts();
    const categoryCount = {
      study: posts.filter(p => p.category === "study").length,
      dakwah: posts.filter(p => p.category === "dakwah").length,
      activity: posts.filter(p => p.category === "activity").length
    };

    setStats({
      totalPosts: posts.length,
      categories: categoryCount
    });
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - JAMAS Admin</title>
      </Helmet>
      <div className="min-h-screen bg-cream">
        {/* Header */}
        <header className="bg-primary text-primary-foreground shadow-elegant">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo-jamas.png" alt="JAMAS Logo" className="w-10 h-10 object-contain" />
              <span className="font-bold text-xl">JAMAS Admin</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Selamat datang kembali! Berikut ringkasan konten Anda.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-background rounded-xl p-6 shadow-elegant">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="text-primary" size={24} />
                </div>
              </div>
              <p className="text-3xl font-bold text-primary">{stats.totalPosts}</p>
              <p className="text-muted-foreground">Total Postingan</p>
            </div>

            <div className="bg-background rounded-xl p-6 shadow-elegant">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <FolderOpen className="text-accent" size={24} />
                </div>
              </div>
              <p className="text-3xl font-bold text-primary">3</p>
              <p className="text-muted-foreground">Kategori</p>
            </div>

            <div className="bg-background rounded-xl p-6 shadow-elegant">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-green-light/20 flex items-center justify-center">
                  <span className="text-green-light font-bold">{stats.categories.study}</span>
                </div>
              </div>
              <p className="text-lg font-semibold text-primary">Kajian Islam</p>
              <p className="text-muted-foreground">Postingan</p>
            </div>

            <div className="bg-background rounded-xl p-6 shadow-elegant">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <span className="text-accent font-bold">{stats.categories.dakwah}</span>
                </div>
              </div>
              <p className="text-lg font-semibold text-primary">Dakwah</p>
              <p className="text-muted-foreground">Postingan</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-background rounded-xl p-6 shadow-elegant">
            <h2 className="text-xl font-semibold text-primary mb-6">Aksi Cepat</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/admin/posts"
                className="flex items-center gap-4 p-4 bg-cream rounded-lg hover:bg-primary hover:text-primary-foreground transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                  <Settings className="text-primary group-hover:text-primary-foreground" size={20} />
                </div>
                <div>
                  <p className="font-semibold">Kelola Postingan</p>
                  <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/80">Lihat, edit, dan hapus postingan</p>
                </div>
              </Link>

              <Link
                to="/admin/posts?action=new"
                className="flex items-center gap-4 p-4 bg-cream rounded-lg hover:bg-accent hover:text-accent-foreground transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/20 group-hover:bg-accent-foreground/20 flex items-center justify-center transition-colors">
                  <Plus className="text-accent group-hover:text-accent-foreground" size={20} />
                </div>
                <div>
                  <p className="font-semibold">Buat Postingan Baru</p>
                  <p className="text-sm text-muted-foreground group-hover:text-accent-foreground/80">Tulis artikel baru</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Back to Website Link */}
          <div className="mt-8 text-center">
            <a
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              ← Lihat Website
            </a>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
