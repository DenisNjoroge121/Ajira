import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const leaderNames = [
  "Barrack Sydney Odhiambo",
  "Muriuki Moffat",
  "Hilda Ngima",
  "Joan Njuguna",
  "Vincent Hidaya",
  "Fidel Castro",
  "Benjamin",
  "Mercy Bosibori",
  "Denis Njoroge",
  "Onyango Jerremmy Otieno",
  "Wendy Akoth Otieno",
  "Opiyo Wyclife Odiwuor",
  "Margaret Omondi",
  "Ruth Wambui Gathombi",
  "Okeyo Brian",
  "Carren Okello",
  "Lavin Beth Onyango",
  "Fridah McBeth Thuo",
];

// Deterministic shuffle based on index
const getAuthor = (index: number) => leaderNames[index % leaderNames.length];

const blogs = [
  {
    title: "10 Essential Skills Every Graduate Needs in 2025",
    excerpt:
      "The job market is evolving rapidly. Here are the top skills that employers are looking for in today's graduates and how you can develop them.",
    content: `The employment landscape in Kenya and globally has transformed dramatically. As we navigate 2025, graduates entering the workforce face both unprecedented challenges and exciting opportunities. At Ajira Club, we've compiled the essential skills that will set you apart in today's competitive job market.

**1. Digital Literacy and Tech Savviness**
Gone are the days when basic computer skills were sufficient. Today's employers expect graduates to be comfortable with cloud platforms, collaboration tools like Slack and Microsoft Teams, and industry-specific software. Consider taking online certifications in tools relevant to your field.

**2. Critical Thinking and Problem-Solving**
Employers value candidates who can analyze complex situations and develop innovative solutions. Practice this by participating in case study competitions and hackathons—Ajira Club hosts several throughout the year.

**3. Data Analysis**
Understanding data is no longer reserved for IT professionals. Every field from marketing to healthcare requires basic data interpretation skills. Familiarize yourself with Excel, Google Sheets, and visualization tools like Tableau.

**4. Effective Communication**
Whether written or verbal, clear communication remains invaluable. Join our weekly presentation workshops to build confidence in public speaking and professional writing.

**5. Adaptability and Resilience**
The ability to pivot quickly and embrace change defines successful professionals. The pandemic taught us that flexibility is not optional—it's essential.

**6. Emotional Intelligence**
Understanding and managing emotions—both yours and others'—creates better team dynamics and leadership opportunities. Practice active listening and empathy in your daily interactions.

**7. Project Management**
Organizations value employees who can plan, execute, and deliver results. Learn methodologies like Agile and Scrum through our certified training programs.

**8. Financial Literacy**
Understanding budgets, invoicing, and basic accounting principles makes you a more valuable team member, regardless of your role.

**9. Networking and Relationship Building**
Your network is your net worth. Attend industry events, maintain LinkedIn connections, and never underestimate the power of meaningful professional relationships.

**10. Continuous Learning Mindset**
The most successful professionals commit to lifelong learning. Stay curious, embrace new technologies, and never stop developing your skills.

At Kenyatta University Ajira Club, we're committed to helping you develop these skills through workshops, mentorship programs, and real-world projects. Join us on this journey to career success!`,
    date: "February 15, 2025",
    category: "Career Tips",
    readTime: "8 min read",
  },
  {
    title: "How to Build a Professional Network While Still in University",
    excerpt:
      "Networking isn't just for professionals. Learn how to start building meaningful connections that will benefit your career long before graduation.",
    content: `Many students believe networking is something you do after graduation. This misconception can cost you valuable opportunities. The truth is, building your professional network should start from your first year at university. Here's how you can get started.

**Why University is the Perfect Time to Network**

Your fellow students are future industry leaders, entrepreneurs, and potential collaborators. The connections you make now could lead to job referrals, business partnerships, or mentorship opportunities years down the line. At Kenyatta University, you're surrounded by talented individuals across various disciplines—take advantage of this diversity.

**Leverage Campus Organizations**

Joining clubs like Ajira Club puts you in contact with like-minded students who share your career interests. Attend events, volunteer for leadership positions, and actively participate in discussions. These interactions naturally build your network.

**Connect with Alumni**

Our alumni network is a goldmine of professional connections. Many are eager to give back and mentor current students. Reach out respectfully on LinkedIn, attend alumni events, and don't be afraid to ask for informational interviews.

**Attend Industry Events**

Conferences, workshops, and seminars bring together professionals from various companies. Prepare your elevator pitch, bring business cards (yes, students can have them too!), and follow up with connections within 48 hours.

**Optimize Your LinkedIn Profile**

Your LinkedIn is often your first impression. Use a professional photo, craft a compelling summary, and showcase your projects and achievements. Engage with content in your field by commenting thoughtfully on posts.

**The Art of the Follow-Up**

Meeting someone is just the beginning. Send a personalized connection request mentioning where you met. Share relevant articles occasionally. Remember important details about your contacts and reference them in future conversations.

**Give Before You Take**

Networking is not about collecting contacts—it's about building mutually beneficial relationships. Offer help, share opportunities, and be genuinely interested in others' success.

**Building Your Personal Brand**

Consistent presence matters. Share your insights on social media, write articles about your field, or create content showcasing your projects. Let people know what you stand for and what you're passionate about.

Start building your network today. Join Ajira Club's networking events and connect with professionals who are invested in your success.`,
    date: "February 10, 2025",
    category: "Networking",
    readTime: "7 min read",
  },
  {
    title: "From Student to Entrepreneur: Success Stories from Ajira Club",
    excerpt:
      "Meet three Ajira Club members who successfully launched their own businesses while still studying at Kenyatta University.",
    content: `Entrepreneurship isn't about waiting for the perfect moment—it's about creating opportunities with what you have. Today, we celebrate three Ajira Club members who turned their university years into launching pads for successful businesses.

**Faith Njeri - EcoPackage Solutions**

Faith started noticing the environmental impact of packaging waste during her second year studying Environmental Science. She began experimenting with biodegradable packaging made from agricultural waste.

"Ajira Club connected me with mentors who helped refine my business model," Faith recalls. "The pitch competitions gave me the confidence to present to real investors."

Today, EcoPackage Solutions supplies sustainable packaging to over 50 businesses across Nairobi, and Faith is expanding to other counties while completing her final year.

**Kevin Otieno - TechMentorKE**

As a Computer Science student, Kevin noticed many of his peers struggled with programming concepts. He started informal tutoring sessions that grew into a full-fledged online learning platform.

"I attended Ajira Club's digital marketing workshop, which taught me how to reach students beyond KU," Kevin explains. "The club's network helped me find my first paying customers."

TechMentorKE now has over 5,000 registered students and partnerships with three universities across Kenya.

**Amina Hassan - Swahili Gourmet**

Amina combined her love for cooking with her Business Administration studies. Starting with meal prep services for busy students, she expanded into catering for campus events.

"The financial literacy sessions at Ajira Club taught me how to price my services properly and manage cash flow," Amina shares. "Without that knowledge, I would have undercharged and burned out."

Swahili Gourmet now caters for corporate events and recently opened a small restaurant near campus.

**Key Lessons from Our Entrepreneurs**

1. **Start Small, Think Big**: All three started with minimal investment and scaled gradually.
2. **Leverage Your Network**: Ajira Club connections provided early customers, mentors, and collaborators.
3. **Embrace Failure**: Each entrepreneur faced setbacks but used them as learning opportunities.
4. **Balance is Key**: They maintained their academic performance while building their ventures.
5. **Seek Knowledge**: Workshops and training sessions filled knowledge gaps and accelerated growth.

Are you ready to write your success story? Join Ajira Club and access the resources, mentorship, and community you need to launch your entrepreneurial journey.`,
    date: "February 5, 2025",
    category: "Entrepreneurship",
    readTime: "9 min read",
  },
  {
    title: "Mastering the Art of the Perfect Resume",
    excerpt:
      "Your resume is often your first impression on potential employers. Learn how to create a resume that stands out and gets you noticed.",
    content: `In a competitive job market, your resume is your ticket to the interview room. Recruiters spend an average of just 7 seconds scanning each resume, so making every word count is crucial. Here's how to craft a resume that opens doors.

**Understanding What Recruiters Want**

Before you start writing, understand that recruiters look for relevance, clarity, and impact. They want to quickly identify if you have the skills and experience for the specific role.

**The Essential Sections**

1. **Contact Information**: Keep it professional. Use your university email or a simple personal email. Include your LinkedIn profile and portfolio links if relevant.

2. **Professional Summary**: A 2-3 sentence snapshot of who you are and what you offer. Tailor this for each application.

3. **Education**: As a student or recent graduate, this section should be prominent. Include your GPA if it's strong, relevant coursework, and academic achievements.

4. **Experience**: Include internships, part-time jobs, volunteer work, and campus leadership roles. Focus on accomplishments, not just duties.

5. **Skills**: List both technical and soft skills relevant to the position. Be specific—"Proficient in Python and JavaScript" is better than "Computer skills."

6. **Projects**: Showcase relevant academic or personal projects that demonstrate your abilities.

**The Power of Action Verbs and Quantification**

Replace weak phrases with strong action verbs. Instead of "Was responsible for social media," write "Increased Instagram engagement by 45% through targeted content strategy."

Numbers make your achievements concrete. "Managed a team" becomes "Led a team of 8 volunteers to organize 12 campus events."

**Formatting Matters**

- Use clean, professional fonts (Arial, Calibri, or Garamond)
- Maintain consistent formatting throughout
- Keep it to one page as a student
- Use white space effectively—don't overcrowd
- Save as PDF to preserve formatting

**Common Mistakes to Avoid**

- Typos and grammatical errors (have someone proofread!)
- Generic objectives ("Seeking a challenging position...")
- Irrelevant information (your high school achievements, unless extraordinary)
- Unprofessional email addresses
- Inconsistent tense usage

**Tailoring Your Resume**

One-size-fits-all doesn't work. For each application, adjust your summary, highlight relevant skills, and reorder experience to match job requirements.

**ATS Optimization**

Many companies use Applicant Tracking Systems to filter resumes. Use keywords from the job description, avoid tables and graphics in the main content, and use standard section headings.

Visit Ajira Club's career resources center for resume templates and one-on-one review sessions. Our mentors are ready to help you perfect your resume!`,
    date: "January 28, 2025",
    category: "Job Search",
    readTime: "8 min read",
  },
  {
    title: "The Power of Internships: Why They Matter More Than You Think",
    excerpt:
      "Internships are more than just resume builders. Discover how the right internship can shape your career trajectory and open unexpected doors.",
    content: `Many students view internships as a box to check on their way to graduation. But the right internship can be transformative—providing clarity on your career path, building essential skills, and often leading directly to full-time employment.

**Beyond the Resume Line**

Yes, internships look good on your resume. But their real value lies in the experience itself. You'll learn how businesses operate, understand workplace dynamics, and develop professional skills that can't be taught in a classroom.

**Finding the Right Internship**

Not all internships are created equal. Here's what to look for:

- **Learning Opportunities**: Will you be given meaningful work or just making copies?
- **Mentorship**: Is there someone committed to your development?
- **Industry Relevance**: Does it align with your career goals?
- **Company Culture**: Would you enjoy working there full-time?

**Where to Look**

- University career services and job boards
- LinkedIn and company career pages
- Ajira Club's internship database and partnerships
- Networking events and industry conferences
- Direct outreach to companies you admire

**Making the Most of Your Internship**

1. **Be Proactive**: Ask for additional responsibilities when you complete assigned tasks.
2. **Network Internally**: Connect with people across departments, not just your team.
3. **Seek Feedback**: Regular check-ins with your supervisor accelerate your growth.
4. **Document Everything**: Keep track of projects, achievements, and learnings for future reference.
5. **Show Initiative**: Identify problems and propose solutions.

**The Unpaid Internship Debate**

While paid internships are preferable, don't dismiss quality unpaid opportunities if they offer genuine learning experiences. Consider the long-term return on investment, but also know your worth.

**From Intern to Employee**

Many companies use internships as extended interviews. Performance during your internship often determines whether you receive a full-time offer. Treat every day as an opportunity to prove your value.

**Building Your Professional Identity**

Internships help you understand not just what you can do, but who you want to be professionally. Pay attention to what energizes you and what drains you. This self-awareness is invaluable for career planning.

**Ajira Club's Internship Support**

We partner with companies across Kenya to provide quality internship opportunities for our members. From application preparation to post-internship reflection, we support you throughout the journey.

Start your internship search today. Your future career may depend on the connections and experiences you build now.`,
    date: "January 20, 2025",
    category: "Internships",
    readTime: "7 min read",
  },
  {
    title: "Navigating Virtual Interviews: Tips for Success",
    excerpt:
      "Virtual interviews are here to stay. Learn the essential tips and best practices to ace your next online interview and make a lasting impression.",
    content: `The shift to remote work has made virtual interviews a permanent fixture in the hiring process. Whether through Zoom, Google Meet, or Microsoft Teams, mastering the virtual interview is essential for today's job seeker.

**Setting Up Your Space**

Your environment speaks volumes before you say a word.

- **Background**: Choose a clean, uncluttered background. A plain wall or tidy bookshelf works well. Many platforms offer virtual backgrounds, but use them sparingly as they can be distracting.
- **Lighting**: Face a window or use a desk lamp in front of you. Avoid backlighting, which creates shadows on your face.
- **Camera Position**: Position your camera at eye level. Stack books under your laptop if needed. Looking down or up at the camera creates unflattering angles.
- **Audio**: Use headphones with a microphone for clearer sound. Test your audio before the interview.

**Technical Preparation**

Technology failures can derail even the best-prepared candidate.

- Test your internet connection and have a backup plan (mobile hotspot)
- Download and update the required software beforehand
- Close unnecessary applications to prevent notifications and slowdowns
- Have the interviewer's phone number handy in case of technical issues
- Charge your device fully or keep it plugged in

**Dress for Success**

Dress professionally from head to toe—you never know when you might need to stand up. Avoid busy patterns and bright colors that can be distracting on camera. Solid colors in navy, gray, or soft earth tones work best.

**Mastering Virtual Presence**

- **Eye Contact**: Look at the camera, not the screen, to simulate eye contact
- **Body Language**: Sit up straight, use hand gestures naturally, and smile
- **Speaking Pace**: Speak slightly slower than normal to account for potential lag
- **Active Listening**: Nod and provide verbal affirmations to show engagement

**Common Virtual Interview Challenges**

- **Awkward Silences**: Pauses feel longer online. Don't rush to fill them—a thoughtful pause shows you're considering your response.
- **Interruptions**: If someone interrupts, apologize briefly and continue. Interviewers understand these things happen.
- **Connection Issues**: If your connection drops, rejoin calmly and apologize briefly without over-explaining.

**Before, During, and After**

**Before**: Research the company, prepare your responses to common questions, and have specific examples ready using the STAR method (Situation, Task, Action, Result).

**During**: Have your resume, the job description, and notes nearby (but don't read from them). Keep water within reach. Take brief notes if helpful.

**After**: Send a thank-you email within 24 hours, referencing specific points from your conversation.

**Practice Makes Perfect**

Ajira Club offers virtual interview practice sessions where you can build confidence in a supportive environment. Record yourself answering common questions and review your performance critically.

Your next virtual interview is an opportunity to showcase not just your skills, but your ability to communicate effectively in digital environments—a skill employers value more than ever.`,
    date: "January 15, 2025",
    category: "Interviews",
    readTime: "8 min read",
  },
].map((blog, i) => ({ ...blog, author: getAuthor(i) }));

