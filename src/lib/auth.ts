import { supabase } from "@/integrations/supabase/client";

export const login = async (email: string, password: string): Promise<boolean> => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return !error;
};

export const logout = async (): Promise<void> => {
  await supabase.auth.signOut();
};

export const isAuthenticated = async (): Promise<boolean> => {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
};

export const isAdmin = async (): Promise<boolean> => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return false;
  
  const { data } = await supabase.rpc("has_role", {
    _user_id: session.user.id,
    _role: "admin",
  });
  return !!data;
};

export const onAuthStateChange = (callback: (session: any) => void) => {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
};
