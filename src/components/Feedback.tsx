import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, Send, MessageSquare } from "lucide-react";
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

const Feedback = () => {
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

  return (
    <section className="py-20 px-6" id="feedback">
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
            className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium mb-4"
          >
            Feedback
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
              Share Your Thoughts
            </span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            I'd love to hear your feedback! Leave a message and let me know what you think.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-green-400" />
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
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-green-500/50 focus:outline-none transition-colors"
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
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-green-500/50 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-400 hover:to-cyan-400 text-white font-semibold py-3 rounded-xl"
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

          {/* Feedback Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-white mb-6">Recent Feedback</h3>

            {feedbacks.length === 0 ? (
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                <p className="text-gray-400">No feedback yet. Be the first to share!</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {feedbacks.map((feedback, index) => (
                  <motion.div
                    key={feedback.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-semibold">{feedback.name}</h4>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < feedback.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">{feedback.message}</p>
                    <p className="text-gray-600 text-xs mt-2">
                      {new Date(feedback.created_at).toLocaleDateString()}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
