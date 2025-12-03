export interface Post {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  category: "study" | "dakwah" | "activity";
  date: string;
  excerpt: string;
}

const STORAGE_KEY = "jamas_posts";

const defaultPosts: Post[] = [
  {
    id: "1",
    title: "The Importance of Daily Prayers",
    content: `<p>Prayer is the foundation of a Muslim's faith. It is a direct connection between the worshipper and Allah SWT.</p>
    <p>In our busy lives as students, it's easy to forget the importance of maintaining our five daily prayers. However, these prayers serve as anchors throughout our day, reminding us of our purpose and keeping us grounded.</p>
    <h3>Benefits of Consistent Prayer</h3>
    <ul>
      <li>Spiritual cleansing and peace of mind</li>
      <li>Time management and discipline</li>
      <li>Community bonding during congregational prayers</li>
      <li>Physical health through the movements of prayer</li>
    </ul>
    <p>JAMAS encourages all members to prioritize their prayers and join our daily congregational prayers at the school mosque.</p>`,
    thumbnail: "",
    category: "study",
    date: "2024-01-15",
    excerpt: "Prayer is the foundation of a Muslim's faith. It is a direct connection between the worshipper and Allah SWT."
  },
  {
    id: "2",
    title: "Weekly Islamic Study Circle",
    content: `<p>Join us every Friday after Jumu'ah prayer for our weekly Islamic study circle where we explore the beautiful teachings of Islam.</p>
    <p>This week's topic: Understanding the 99 Names of Allah and how they apply to our daily lives.</p>
    <h3>What to Expect</h3>
    <ul>
      <li>Interactive discussions led by senior members</li>
      <li>Q&A sessions with our school's Islamic teacher</li>
      <li>Light refreshments provided</li>
      <li>Certificate of participation for active members</li>
    </ul>`,
    thumbnail: "",
    category: "dakwah",
    date: "2024-01-20",
    excerpt: "Join us every Friday after Jumu'ah prayer for our weekly Islamic study circle."
  },
  {
    id: "3",
    title: "Upcoming: School Mosque Cleaning Day",
    content: `<p>As part of our commitment to maintaining our sacred space, JAMAS is organizing a mosque cleaning day this Saturday.</p>
    <p>All members are encouraged to participate in this blessed activity. The Prophet Muhammad (peace be upon him) said: "Cleanliness is half of faith."</p>
    <h3>Schedule</h3>
    <ul>
      <li>8:00 AM - Gathering and task assignment</li>
      <li>8:30 AM - Cleaning begins</li>
      <li>11:00 AM - Break and refreshments</li>
      <li>12:00 PM - Dhuhr prayer together</li>
    </ul>`,
    thumbnail: "",
    category: "activity",
    date: "2024-01-25",
    excerpt: "Join us for the school mosque cleaning day and earn countless rewards."
  }
];

export const getPosts = (): Post[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with default posts
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
  return defaultPosts;
};

export const getPostById = (id: string): Post | undefined => {
  const posts = getPosts();
  return posts.find(post => post.id === id);
};

export const getRecentPosts = (count: number = 3): Post[] => {
  const posts = getPosts();
  return posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

export const addPost = (post: Omit<Post, "id">): Post => {
  const posts = getPosts();
  const newPost: Post = {
    ...post,
    id: Date.now().toString()
  };
  posts.push(newPost);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return newPost;
};

export const updatePost = (id: string, updates: Partial<Post>): Post | null => {
  const posts = getPosts();
  const index = posts.findIndex(post => post.id === id);
  if (index === -1) return null;
  
  posts[index] = { ...posts[index], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return posts[index];
};

export const deletePost = (id: string): boolean => {
  const posts = getPosts();
  const filtered = posts.filter(post => post.id !== id);
  if (filtered.length === posts.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
};

export const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    study: "Islamic Study",
    dakwah: "Da'wah",
    activity: "Activity Info"
  };
  return labels[category] || category;
};

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    study: "bg-primary text-primary-foreground",
    dakwah: "bg-accent text-accent-foreground",
    activity: "bg-green-light text-primary-foreground"
  };
  return colors[category] || "bg-muted text-muted-foreground";
};
