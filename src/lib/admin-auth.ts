import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

/**
 * Securely verify admin role with proper session validation
 * This function should be called before EVERY admin operation
 */
export const verifyAdminRole = async (user: User | null): Promise<boolean> => {
  if (!user) return false;

  try {
    // Get fresh session to verify token is still valid
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      console.warn("Session expired or invalid");
      return false;
    }

    // Verify the user IDs match (prevent token substitution attacks)
    if (session.user.id !== user.id) {
      console.warn("Session user mismatch");
      return false;
    }

    // Check admin role from database (server-side validation)
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (error) {
      console.error("Error verifying admin role:", error);
      return false;
    }

    // Only return true if role exists
    return !!data;
  } catch (error) {
    console.error("Unexpected error in verifyAdminRole:", error);
    return false;
  }
};

/**
 * Wrapper for database queries requiring admin access
 * Ensures authorization before executing any admin operations
 */
export const withAdminCheck = async <T>(
  user: User | null,
  operation: () => Promise<T>
): Promise<{ data?: T; error?: Error }> => {
  try {
    const isAdmin = await verifyAdminRole(user);
    
    if (!isAdmin) {
      return { error: new Error("Unauthorized: Admin access required") };
    }

    const data = await operation();
    return { data };
  } catch (error) {
    return { error: error instanceof Error ? error : new Error(String(error)) };
  }
};
