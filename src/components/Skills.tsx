
import { CheckCircle } from "lucide-react";

const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Redux"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "MongoDB", "Firebase", "RESTful APIs"]
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "VS Code", "Figma", "Vercel"]
  },
];

const Skills = () => {
  return (
    <section id="skills" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className="flex flex-col gap-2 mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-heading">
            Technical Skills
          </h2>
          <p className="text-muted-foreground">
            My expertise spans across various technologies, focusing on modern JavaScript frameworks and tools.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skillGroup, index) => (
            <div key={index} className="bg-background rounded-lg border p-6 card-hover">
              <h3 className="text-xl font-bold mb-4">{skillGroup.category}</h3>
              <ul className="space-y-3">
                {skillGroup.items.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
