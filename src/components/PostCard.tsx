import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { Post, getCategoryLabel, getCategoryColor } from "@/lib/posts";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <article className="card-elegant group">
      {/* Thumbnail */}
      <div className="aspect-video bg-primary/10 relative overflow-hidden">
        {post.thumbnail ? (
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
            <span className="text-6xl font-bold text-primary/20">
              {post.title.charAt(0)}
            </span>
          </div>
        )}
        {/* Category Badge */}
        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
          {getCategoryLabel(post.category)}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar size={14} />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <h3 className="text-xl font-semibold text-primary mb-3 line-clamp-2 group-hover:text-accent transition-colors">
          {post.title}
        </h3>
        <p className="text-muted-foreground line-clamp-3 mb-4">
          {post.excerpt}
        </p>
        <Link
          to={`/post/${post.id}`}
          className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors group/link"
        >
          Baca Selengkapnya
          <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};

export default PostCard;
