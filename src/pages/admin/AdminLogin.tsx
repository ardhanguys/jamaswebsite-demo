import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Lock, Mail, AlertCircle } from "lucide-react";
import { login, isAuthenticated } from "@/lib/auth";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    isAuthenticated().then((auth) => {
      if (auth) navigate("/admin/dashboard");
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const success = await login(email, password);
    if (success) {
      navigate("/admin/dashboard");
    } else {
      setError("Email atau password salah");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Login Admin - JAMAS</title>
      </Helmet>
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src="/logo-jamas.png" alt="JAMAS Logo" className="w-20 h-20 object-contain mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-primary">JAMAS Admin</h1>
            <p className="text-muted-foreground mt-2">Masuk untuk mengelola konten</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-background rounded-2xl shadow-elegant p-8">
            {error && (
              <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-lg mb-6">
                <AlertCircle size={18} />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-cream border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    placeholder="Masukkan email"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-cream border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    placeholder="Masukkan password"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sedang masuk..." : "Masuk"}
            </button>
          </form>

          <p className="text-center mt-6">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              ← Kembali ke Website
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
