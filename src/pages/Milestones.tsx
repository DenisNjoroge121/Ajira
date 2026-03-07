import { Card } from "@/components/ui/card";

const Milestones = () => {
  const milestones = [
    {
      year: "2018",
      title: "Foundation",
      description: "Ajira Club was founded by 30 ambitious students with a vision to transform career development at KU.",
      color: "border-l-primary",
    },
    {
      year: "2019",
      title: "First Corporate Partnership",
      description: "Secured our first major partnership with Safaricom, opening doors for internship opportunities.",
      color: "border-l-secondary",
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Launched virtual career fairs and online mentorship programs during the pandemic, reaching 200+ students.",
      color: "border-l-primary",
    },
    {
      year: "2021",
      title: "100 Members Milestone",
      description: "Crossed the 100-member mark and established our alumni network program.",
      color: "border-l-secondary",
    },
    {
      year: "2022",
      title: "Innovation Hub Launch",
      description: "Opened the Ajira Innovation Hub to support student entrepreneurship and startup incubation.",
      color: "border-l-primary",
    },
    {
      year: "2023",
      title: "Regional Expansion",
      description: "Collaborated with 5 other universities to establish the Kenya University Career Network.",
      color: "border-l-secondary",
    },
    {
      year: "2024",
      title: "Excellence Recognition",
      description: "Named Best Student Organization and reached 500+ active members with 200+ career placements.",
      color: "border-l-primary",
    },
    {
      year: "2025",
      title: "Future Forward",
      description: "Launching AI-powered career matching platform and expanding to 10+ corporate partnerships.",
      color: "border-l-secondary",
    },
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-heading font-bold mb-6">Our Journey</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From humble beginnings to becoming KU's leading career development organization. 
            Here's how we've grown over the years.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border"></div>

            {/* Milestones */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative animate-fade-in ${
                    index % 2 === 0 ? "md:pr-1/2" : "md:pl-1/2 md:text-right"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full -ml-2 mt-6 ${
                      milestone.color.replace("border-l-", "bg-")
                    } border-4 border-background shadow-lg z-10`}
                  ></div>

                  {/* Content Card */}
                  <Card
                    className={`ml-16 md:ml-0 p-6 border-l-4 ${milestone.color} hover:shadow-hover transition-all hover:-translate-y-1`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl font-heading font-bold text-primary">
                        {milestone.year}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-2xl mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Future Vision */}
        <Card className="mt-20 p-8 md:p-12 bg-muted text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">The Journey Continues</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            As we look ahead, we remain committed to innovation, excellence, and creating 
            even more opportunities for Kenyatta University students. Join us as we write 
            the next chapter of our story.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Milestones;
