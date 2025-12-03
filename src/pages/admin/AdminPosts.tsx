import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Plus, Edit2, Trash2, ArrowLeft, X, Upload, Save, LogOut } from "lucide-react";
import { isAuthenticated, logout } from "@/lib/auth";
import { getPosts, addPost, updatePost, deletePost, Post, getCategoryLabel } from "@/lib/posts";
import { toast } from "@/hooks/use-toast";

const AdminPosts = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/admin/login");
      return;
    }

    loadPosts();

    if (searchParams.get("action") === "new") {
      handleNewPost();
    }
  }, [navigate, searchParams]);

  const loadPosts = () => {
    const allPosts = getPosts().sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setPosts(allPosts);
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handleNewPost = () => {
    setEditingPost({
      title: "",
      content: "",
      excerpt: "",
      thumbnail: "",
      category: "study",
      date: new Date().toISOString().split("T")[0]
    });
    setIsEditing(true);
  };

  const handleEditPost = (post: Post) => {
    setEditingPost({ ...post });
    setIsEditing(true);
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(id);
      loadPosts();
      toast({
        title: "Post deleted",
        description: "The post has been successfully deleted."
      });
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingPost(prev => ({
          ...prev,
          thumbnail: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePost = () => {
    if (!editingPost?.title || !editingPost?.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const postData = {
      title: editingPost.title,
      content: editingPost.content,
      excerpt: editingPost.excerpt || editingPost.content.replace(/<[^>]*>/g, "").substring(0, 150) + "...",
      thumbnail: editingPost.thumbnail || "",
      category: editingPost.category as "study" | "dakwah" | "activity",
      date: editingPost.date || new Date().toISOString().split("T")[0]
    };

    if (editingPost.id) {
      updatePost(editingPost.id, postData);
      toast({
        title: "Post updated",
        description: "The post has been successfully updated."
      });
    } else {
      addPost(postData);
      toast({
        title: "Post created",
        description: "The post has been successfully created."
      });
    }

    setIsEditing(false);
    setEditingPost(null);
    loadPosts();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <>
      <Helmet>
        <title>Manage Posts - JAMAS Admin</title>
      </Helmet>
      <div className="min-h-screen bg-cream">
        {/* Header */}
        <header className="bg-primary text-primary-foreground shadow-elegant">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold">J</span>
              </div>
              <span className="font-bold text-xl">JAMAS Admin</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </button>
          </div>

          {!isEditing ? (
            <>
              {/* Page Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-primary mb-2">Manage Posts</h1>
                  <p className="text-muted-foreground">{posts.length} posts total</p>
                </div>
                <button
                  onClick={handleNewPost}
                  className="btn-primary flex items-center gap-2"
                >
                  <Plus size={18} />
                  New Post
                </button>
              </div>

              {/* Posts List */}
              <div className="bg-background rounded-xl shadow-elegant overflow-hidden">
                {posts.length === 0 ? (
                  <div className="p-12 text-center">
                    <p className="text-muted-foreground mb-4">No posts yet.</p>
                    <button
                      onClick={handleNewPost}
                      className="btn-accent inline-flex items-center gap-2"
                    >
                      <Plus size={18} />
                      Create your first post
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-cream">
                        <tr>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-primary">Title</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-primary">Category</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-primary">Date</th>
                          <th className="text-right px-6 py-4 text-sm font-semibold text-primary">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {posts.map(post => (
                          <tr key={post.id} className="hover:bg-cream/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                {post.thumbnail ? (
                                  <img
                                    src={post.thumbnail}
                                    alt=""
                                    className="w-12 h-12 rounded-lg object-cover"
                                  />
                                ) : (
                                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <span className="text-primary font-bold">{post.title.charAt(0)}</span>
                                  </div>
                                )}
                                <span className="font-medium text-foreground line-clamp-1">{post.title}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                                {getCategoryLabel(post.category)}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-muted-foreground">
                              {formatDate(post.date)}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleEditPost(post)}
                                  className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <Edit2 size={18} />
                                </button>
                                <button
                                  onClick={() => handleDeletePost(post.id)}
                                  className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Edit/Create Form */
            <div className="bg-background rounded-xl shadow-elegant p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-primary">
                  {editingPost?.id ? "Edit Post" : "Create New Post"}
                </h2>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditingPost(null);
                  }}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-cream rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Title <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={editingPost?.title || ""}
                    onChange={(e) => setEditingPost(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 bg-cream border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Enter post title"
                  />
                </div>

                {/* Category & Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Category
                    </label>
                    <select
                      value={editingPost?.category || "study"}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, category: e.target.value as Post["category"] }))}
                      className="w-full px-4 py-3 bg-cream border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    >
                      <option value="study">Islamic Study</option>
                      <option value="dakwah">Da'wah</option>
                      <option value="activity">Activity Info</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={editingPost?.date || ""}
                      onChange={(e) => setEditingPost(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-4 py-3 bg-cream border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Thumbnail */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Thumbnail
                  </label>
                  <div className="flex items-start gap-4">
                    {editingPost?.thumbnail ? (
                      <div className="relative">
                        <img
                          src={editingPost.thumbnail}
                          alt="Thumbnail preview"
                          className="w-32 h-24 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => setEditingPost(prev => ({ ...prev, thumbnail: "" }))}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <label className="w-32 h-24 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-accent transition-colors">
                        <Upload size={20} className="text-muted-foreground mb-1" />
                        <span className="text-xs text-muted-foreground">Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleThumbnailUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={editingPost?.excerpt || ""}
                    onChange={(e) => setEditingPost(prev => ({ ...prev, excerpt: e.target.value }))}
                    className="w-full px-4 py-3 bg-cream border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                    rows={2}
                    placeholder="Brief summary (auto-generated if left empty)"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Content <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    value={editingPost?.content || ""}
                    onChange={(e) => setEditingPost(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full px-4 py-3 bg-cream border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none font-mono text-sm"
                    rows={12}
                    placeholder="Write your content here. You can use HTML tags for formatting."
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Tip: You can use HTML tags like &lt;p&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;li&gt; for formatting.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 pt-4 border-t border-border">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditingPost(null);
                    }}
                    className="px-6 py-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePost}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Save size={18} />
                    {editingPost?.id ? "Update Post" : "Create Post"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AdminPosts;
