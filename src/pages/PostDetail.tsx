import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPostById, Post, getCategoryLabel, getCategoryColor } from "@/lib/posts";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      const foundPost = getPostById(id);
      if (foundPost) {
        setPost(foundPost);
      } else {
        navigate("/blog");
      }
    }
  }, [id, navigate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Memuat...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - JAMAS</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <article className="container-custom max-w-4xl">
            {/* Back Button */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft size={18} />
              Kembali ke Semua Postingan
            </Link>

            {/* Hero Image */}
            {post.thumbnail ? (
              <div className="aspect-video rounded-2xl overflow-hidden mb-8 shadow-elegant">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video rounded-2xl overflow-hidden mb-8 shadow-elegant bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-9xl font-bold text-primary/20">
                  {post.title.charAt(0)}
                </span>
              </div>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                {getCategoryLabel(post.category)}
              </span>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar size={16} />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-8 leading-tight">
              {post.title}
            </h1>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none prose-headings:text-primary prose-headings:font-semibold prose-p:text-muted-foreground prose-a:text-accent hover:prose-a:text-primary prose-strong:text-foreground prose-ul:text-muted-foreground prose-li:marker:text-accent"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-border">
              <Link
                to="/blog"
                className="btn-primary inline-flex items-center gap-2"
              >
                <ArrowLeft size={18} />
                Kembali ke Semua Postingan
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PostDetail;
