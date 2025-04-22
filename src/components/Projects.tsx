
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "E-commerce Platform",
    description: "A full-featured online store with payment integration, user authentication, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
    tags: ["React", "Node.js", "MongoDB", "Stripe API"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "Social Media Dashboard",
    description: "Real-time analytics dashboard for social media management with data visualization.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    tags: ["Next.js", "Firebase", "TailwindCSS", "Chart.js"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "Task Management App",
    description: "Collaborative task management system with real-time updates and team permissions.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=600",
    tags: ["React", "Firebase", "Tailwind", "Redux"],
    liveLink: "#",
    githubLink: "#",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto">
        <div className="flex flex-col gap-2 mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-heading">
            Featured Projects
          </h2>
          <p className="text-muted-foreground">
            Here are some of my recent projects that showcase my skills and expertise.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-background rounded-lg overflow-hidden border card-hover flex flex-col"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="bg-muted text-muted-foreground text-sm px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 mt-auto">
                  <a 
                    href={project.liveLink} 
                    className="text-sm inline-flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </a>
                  <a 
                    href={project.githubLink} 
                    className="text-sm inline-flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    <Github className="h-4 w-4" /> Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
