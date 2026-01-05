import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import linkedinCover from "@/assets/linkedin-cover.png";

const Index = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = linkedinCover;
    link.download = "saikat-gantait-linkedin-cover.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Your LinkedIn Cover Image
          </h1>
          <p className="text-slate-300">
            SAIKAT GANTAIT | Full-Stack Developer
          </p>
        </div>

        <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-teal-500/20 border border-slate-700">
          <img
            src={linkedinCover}
            alt="LinkedIn Cover for Saikat Gantait - Full Stack Developer"
            className="w-full h-auto"
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button
            onClick={handleDownload}
            size="lg"
            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-semibold px-8 py-6 text-lg shadow-lg shadow-teal-500/30 transition-all hover:shadow-teal-500/50"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Cover Image
          </Button>
          
          <p className="text-sm text-slate-400 text-center max-w-md">
            Recommended size: 1584 × 396 pixels. Right-click the image to save, or use the download button above.
          </p>
        </div>

        <div className="text-center pt-8 border-t border-slate-700">
          <p className="text-slate-500 text-sm">
            Tech Stack Featured: React • TypeScript • Node.js • AWS
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
