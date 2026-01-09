import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Stat {
  label: string;
  value: number;
  suffix: string;
}

interface Skill {
  name: string;
  level: number;
}

interface TechStack {
  category: string;
  technologies: string[];
}

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  event_type: string;
}

interface Project {
  name: string;
  description: string;
  tech: string[];
  github: string | null;
}

// Simple PDF generation using raw PDF format
function generatePDF(
  stats: Stat[],
  skills: Skill[],
  techStack: TechStack[],
  timeline: TimelineItem[],
  projects: Project[]
): string {
  const lines: string[] = [];
  let y = 750;
  const lineHeight = 14;
  const pageWidth = 612;
  const margin = 50;
  
  // Helper to add text
  const addText = (text: string, size: number = 10, isBold: boolean = false) => {
    const fontName = isBold ? '/F2' : '/F1';
    lines.push(`BT ${fontName} ${size} Tf ${margin} ${y} Td (${escapeText(text)}) Tj ET`);
    y -= lineHeight;
  };
  
  const addLine = () => {
    y -= 5;
    lines.push(`${margin} ${y} m ${pageWidth - margin} ${y} l S`);
    y -= 10;
  };

  const escapeText = (text: string): string => {
    return text
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')
      .replace(/[^\x20-\x7E]/g, ''); // Remove non-ASCII
  };

  // Header
  addText('SAIKAT GANTAIT', 24, true);
  y -= 5;
  addText('Full-Stack Developer | React | TypeScript | Node.js | AWS', 11);
  addText('Email: saikatgantait@gmail.com | LinkedIn: linkedin.com/in/saikat-gantait', 9);
  addText('GitHub: github.com/SaikatGantait | Location: Kolkata, India', 9);
  y -= 10;
  addLine();

  // Summary
  addText('PROFESSIONAL SUMMARY', 12, true);
  y -= 5;
  addText('Passionate full-stack developer with expertise in building scalable web applications.', 10);
  addText('Focused on clean code, performance optimization, and seamless user experiences.', 10);
  y -= 10;

  // Stats
  if (stats.length > 0) {
    const statsText = stats.map(s => `${s.value}${s.suffix} ${s.label}`).join(' | ');
    addText(statsText, 9);
    y -= 10;
  }

  addLine();

  // Experience
  addText('EXPERIENCE', 12, true);
  y -= 5;
  const workItems = timeline.filter(t => t.event_type === 'work');
  workItems.forEach(item => {
    addText(`${item.title}`, 11, true);
    addText(`${item.year}`, 9);
    addText(item.description, 9);
    y -= 8;
  });

  addLine();

  // Education
  addText('EDUCATION', 12, true);
  y -= 5;
  const eduItems = timeline.filter(t => t.event_type === 'education');
  eduItems.forEach(item => {
    addText(`${item.title}`, 11, true);
    addText(`${item.year}`, 9);
    addText(item.description, 9);
    y -= 8;
  });

  addLine();

  // Skills
  addText('TECHNICAL SKILLS', 12, true);
  y -= 5;
  techStack.forEach(stack => {
    addText(`${stack.category}: ${stack.technologies.join(', ')}`, 9);
  });
  y -= 10;

  addLine();

  // Projects
  addText('FEATURED PROJECTS', 12, true);
  y -= 5;
  projects.slice(0, 4).forEach(project => {
    addText(`${project.name}`, 11, true);
    addText(project.description.substring(0, 100) + (project.description.length > 100 ? '...' : ''), 9);
    addText(`Technologies: ${project.tech.join(', ')}`, 9);
    if (project.github) {
      addText(`GitHub: ${project.github}`, 8);
    }
    y -= 8;
  });

  addLine();

  // Achievements
  addText('ACHIEVEMENTS', 12, true);
  y -= 5;
  const achievements = timeline.filter(t => t.event_type === 'achievement');
  achievements.forEach(item => {
    addText(`${item.year} - ${item.title}`, 10, true);
    addText(item.description, 9);
    y -= 5;
  });

  // Build PDF content
  const contentStream = lines.join('\n');
  const streamLength = contentStream.length;

  const pdf = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>
endobj
4 0 obj
<< /Length ${streamLength} >>
stream
${contentStream}
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
6 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000266 00000 n 
0000000${String(350 + streamLength).padStart(3, '0')} 00000 n 
0000000${String(420 + streamLength).padStart(3, '0')} 00000 n 
trailer
<< /Size 7 /Root 1 0 R >>
startxref
${500 + streamLength}
%%EOF`;

  return pdf;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting resume PDF generation...');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all portfolio data in parallel
    const [statsRes, skillsRes, techStackRes, timelineRes, projectsRes] = await Promise.all([
      supabase.from('portfolio_stats').select('*').order('display_order'),
      supabase.from('portfolio_skills').select('*').order('display_order'),
      supabase.from('portfolio_tech_stack').select('*').order('display_order'),
      supabase.from('portfolio_timeline').select('*').order('display_order'),
      supabase.from('portfolio_projects').select('*').eq('is_featured', true).order('display_order'),
    ]);

    console.log('Data fetched successfully');

    const stats = statsRes.data || [];
    const skills = skillsRes.data || [];
    const techStack = techStackRes.data || [];
    const timeline = timelineRes.data || [];
    const projects = projectsRes.data || [];

    // Generate PDF
    const pdfContent = generatePDF(stats, skills, techStack, timeline, projects);
    
    console.log('PDF generated successfully');

    return new Response(pdfContent, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Saikat_Gantait_Resume.pdf"',
      },
    });
  } catch (error: unknown) {
    console.error('Error generating resume:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Failed to generate resume', details: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
