import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield } from "lucide-react";
import { adminAuthSchema } from "@/lib/validation-schemas";
import { ZodError } from "zod";
import { authRateLimiter } from "@/lib/rate-limiter";

const AdminAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          navigate("/admin");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/admin");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check rate limit
    const limitCheck = authRateLimiter.check(email.toLowerCase());
    if (!limitCheck.allowed) {
      const resetMinutes = Math.ceil(limitCheck.resetIn / 60000);
      toast({
        title: "Too Many Attempts",
        description: `Please try again in ${resetMinutes} minute${resetMinutes > 1 ? 's' : ''}. You have ${limitCheck.remaining} attempt${limitCheck.remaining !== 1 ? 's' : ''} remaining.`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Validate form data
      const validatedData = adminAuthSchema.parse({
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: validatedData.email,
          password: validatedData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
          },
        });
        if (error) throw error;
        authRateLimiter.reset(validatedData.email); // Reset on successful signup
        toast({
          title: "Account Created",
          description: "Please contact an existing admin to grant you admin access.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: validatedData.email,
          password: validatedData.password,
        });
        if (error) throw error;
        authRateLimiter.reset(validatedData.email); // Reset on successful login
      }
    } catch (error: any) {
      let errorMessage = "Something went wrong. Please try again.";
      
      if (error instanceof ZodError) {
        errorMessage = error.errors[0]?.message || errorMessage;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: isSignUp ? "Sign Up Failed" : "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16 flex items-center justify-center">
      <Card className="p-8 w-full max-w-md mx-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-heading font-bold">Admin Portal</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isSignUp ? "Create an admin account" : "Sign in to manage registrations"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="admin@ku.ac.ke"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={255}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isSignUp ? "Creating Account..." : "Signing In..."}
              </>
            ) : (
              isSignUp ? "Create Account" : "Sign In"
            )}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AdminAuth;
