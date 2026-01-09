import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  const resumeUrl = "/resume.pdf";

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
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 flex flex-col"
          >
            <div className="bg-gray-900/95 border border-white/10 rounded-2xl overflow-hidden flex flex-col h-full shadow-2xl shadow-cyan-500/10">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                    <FileText className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Resume</h3>
                    <p className="text-sm text-gray-400">Saikat Gantait - Full-Stack Developer</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-5 h-5 text-gray-400" />
                  </a>
                  <a
                    href={resumeUrl}
                    download="Saikat_Gantait_Resume.pdf"
                  >
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </a>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors ml-2"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* PDF Viewer */}
              <div className="flex-1 bg-gray-950 p-4">
                <iframe
                  src={`${resumeUrl}#toolbar=0&navpanes=0`}
                  className="w-full h-full rounded-lg border border-white/5"
                  title="Resume Preview"
                />
              </div>

              {/* Footer with fallback */}
              <div className="p-4 border-t border-white/10 text-center">
                <p className="text-sm text-gray-500">
                  Can't see the preview?{" "}
                  <a
                    href={resumeUrl}
                    download="Saikat_Gantait_Resume.pdf"
                    className="text-cyan-400 hover:text-cyan-300 underline"
                  >
                    Download directly
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
