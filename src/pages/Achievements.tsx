import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Users, TrendingUp } from "lucide-react";

const Achievements = () => {
  const achievements = [
    {
      icon: Trophy,
      title: "Verified Student Organization",
      description:
        "Recognized by Kenyatta University as a Verified Student Organization for our outstanding contribution to student career development.",
      date: "July  2025",
      category: "Recognition",
    },
    {
      icon: Users,
      title: "200+ Active Members",
      description:
        "Grew our membership from 30 founding members to over 200 active participants, making us one of the largest student organizations on campus.",
      date: "December 2025",
      category: "Milestone",
    },
    {
      icon: TrendingUp,
      title: "5+ Career Placements",
      description:
        "Successfully facilitated internships and job placements for 5 members across leading companies in Kenya and East Africa.",
      date: "2025",
      category: "Impact",
    },
   
   
    {
      icon: Users,
      title: "Club Partnerships",
      description:
        "Established strategic partnership with various clubs at school   including KUFFEST and Reformation KU.",
      date: "2026",
      category: "Partnership",
    },
  ];

  const categoryColors: Record<string, string> = {
    Award: "bg-primary text-primary-foreground",
    Milestone: "bg-secondary text-secondary-foreground",
    Impact: "bg-primary text-primary-foreground",
    Competition: "bg-secondary text-secondary-foreground",
    Partnership: "bg-accent text-accent-foreground",
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-heading font-bold mb-6">Our Achievements</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A testament to our commitment to excellence and impact in student career development.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Awards Won", value: "12+" },
            { label: "Members Placed", value: "20+" },
            { label: "Events Hosted", value: "15+" },
            { label: "Partners", value: "5+" },
          ].map((stat, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="text-4xl font-heading font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-hover transition-all hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                  <achievement.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-heading font-bold text-xl pr-4">
                      {achievement.title}
                    </h3>
                    <Badge className={categoryColors[achievement.category]}>
                      {achievement.category}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-3 leading-relaxed">
                    {achievement.description}
                  </p>
                  <p className="text-sm text-primary font-medium">{achievement.date}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="mt-16 p-8 md:p-12 gradient-hero text-center">
          <h2 className="text-3xl font-heading font-bold text-primary-foreground mb-4">
            Be Part of Our Success Story
          </h2>
          <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            Join us and contribute to our growing list of achievements while building 
            your own successful career journey.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Achievements;
