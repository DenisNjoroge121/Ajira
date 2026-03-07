import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Home = () => {
  const stats = [
    { icon: Users, label: "Active Members", value: "200+" },
    { icon: Target, label: "Events Annually", value: "20+" },
    { icon: TrendingUp, label: "Career Placements", value: "10+" },
  ];
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
                Empowering <span className="text-primary">Careers</span>,
                <br />
                Building <span className="text-secondary">Futures</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Join Kenyatta University's premier career development community. 
                Connect with industry leaders, access exclusive opportunities, 
                and unlock your professional potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="group">
                  <Link to="/register">
                    Join the Club
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="animate-fade-in relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl transform rotate-3"></div>
              <img
                src={heroImage}
                alt="Ajira Club Members"
                className="relative rounded-3xl shadow-hover w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="p-8 text-center hover:shadow-hover transition-all duration-300 hover:-translate-y-1"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <div className="text-4xl font-heading font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-heading font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              To bridge the gap between academic excellence and professional success 
              by providing Kenyatta University students with comprehensive career 
              development resources, networking opportunities, and practical skills 
              training that prepares them for the dynamic job market.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card className="p-6 border-t-4 border-t-primary">
                <h3 className="font-heading font-semibold text-lg mb-3">Career Development</h3>
                <p className="text-sm text-muted-foreground">
                  Workshops, mentorship, and skills training to prepare you for success.
                </p>
              </Card>
              <Card className="p-6 border-t-4 border-t-secondary">
                <h3 className="font-heading font-semibold text-lg mb-3">Networking</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with alumni, industry professionals, and fellow students.
                </p>
              </Card>
              <Card className="p-6 border-t-4 border-t-primary">
                <h3 className="font-heading font-semibold text-lg mb-3">Opportunities</h3>
                <p className="text-sm text-muted-foreground">
                  Access to internships, job placements, and entrepreneurship support.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading font-bold text-primary-foreground mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of ambitious students already building their professional futures with Ajira Club.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/register">
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