const categoryColors: Record<string, string> = {
  "Career Tips": "bg-primary text-primary-foreground",
  Networking: "bg-secondary text-secondary-foreground",
  Entrepreneurship: "bg-primary text-primary-foreground",
  "Job Search": "bg-secondary text-secondary-foreground",
  Internships: "bg-primary text-primary-foreground",
  Interviews: "bg-secondary text-secondary-foreground",
};

const BlogFullView = ({
  blog,
  onBack,
}: {
  blog: (typeof blogs)[0];
  onBack: () => void;
}) => (
  <div className="min-h-screen py-16">
    <div className="container mx-auto px-4 max-w-3xl relative z-10">
      <Button variant="ghost" onClick={onBack} className="mb-6 group">
        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to Blogs
      </Button>
      <Badge className={`${categoryColors[blog.category]} mb-4`}>
        {blog.category}
      </Badge>
      <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
        {blog.title}
      </h1>
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>{blog.author}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{blog.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{blog.readTime}</span>
        </div>
      </div>
      <article className="prose prose-lg max-w-none text-foreground leading-relaxed whitespace-pre-line">
        {blog.content}
      </article>
      <div className="mt-12 pt-6 border-t border-border">
        <Button variant="outline" onClick={onBack} className="group">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to all blogs
        </Button>
      </div>
    </div>
  </div>
);

const Blogs = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<number | null>(null);
  const { toast } = useToast();

  if (selectedBlog !== null) {
    return (
      <BlogFullView
        blog={blogs[selectedBlog]}
        onBack={() => setSelectedBlog(null)}
      />
    );
  }

  return (
    <div className="min-h-screen py-16 relative">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-heading font-bold mb-6">Weekly Blogs</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, tips, and stories to help you navigate your career journey.
            Updated every week with fresh content from the Kenyatta University Ajira Club.
          </p>
        </div>

        {/* Featured Post */}
        <Card className="p-8 md:p-12 mb-12 gradient-hero hover:shadow-hover transition-all">
          <Badge className="bg-secondary text-secondary-foreground mb-4">
            Featured Post
          </Badge>
          <h2 className="text-4xl font-heading font-bold text-primary-foreground mb-4">
            {blogs[0].title}
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-6 leading-relaxed">
            {blogs[0].excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/80 mb-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{blogs[0].author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{blogs[0].date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <Badge variant="secondary">{blogs[0].readTime}</Badge>
            </div>
          </div>
          <Button variant="secondary" size="lg" onClick={() => setSelectedBlog(0)}>
            Read Full Article
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Card>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(1).map((blog, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-hover transition-all hover:-translate-y-1 animate-fade-in flex flex-col bg-card/95 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Badge className={`${categoryColors[blog.category]} mb-4 w-fit`}>
                {blog.category}
              </Badge>

              <h3 className="font-heading font-bold text-xl mb-3 leading-tight">
                {blog.title}
              </h3>

              <p className="text-muted-foreground mb-4 leading-relaxed flex-grow">
                {blog.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{blog.date}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <Badge variant="outline">{blog.readTime}</Badge>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  className="group"
                  onClick={() => setSelectedBlog(index + 1)}
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Newsletter CTA */}
        <Card className="mt-20 p-8 md:p-12 bg-muted/95 backdrop-blur-sm text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Stay Updated with Weekly Insights
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our newsletter to receive the latest blog posts, career tips, and
            exclusive content directly in your inbox every week.
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!email.trim()) return;

              setIsSubmitting(true);
              const { error } = await supabase
                .from("newsletter_subscriptions")
                .insert({ email: email.trim() });

              setIsSubmitting(false);

              if (error) {
                if (error.code === "23505") {
                  toast({ title: "Already subscribed!", description: "This email is already on our list." });
                } else {
                  toast({ title: "Error", description: "Failed to subscribe. Please try again.", variant: "destructive" });
                }
              } else {
                toast({ title: "Subscribed!", description: "You've been added to our newsletter." });
                setEmail("");
              }
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Blogs;
