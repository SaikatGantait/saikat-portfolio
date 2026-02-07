-- Create table for stats (Years Experience, Projects, etc.)
CREATE TABLE public.portfolio_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  value INTEGER NOT NULL,
  suffix TEXT DEFAULT '',
  icon_name TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for skills
CREATE TABLE public.portfolio_skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
  color_from TEXT NOT NULL DEFAULT '#8B5CF6',
  color_to TEXT NOT NULL DEFAULT '#06B6D4',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for tech stack categories
CREATE TABLE public.portfolio_tech_stack (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  technologies TEXT[] NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for career timeline
CREATE TABLE public.portfolio_timeline (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('work', 'education', 'achievement')),
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for projects
CREATE TABLE public.portfolio_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  tech TEXT[] NOT NULL,
  github TEXT,
  live_url TEXT,
  image_url TEXT,
  gradient TEXT NOT NULL DEFAULT 'from-purple-500/20 to-cyan-500/20',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.portfolio_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_tech_stack ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Create public read policies (portfolio is public)
CREATE POLICY "Anyone can view stats" ON public.portfolio_stats FOR SELECT USING (true);
CREATE POLICY "Anyone can view skills" ON public.portfolio_skills FOR SELECT USING (true);
CREATE POLICY "Anyone can view tech stack" ON public.portfolio_tech_stack FOR SELECT USING (true);
CREATE POLICY "Anyone can view timeline" ON public.portfolio_timeline FOR SELECT USING (true);
CREATE POLICY "Anyone can view projects" ON public.portfolio_projects FOR SELECT USING (true);

-- Insert current stats data
INSERT INTO public.portfolio_stats (label, value, suffix, icon_name, display_order) VALUES
('Years Experience', 2, '+', 'Briefcase', 1),
('Projects Completed', 15, '+', 'Rocket', 2),
('Technologies', 20, '+', 'Code', 3),
('Hackathon Wins', 2, '', 'Award', 4);

-- Insert current skills data
INSERT INTO public.portfolio_skills (name, level, color_from, color_to, display_order) VALUES
('Python', 95, '#8B5CF6', '#06B6D4', 1),
('Machine Learning', 90, '#EC4899', '#8B5CF6', 2),
('Deep Learning', 85, '#06B6D4', '#10B981', 3),
('React/TypeScript', 80, '#F59E0B', '#EF4444', 4),
('Data Analysis', 88, '#8B5CF6', '#EC4899', 5);

-- Insert current tech stack data
INSERT INTO public.portfolio_tech_stack (category, technologies, display_order) VALUES
('Frontend', ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Next.js'], 1),
('Backend', ARRAY['Python', 'FastAPI', 'Node.js', 'PostgreSQL'], 2),
('ML/AI', ARRAY['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV'], 3),
('Tools', ARRAY['Git', 'Docker', 'AWS', 'Supabase'], 4);

-- Insert current timeline data
INSERT INTO public.portfolio_timeline (year, title, description, icon_name, event_type, display_order) VALUES
('2025', 'Aptos Hackathon Winner', 'Won Aptos blockchain hackathon building decentralized applications on Move', 'Award', 'achievement', 1),
('2025', 'Algorand Hackathon Winner', 'First place at Algorand hackathon developing smart contract solutions', 'Award', 'achievement', 2),
('2025', 'Avalanche Hackathon Winner', 'Won Avalanche hackathon creating DeFi protocols and dApps', 'Award', 'achievement', 3),
('2025', 'Sidetripe Hackathon Winner', 'Champion at Sidetripe hackathon building innovative web3 solutions', 'Award', 'achievement', 4),
('2024', 'AI Research Intern', 'Working on cutting-edge machine learning projects', 'Briefcase', 'work', 5),
('2023', 'Open Source Contributor', 'Major contributions to ML libraries', 'Code', 'achievement', 6),
('2022', 'Started B.Tech', 'Computer Science with AI specialization', 'GraduationCap', 'education', 7),
('2022', 'First ML Project', 'Built sentiment analysis system', 'Rocket', 'achievement', 8);

-- Insert current projects data
INSERT INTO public.portfolio_projects (name, description, tech, github, image_url, gradient, display_order) VALUES
('Algoverse', 'Interactive algorithm visualizer with 15+ sorting and pathfinding algorithms. Built for educational purposes.', ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'], 'https://github.com/Harshit-Raj-14/Algoverse', '/src/assets/project-algoverse.png', 'from-purple-500/20 to-cyan-500/20', 1),
('Sentimatic', 'Real-time sentiment analysis using NLP and deep learning. Analyzes social media trends.', ARRAY['Python', 'TensorFlow', 'FastAPI', 'React'], 'https://github.com/Harshit-Raj-14/Sentimatic', '/src/assets/project-sentimatic.png', 'from-cyan-500/20 to-green-500/20', 2),
('MindWeaver', 'AI-powered mind mapping tool that uses GPT to generate and organize ideas automatically.', ARRAY['Next.js', 'OpenAI API', 'Prisma', 'PostgreSQL'], 'https://github.com/Harshit-Raj-14/MindWeaver', '/src/assets/project-mindweaver.png', 'from-pink-500/20 to-purple-500/20', 3),
('Pokemon-AI', 'Machine learning model that classifies Pokemon types based on their stats and images.', ARRAY['Python', 'PyTorch', 'OpenCV', 'Streamlit'], 'https://github.com/Harshit-Raj-14/Pokemon-AI', '/src/assets/project-pokemon.png', 'from-yellow-500/20 to-red-500/20', 4),
('Sora Clone', 'Text-to-video generation prototype inspired by OpenAI Sora using diffusion models.', ARRAY['Python', 'Stable Diffusion', 'FastAPI', 'React'], 'https://github.com/Harshit-Raj-14/Sora-Clone', '/src/assets/project-sora.png', 'from-blue-500/20 to-cyan-500/20', 5),
('Uptime Monitor', 'Real-time website monitoring dashboard with alerting and analytics.', ARRAY['Node.js', 'React', 'MongoDB', 'WebSockets'], 'https://github.com/Harshit-Raj-14/Uptime-Monitor', '/src/assets/project-uptime.png', 'from-green-500/20 to-emerald-500/20', 6);