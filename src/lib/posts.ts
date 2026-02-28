import { supabase } from "@/integrations/supabase/client";

export interface Post {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  category: "ilmu" | "kegiatan" | "pengumuman";
  date: string; // mapped from created_at
  excerpt: string;
}

// Map DB row to Post interface
const mapRow = (row: any): Post => ({
  id: row.id,
  title: row.title,
  content: row.content,
  thumbnail: row.thumbnail || "",
  category: row.category as Post["category"],
  date: row.created_at.split("T")[0],
  excerpt: row.excerpt,
});

export const getPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapRow);
};

export const getPostById = async (id: string): Promise<Post | undefined> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? mapRow(data) : undefined;
};

export const getRecentPosts = async (count: number = 3): Promise<Post[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(count);
  if (error) throw error;
  return (data || []).map(mapRow);
};

export const addPost = async (post: Omit<Post, "id">): Promise<Post> => {
  const { data, error } = await supabase
    .from("posts")
    .insert({
      title: post.title,
      content: post.content,
      thumbnail: post.thumbnail,
      category: post.category,
      excerpt: post.excerpt,
      created_at: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
    })
    .select()
    .single();
  if (error) throw error;
  return mapRow(data);
};

export const updatePost = async (id: string, updates: Partial<Post>): Promise<Post | null> => {
  const updateData: any = {};
  if (updates.title !== undefined) updateData.title = updates.title;
  if (updates.content !== undefined) updateData.content = updates.content;
  if (updates.thumbnail !== undefined) updateData.thumbnail = updates.thumbnail;
  if (updates.category !== undefined) updateData.category = updates.category;
  if (updates.excerpt !== undefined) updateData.excerpt = updates.excerpt;
  if (updates.date !== undefined) updateData.created_at = new Date(updates.date).toISOString();

  const { data, error } = await supabase
    .from("posts")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data ? mapRow(data) : null;
};

export const deletePost = async (id: string): Promise<boolean> => {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
  return true;
};

export const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    ilmu: "Ilmu & Kajian",
    kegiatan: "Kegiatan",
    pengumuman: "Pengumuman"
  };
  return labels[category] || category;
};

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    ilmu: "bg-emerald-600 text-white",
    kegiatan: "bg-amber-500 text-white",
    pengumuman: "bg-sky-500 text-white"
  };
  return colors[category] || "bg-muted text-muted-foreground";
};
