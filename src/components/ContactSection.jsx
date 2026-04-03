import { Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary"> Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I&apos;m always open to discussing new opportunities.
        </p>

        <div className="grid grid-cols-1 gap-12 xl:grid-cols-2">
          <div className="space-y-8 text-center">
            <h3 className="mb-6 text-2xl font-semibold text-center">
              Contact Information
            </h3>

            <div className="space-y-6">
              <div className="mx-auto flex w-full max-w-[18rem] items-start justify-start space-x-4 sm:max-w-[20rem]">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium">Email</h4>
                  <a
                    href="mailto:chauhanakshat24@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    chauhanakshat24@gmail.com
                  </a>
                </div>
              </div>

              <div className="mx-auto flex w-full max-w-[18rem] items-start justify-start space-x-4 sm:max-w-[20rem]">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium">Phone</h4>
                  <a
                    href="tel:+14436805464"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +1 (443) 680-5464
                  </a>
                </div>
              </div>

              <div className="mx-auto flex w-full max-w-[18rem] items-start justify-start space-x-4 sm:max-w-[20rem]">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium">Location</h4>
                  <p className="text-muted-foreground">Baltimore, MD, USA</p>
                </div>
              </div>
            </div>

            <div className="pt-8 text-center">
              <h4 className="font-medium mb-4">Connect With Me</h4>
              <div className="flex space-x-4 justify-center">
                <a
                  href="https://www.linkedin.com/in/akshat--chauhan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Akshat Chauhan's LinkedIn profile"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  <Linkedin />
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-card p-6 shadow-xs sm:p-8">
            <h3 className="mb-6 text-2xl font-semibold"> Send a Message</h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
