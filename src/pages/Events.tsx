import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Events = () => {
  const events = [
   
    {
      title: "LinkedIn Optimization Workshop",
      date: "October 30, 2025",
      location: "Virtual",
      description:
        "Learn how to create a compelling LinkedIn profile that attracts recruiters and opportunities.",
      category: "Workshop",
      status: "past",
    },
    {
      title: "New Members Orientation",
      date: "November 26, 2025",
      location: "Virtual",
     
      description:
        "Welcome session for new Ajira Club members to learn about the club's mission, activities, and how to get involved.",
      category: "Orientation",
      status: "past",
    },
    {
      title: "Digital marketing and ecommerce training",
      date: "November 27&28th , 2025",
      location: "KU BSSC room149",
      description:
        "Hands-on training on digital marketing strategies and ecommerce fundamentals to build your online business skills.",
      category: "Training",
      status: "past",
    },
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-heading font-bold mb-6">Events</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with our upcoming workshops, seminars, and networking events 
            designed to accelerate your career growth.
          </p>
        </div>

        {/* Upcoming Events */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-heading font-bold">Upcoming Events</h2>
            <Badge className="bg-primary text-primary-foreground">
              {events.length} Events
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-hover transition-all hover:-translate-y-1 animate-fade-in border-t-4 border-t-primary"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="secondary">{event.category}</Badge>
                  <Badge className="bg-secondary text-secondary-foreground">
                    {event.status}
                  </Badge>
                </div>

                <h3 className="font-heading font-bold text-2xl mb-4">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {event.description}
                </p>

                <Button className="w-full">Register Now</Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Past Events */}
        <section>
          <h2 className="text-3xl font-heading font-bold mb-8">Past Events</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-hover transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Badge variant="outline" className="mb-4">
                  {event.category}
                </Badge>

                <h3 className="font-heading font-bold text-xl mb-3">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <Card className="mt-20 p-8 md:p-12 gradient-hero text-center">
          <h2 className="text-3xl font-heading font-bold text-primary-foreground mb-4">
            Don't Miss Out on Future Events
          </h2>
          <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            Become a member to get priority access to all our events, workshops, 
            and networking opportunities.
          </p>
          <Button asChild size="lg" variant="secondary">
            <a href="/register">Join Ajira Club</a>
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Events;
