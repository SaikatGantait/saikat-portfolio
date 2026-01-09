import { motion } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, Twitter, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission - in production, you'd send this to your backend
    try {
      // For now, we'll just open email client with the message
      const subject = encodeURIComponent(`Portfolio Contact from ${data.name}`);
      const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`);
      
      // Open LinkedIn as primary contact method
      window.open("https://www.linkedin.com/in/saikat-gantait/", "_blank");
      
      setIsSubmitted(true);
      toast({
        title: "Message prepared!",
        description: "LinkedIn has been opened. Please send your message there.",
      });
      reset();
      
      // Reset submitted state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try reaching out via social media instead.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/SaikatGantait", label: "GitHub", color: "hover:text-foreground" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/saikat-gantait/", label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: Twitter, href: "https://x.com/skgantait", label: "Twitter", color: "hover:text-primary" },
  ];

  return (
    <section className="py-20 px-6" id="contact" aria-label="Contact section">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 to-primary bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Have a project in mind? Let's build something amazing together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-white/5 border border-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
                  <MapPin className="w-6 h-6 text-primary-foreground" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold">Location</h3>
                  <p className="text-muted-foreground">Kolkata, India</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-secondary to-pink-500">
                  <Mail className="w-6 h-6 text-primary-foreground" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold">Email</h3>
                  <p className="text-muted-foreground">Available via social links</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-border">
              <h3 className="text-foreground font-semibold mb-4">Connect with me</h3>
              <nav aria-label="Social media links">
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-xl bg-white/5 border border-border text-muted-foreground transition-all duration-300 ${social.color} hover:border-white/20 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background`}
                      aria-label={`Visit ${social.label} profile`}
                    >
                      <social.icon className="w-6 h-6" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-border"
          >
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Thank you!</h3>
                <p className="text-muted-foreground">
                  I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <h3 className="text-xl font-bold text-foreground mb-4">Send a Message</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Your name"
                    className={`bg-white/5 border-border text-foreground placeholder:text-muted-foreground focus:border-primary ${
                      errors.name ? "border-destructive" : ""
                    }`}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="your@email.com"
                    className={`bg-white/5 border-border text-foreground placeholder:text-muted-foreground focus:border-primary ${
                      errors.email ? "border-destructive" : ""
                    }`}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground">
                    Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="Your message (minimum 10 characters)"
                    rows={4}
                    className={`bg-white/5 border-border text-foreground placeholder:text-muted-foreground focus:border-primary resize-none ${
                      errors.message ? "border-destructive" : ""
                    }`}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-2">
                  Or reach out directly via LinkedIn for faster response
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
