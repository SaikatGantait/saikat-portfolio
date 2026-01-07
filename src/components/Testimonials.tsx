import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Star, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface FeedbackItem {
  id: string;
  name: string;
  message: string;
  rating: number;
  created_at: string;
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Fetch existing feedbacks
  useEffect(() => {
    const fetchFeedbacks = async () => {
      const { data, error } = await supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Error fetching feedback:", error);
      } else {
        setFeedbacks(data || []);
      }
    };

    fetchFeedbacks();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("feedback-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "feedback",
        },
        (payload) => {
          setFeedbacks((prev) => [payload.new as FeedbackItem, ...prev].slice(0, 10));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      toast({
        title: "Please fill all fields",
        description: "Name and message are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from("feedback").insert({
      name: name.trim(),
      message: message.trim(),
      rating,
    });

    if (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Thank you!",
        description: "Your feedback has been submitted successfully.",
      });
      setName("");
      setMessage("");
      setRating(5);
    }

    setIsSubmitting(false);
  };

  const nextTestimonial = () => {
    if (feedbacks.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
    }
  };

  const prevTestimonial = () => {
    if (feedbacks.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
    }
  };

  return (
    <section className="py-20 px-6" id="testimonials">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-sm font-medium mb-4"
          >
            Testimonials
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-400 to-orange-500 bg-clip-text text-transparent">
              What People Say
            </span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Feedback from colleagues and clients I've had the pleasure to work with.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Feedback Carousel */}
          <div className="relative">
            {feedbacks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 text-center"
              >
                <Quote className="w-12 h-12 text-white/10 mx-auto mb-4" />
                <p className="text-gray-400">No feedback yet. Be the first to share your thoughts!</p>
              </motion.div>
            ) : (
              <>
                {/* Navigation Buttons */}
                <button
                  onClick={prevTestimonial}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 z-10"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                
                <button
                  onClick={nextTestimonial}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 z-10"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>

                {/* Testimonial Card */}
                <motion.div
                  key={feedbacks[currentIndex]?.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 relative overflow-hidden mx-6"
                >
                  {/* Quote Icon */}
                  <Quote className="absolute top-6 right-6 w-12 h-12 text-white/5" />
                  
                  <div className="flex flex-col items-center text-center">
                    {/* Avatar */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 p-1 mb-6 flex items-center justify-center"
                    >
                      <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-2xl font-bold text-white">
                        {feedbacks[currentIndex]?.name?.charAt(0).toUpperCase()}
                      </div>
                    </motion.div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Star
                            className={`w-5 h-5 ${
                              i < (feedbacks[currentIndex]?.rating || 0)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-600"
                            }`}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
                      "{feedbacks[currentIndex]?.message}"
                    </p>

                    {/* Author */}
                    <div>
                      <h4 className="text-white font-semibold text-lg">
                        {feedbacks[currentIndex]?.name}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        {new Date(feedbacks[currentIndex]?.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-8">
                  {feedbacks.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === currentIndex
                          ? "w-8 bg-gradient-to-r from-cyan-400 to-purple-500"
                          : "bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-pink-400" />
                Leave Feedback
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    maxLength={100}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-pink-500/50 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= (hoveredRating || rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-600"
                          } transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Your Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your thoughts..."
                    maxLength={500}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-pink-500/50 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-400 hover:to-orange-400 text-white font-semibold py-3 rounded-xl"
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;