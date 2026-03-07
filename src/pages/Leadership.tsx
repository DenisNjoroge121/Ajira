import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import leadership photos
import patronPhoto from "@/assets/leadership/patron.jpg";
import president2025 from "@/assets/leadership/2025-president.jpg";
import vp2025 from "@/assets/leadership/2025-vp.jpg";
import secretary2025 from "@/assets/leadership/2025-secretary.jpg";
import treasurer2025 from "@/assets/leadership/2025-treasurer.jpg";
import events2025 from "@/assets/leadership/2025-events.jpg";
import comms2025 from "@/assets/leadership/2025-comms.jpg";
import president2024 from "@/assets/leadership/2024-president.jpg";
import vp2024 from "@/assets/leadership/2024-vp.jpg";
import secretary2024 from "@/assets/leadership/2024-secretary.jpg";
import treasurer2024 from "@/assets/leadership/2024-treasurer.jpg";
import events2024 from "@/assets/leadership/2024-events.jpg";
import comms2024 from "@/assets/leadership/2024-comms.jpg";
import brands2024 from "@/assets/leadership/2024-brands.jpg";
import brands2025 from "@/assets/leadership/2025-brands.jpg";
import s2024 from "@/assets/leadership/2024-secretary2.jpg";

const Leadership = () => {
  const leadership2024 = [
    { name: "Onyango Jerremmy Otieno", position: "Chairperson", initials: "OJ", photo: president2024 },
    { name: "Wendy Akoth Otieno", position: "Vice Chairperson", initials: "WA", photo: vp2024 },
    { name: "Opiyo Wyclife Odiwuor", position: "Organizing Secretary", initials: "OW", photo: events2024 },
    { name: "Margaret Omondi", position: "Secretary General", initials: "MO", photo: secretary2024 },
    { name: "Ruth Wambui Gathombi", position: "Secretary General", initials: "RW", photo: s2024 },
    { name: "Okeyo Brian", position: "Organizing Secretary", initials: "OB", photo: events2024 },
    { name: "Carren Okello", position: "Treasurer", initials: "CO", photo: treasurer2024 },
    { name: "Lavin Beth Onyango", position: "Brands Secretary", initials: "LB", photo: brands2024 },
    { name: "Fridah McBeth Thuo", position: "Communications Secretary", initials: "FM", photo: comms2024 },
  ];

  const leadership2025 = [
    { name: "Barrack Sydney Odhiambo", position: "Chairperson", initials: "BS", photo: president2025 },
    { name: "Muriuki Moffat", position: "Vice Chairperson", initials: "MM", photo: vp2025 },
    { name: "Hilda Ngima", position: "Secretary General", initials: "HN", photo: secretary2025 },
    { name: "Joan Njuguna", position: "Assistant General Secretary", initials: "JN",},
    { name: "Vincent Hidaya", position: "Treasurer", initials: "VH", photo: treasurer2025 },
    { name: "Fidel Castro", position: "Organizing Secretary", initials: "FC", photo: events2025 },
    { name: "Benjamin", position: "Assistant Organizing Secretary", initials: "B",  },
    { name: "Mercy Bosibori", position: "Communications Secretary", initials: "MB", photo: comms2025 },
    { name: "Denis Njoroge", position: "Assistant Communications Secretary", initials: "DN", photo: brands2025 },
  ];

  const LeadershipGrid = ({ members }: { members: { name: string; position: string; initials: string; photo?: string }[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {members.map((member, index) => (
        <Card
          key={index}
          className="p-6 text-center hover:shadow-hover transition-all hover:-translate-y-1 animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
            {member.photo && <AvatarImage src={member.photo} alt={member.name} className="object-cover" />}
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-heading font-bold">
              {member.initials}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-heading font-bold text-xl mb-2">{member.name}</h3>
          <p className="text-primary font-medium">{member.position}</p>
        </Card>
      ))}
    </div>
  );

  const patronAndTrainer = [
    { name: "Mr. Kenneth Njoroge ", position: "Club Patron", initials: "AM", description: "Senior Career Advisor KU", photo: patronPhoto },
    { name: "Onyango Jerremmy Otieno", position: "Institutional Trainer", initials: "SO", description: "Digital Skills & Career Development", photo: president2024 },
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-heading font-bold mb-6">Our Leadership</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the dedicated individuals steering the Ajira Club towards excellence 
            and innovation.
          </p>
        </div>

        {/* Patron & Institutional Trainer */}
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-center mb-8">Patron & Trainer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {patronAndTrainer.map((member, index) => (
              <Card
                key={index}
                className="p-8 text-center hover:shadow-hover transition-all hover:-translate-y-1 animate-fade-in border-2 border-primary/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Avatar className="w-28 h-28 mx-auto mb-4 border-4 border-primary/30">
                  <AvatarImage src={member.photo} alt={member.name} className="object-cover" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-heading font-bold">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-heading font-bold text-xl mb-1">{member.name}</h3>
                <p className="text-primary font-semibold mb-2">{member.position}</p>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Leadership Tabs */}
        <Tabs defaultValue="2025" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="2025" className="text-lg">
              2025/2026 Leadership
            </TabsTrigger>
            <TabsTrigger value="2024" className="text-lg">
              2024/2025 Leadership
            </TabsTrigger>
          </TabsList>

          <TabsContent value="2025">
            <LeadershipGrid members={leadership2025} />
          </TabsContent>

          <TabsContent value="2024">
            <LeadershipGrid members={leadership2024} />
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="mt-20 p-8 md:p-12 bg-muted text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Interested in Leadership?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Leadership positions are elected annually. Active members in good standing 
            are eligible to run for office. Elections are held at the end of each 
            academic year.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Leadership;
