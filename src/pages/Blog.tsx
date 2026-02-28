import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import { getPosts, Post } from "@/lib/posts";

const categories = [
  { value: "all", label: "Semua Postingan" },
  { value: "ilmu", label: "Ilmu & Kajian" },
  { value: "kegiatan", label: "Kegiatan" },
  { value: "pengumuman", label: "Pengumuman" }
];

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
    getPosts().then((allPosts) => {
      setPosts(allPosts);
      setFilteredPosts(allPosts);
    });
  }, []);

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.category === activeCategory));
    }
  }, [activeCategory, posts]);

  return (
    <>
      <Helmet>
        <title>Dakwah & Kegiatan - JAMAS</title>
        <meta name="description" content="Jelajahi artikel Islam, konten dakwah, dan update kegiatan dari JAMAS." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block px-4 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium mb-4">
                Dakwah & Kegiatan
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Semua Postingan</h1>
              <p className="text-lg text-muted-foreground">Jelajahi koleksi artikel Islam, konten dakwah, dan update kegiatan kami.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map(category => (
                <button
                  key={category.value}
                  onClick={() => setActiveCategory(category.value)}
                  className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category.value
                      ? "bg-primary text-primary-foreground shadow-elegant"
                      : "bg-cream text-foreground hover:bg-primary/10"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <div key={post.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">Tidak ada postingan ditemukan dalam kategori ini.</p>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Blog;
