
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Hero = () => {
  return (
    <section id="home" className="section-padding min-h-[90vh] flex items-center">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Text Content */}
          <div className="flex-1 flex flex-col gap-6 max-w-3xl">
            <div className="flex items-center gap-2">
              <div className="h-1 w-10 bg-primary"></div>
              <p className="text-muted-foreground">Fullstack Developer</p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading">
              Building <span className="heading-gradient">digital experiences</span>{" "}
              that make an impact
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              I'm a fullstack developer specialized in building modern web applications
              with React, Next.js, Node.js, and more. Let's bring your ideas to life.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <a href="#projects" className="btn-primary inline-flex items-center gap-2">
                View Projects <ArrowRight className="h-4 w-4" />
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 border border-border rounded-md hover:bg-accent transition-colors"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <Avatar className="w-64 h-64 md:w-80 md:h-80 border-4 border-primary/50 shadow-lg">
              <AvatarImage 
                src="/placeholder.svg" 
                alt="Developer Profile Picture" 
                className="object-cover"
              />
              <AvatarFallback>Dev</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
