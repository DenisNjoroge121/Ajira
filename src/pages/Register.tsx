import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { registrationSchema } from "@/lib/validation-schemas";
import { ZodError } from "zod";
import { sendRegistrationEmail } from "@/lib/email-service";
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

const Register = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const whatsappGroupLink = "https://chat.whatsapp.com/KUAjiraClub2025";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    regNumber: "",
    year: "",
    course: "",
    school: "",
    interests: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form data
      const validatedData = registrationSchema.parse({
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        reg_number: formData.regNumber.trim(),
        year_of_study: formData.year.trim(),
        course: formData.course.trim(),
        school: formData.school.trim(),
        career_interests: formData.interests.trim() || undefined,
      });

      // Insert into database
      const { error, data } = await supabase
        .from("member_registrations")
        .insert({
          first_name: validatedData.first_name,
          last_name: validatedData.last_name,
          email: validatedData.email,
          phone: validatedData.phone,
          reg_number: validatedData.reg_number,
          year_of_study: validatedData.year_of_study,
          course: validatedData.course,
          school: validatedData.school,
          career_interests: validatedData.career_interests || null,
        })
        .select()
        .single();

      if (error) throw error;

      // Send email notification (don't await - let it run in background)
      // if (data) {
      //   sendRegistrationEmail(data).catch(err => 
      //     console.error('Background email sending failed:', err)
      //   );
      // }

      setSubmitted(true);
      
      toast({
        title: "Success!",
        description: "Your registration has been submitted successfully.",
      });
      
    } catch (error: any) {
      let errorMessage = "Something went wrong. Please try again.";
      
      if (error instanceof ZodError) {
        errorMessage = error.errors[0]?.message || errorMessage;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <Card className="p-8 md:p-12 max-w-2xl mx-4 text-center">
          <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-6" />
          <h2 className="text-3xl font-heading font-bold mb-4">
            Registration Received!
          </h2>
          <p className="text-muted-foreground mb-8">
            Thank you for your interest in joining Ajira Club. We've received your 
            registration and will be in touch soon with next steps.
          </p>
          <div className="bg-muted p-6 rounded-lg mb-6">
            <h3 className="font-heading font-semibold text-lg mb-3 flex items-center justify-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Join Our WhatsApp Community
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get instant updates, connect with members, and stay informed about upcoming events.
            </p>
            <Button asChild className="w-full sm:w-auto" variant="default">
              <a
                href={whatsappGroupLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join WhatsApp Group
              </a>
            </Button>
          </div>
          <Button asChild variant="outline">
            <a href="/">Return to Home</a>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-heading font-bold mb-6">Join Ajira Club</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Take the first step towards transforming your career. Fill out the form 
            below to become a member.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Registration Form */}
          <Card className="p-8 lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-heading font-semibold mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input 
                      id="firstName" 
                      required 
                      placeholder="John" 
                      value={formData.firstName} 
                      onChange={handleInputChange} 
                      maxLength={100} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input 
                      id="lastName" 
                      required 
                      placeholder="Doe" 
                      value={formData.lastName} 
                      onChange={handleInputChange} 
                      maxLength={100} 
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-heading font-semibold mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="john.doe@students.ku.ac.ke"
                      value={formData.email}
                      onChange={handleInputChange}
                      maxLength={255}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="+254 712 345 678"
                      value={formData.phone}
                      onChange={handleInputChange}
                      maxLength={20}
                    />
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h3 className="text-xl font-heading font-semibold mb-4">
                  Academic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="regNumber">Registration Number *</Label>
                    <Input 
                      id="regNumber" 
                      required 
                      placeholder="X21/12345/2024" 
                      value={formData.regNumber} 
                      onChange={handleInputChange} 
                      maxLength={50} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">Year of Study *</Label>
                    <Input 
                      id="year" 
                      required 
                      placeholder="e.g., 2nd Year" 
                      value={formData.year} 
                      onChange={handleInputChange} 
                      maxLength={50} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="course">Course/Program *</Label>
                    <Input 
                      id="course" 
                      required 
                      placeholder="e.g., Computer Science" 
                      value={formData.course} 
                      onChange={handleInputChange} 
                      maxLength={200} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="school">School/Faculty *</Label>
                    <Input
                      id="school"
                      required
                      placeholder="e.g., School of Pure and Applied Sciences"
                      value={formData.school}
                      onChange={handleInputChange}
                      maxLength={200}
                    />
                  </div>
                </div>
              </div>

              {/* Career Interests */}
              <div>
                <Label htmlFor="interests">Career Interests</Label>
                <Textarea
                  id="interests"
                  placeholder="Tell us about your career interests and what you hope to gain from joining Ajira Club..."
                  rows={4}
                  value={formData.interests}
                  onChange={handleInputChange}
                  maxLength={1000}
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Registration"
                )}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                By submitting this form, you agree to our terms and conditions.
              </p>
            </form>
          </Card>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-heading font-semibold text-lg mb-4">
                What Happens Next?
              </h3>
              <ol className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span>We'll review your application within 48 hours</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>You'll receive a confirmation email with payment details</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>Complete the membership fee payment (KES 500)</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  <span>Get added to our WhatsApp community and member portal</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    5
                  </span>
                  <span>Receive your membership kit and start attending events!</span>
                </li>
              </ol>
            </Card>

            <Card className="p-6 bg-muted">
              <h3 className="font-heading font-semibold text-lg mb-3">
                Need Help?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Have questions about membership or the registration process? We're here to help!
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Email:</span> ajiraclub@ku.ac.ke
                </p>
                <p>
                  <span className="font-medium">Phone:</span> +254 712 345 678
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;