import { Card } from "@/components/ui/card";
import { Eye, Award, Target } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-heading font-bold mb-6">About Ajira Club</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building a community of career-ready graduates through innovation, 
            collaboration, and professional excellence.
          </p>
        </div>

        {/* History Section */}
        <section className="mb-20">
          <Card className="p-8 md:p-12 shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-heading font-bold">Our History</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                 The Kenyatta University Ajira Club was founded in 2024 by a group of ambitious students who recognized the need for a 
                 structured platform to bridge the gap between academic learning and professional practice under the Ajira digital program.
                  What started as a small initiative with 19 members is growing into one of the university's most impactful student organizations.
                <br />
                <p>
                Over time, we are trying to partner with impactful clubs and societies in Kenyatta University such as The KUFFEST and The Reformation 
                and other Ajira digital student organizations such as NRCAC and Ajira club Zetech to provide our members with real-world exposure and
                 career opportunities. Our alumni network keeps growing in Kenyatta University Kenya and beyond, with members making significant
                  contributions in various industries including technology, finance, and public service.
                 </p>
                 <p>
                 Today, Ajira Club stands as a testament to the power of student-led initiatives, having facilitated some real job and internship 
                 linkages organized 20+ training and mentorship events, and created a thriving community of over 50 active members dedicated to professional excellence.
                 </p>
              </p>
            </div>
          </Card>
        </section>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Mission */}
          <Card className="p-8 border-t-4 border-t-primary hover:shadow-hover transition-all">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-heading font-bold">Our Mission</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To empower youth in the digital world through trainings and mentorships on the online
               works hereby fostering their development and wellbeing.
            </p>
          </Card>

          {/* Vision */}
          <Card className="p-8 border-t-4 border-t-secondary hover:shadow-hover transition-all">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-8 h-8 text-secondary" />
              <h2 className="text-3xl font-heading font-bold">Our Vision</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
             To create a society where every young person has the opportunity to achieve their full potential in the digital world and 
             contribute positively to their communities.
            </p>
          </Card>
        </div>

        {/* Core Values */}
        <section>
          <h2 className="text-3xl font-heading font-bold text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Excellence",
                description: "We pursue the highest standards in everything we do.",
              },
              {
                title: "Innovation",
                description: "We embrace creativity and new approaches to problem-solving.",
              },
              {
                title: "Integrity",
                description: "We operate with honesty, transparency, and ethical conduct.",
              },
              {
                title: "Collaboration",
                description: "We believe in the power of teamwork and community.",
              },
            ].map((value, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-hover transition-all hover:-translate-y-1"
              >
                <h3 className="font-heading font-semibold text-xl mb-3 text-primary">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
