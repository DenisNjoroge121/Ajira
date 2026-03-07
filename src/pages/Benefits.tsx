import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Benefits = () => {
  const benefits = [
    {
      category: "Career Development",
      items: [
        "Access to exclusive job postings and internship opportunities",
        "Resume review and optimization by industry professionals",
        "Mock interview sessions with HR experts",
        "Career counseling and guidance",
        "LinkedIn profile building workshops",
        "Professional certification preparation support",
      ],
    },
    {
      category: "Networking",
      items: [
        "Connect with 500+ active members across various fields",
        "Access to alumni network spanning 200+ professionals",
        "Monthly networking events with industry leaders",
        "Mentorship program pairing you with experienced professionals",
        "Corporate meet-and-greet sessions",
        "Exclusive invitation to career fairs and industry conferences",
      ],
    },
    {
      category: "Skill Development",
      items: [
        "Free workshops on in-demand professional skills",
        "Technical training in emerging technologies",
        "Soft skills development (communication, leadership, teamwork)",
        "Entrepreneurship and business development training",
        "Financial literacy and investment education",
        "Project management certification courses",
      ],
    },
    {
      category: "Exclusive Resources",
      items: [
        "Access to Ajira Innovation Hub and co-working space",
        "Free use of club resources (computers, printers, internet)",
        "Discounted rates for professional development courses",
        "Priority access to scholarship and grant opportunities",
        "Career resource library with books and online materials",
        "Job search tools and platforms subscriptions",
      ],
    },
    {
      category: "Personal Growth",
      items: [
        "Leadership development opportunities",
        "Public speaking and presentation skills training",
        "Confidence building workshops",
        "Work-life balance and mental health support",
        "Personal branding and professional image consulting",
        "Goal setting and achievement planning sessions",
      ],
    },
    {
      category: "Community & Support",
      items: [
        "Supportive community of like-minded ambitious students",
        "Peer study groups and accountability partners",
        "Social events and team-building activities",
        "Volunteer and community service opportunities",
        "Collaborative projects and competitions",
        "24/7 online community forum and WhatsApp support",
      ],
    },
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-heading font-bold mb-6">Membership Benefits</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Unlock a world of opportunities designed to accelerate your career and 
            personal development.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, categoryIndex) => (
            <Card
              key={categoryIndex}
              className="p-8 hover:shadow-hover transition-all animate-fade-in"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <h2 className="text-2xl font-heading font-bold mb-6 text-primary">
                {benefit.category}
              </h2>
              <ul className="space-y-3">
                {benefit.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Membership Cost Section */}
        <Card className="p-8 md:p-12 bg-muted mb-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-4">
              Investment in Your Future
            </h2>
            <div className="text-5xl font-heading font-bold text-primary mb-4">
              KES 500
            </div>
            <p className="text-muted-foreground mb-6">
              One-time annual membership fee that unlocks all these benefits and more. 
              Think of it as investing in yourself and your career future.
            </p>
            <p className="text-sm text-muted-foreground italic mb-6">
              *Financial assistance available for students in need. Contact us to learn more.
            </p>
            <Button asChild size="lg">
              <Link to="/register">Become a Member Today</Link>
            </Button>
          </div>
        </Card>

        {/* Testimonial Section */}
        <Card className="p-8 md:p-12 gradient-hero">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xl text-primary-foreground/95 italic mb-6 leading-relaxed">
              "Joining Ajira Club was the best decision I made at university. The 
              networking opportunities alone opened doors I never knew existed, and 
              the skills I gained helped me land my dream job before graduation."
            </p>
            <div className="font-heading font-semibold text-primary-foreground">
              - Sarah Muthoni, Class of 2024
            </div>
            <div className="text-sm text-primary-foreground/80">
              Now Software Engineer at Safaricom PLC
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Benefits;
