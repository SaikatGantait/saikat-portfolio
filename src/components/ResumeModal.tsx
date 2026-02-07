import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  const resumeUrl = "/Saikat_Gantait_Resume.pdf";

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = resumeUrl;
    a.download = 'Saikat_Gantait_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleViewInNewTab = () => {
    window.open(resumeUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none"
          >
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 w-full max-w-2xl pointer-events-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">My Resume</h3>
                    <p className="text-xs text-muted-foreground">Saikat Gantait - Full-Stack Developer</p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* PDF Preview */}
              <div className="relative bg-white/5">
                <iframe
                  src={`${resumeUrl}#toolbar=0&navpanes=0`}
                  className="w-full h-[60vh] border-0"
                  title="Resume Preview"
                />
              </div>

              {/* Footer Actions */}
              <div className="p-4 border-t border-border flex gap-3">
                <Button 
                  onClick={handleViewInNewTab}
                  variant="outline"
                  className="flex-1 py-5"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in New Tab
                </Button>
                <Button 
                  onClick={handleDownload}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-5"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
