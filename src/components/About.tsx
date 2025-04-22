
const About = () => {
  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600" 
              alt="Developer" 
              className="rounded-lg shadow-xl"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-10 bg-primary"></div>
              <p className="text-muted-foreground">About Me</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Passionate about creating exceptional web experiences
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                With over 5 years of experience in web development, I specialize in building high-performance, 
                user-friendly applications using modern technologies like React, Node.js, and Next.js.
              </p>
              <p>
                My approach combines technical expertise with a strong focus on user experience, 
                ensuring that the applications I build are not only functionally robust but also 
                intuitive and enjoyable to use.
              </p>
              <p>
                I'm constantly exploring new technologies and methodologies to enhance my skillset and 
                deliver cutting-edge solutions to complex problems.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold">Education</h4>
                <p className="text-muted-foreground">B.S. Computer Science</p>
              </div>
              <div>
                <h4 className="font-bold">Experience</h4>
                <p className="text-muted-foreground">5+ Years</p>
              </div>
              <div>
                <h4 className="font-bold">Location</h4>
                <p className="text-muted-foreground">San Francisco, CA</p>
              </div>
              <div>
                <h4 className="font-bold">Languages</h4>
                <p className="text-muted-foreground">English, Spanish</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
