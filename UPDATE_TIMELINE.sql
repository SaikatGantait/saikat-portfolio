-- Run this SQL in your Supabase SQL Editor
-- Dashboard: https://supabase.com/dashboard/project/cnvtfvlkkpbkuuqiryqk/sql

-- Step 1: Delete old hackathon entry
DELETE FROM public.portfolio_timeline 
WHERE title = 'Hackathon Winner' AND year = '2023';

-- Step 2: Update display order for existing entries
UPDATE public.portfolio_timeline 
SET display_order = 5 
WHERE title = 'AI Research Intern' AND year = '2024';

UPDATE public.portfolio_timeline 
SET display_order = 6 
WHERE title = 'Open Source Contributor' AND year = '2023';

UPDATE public.portfolio_timeline 
SET display_order = 7 
WHERE title = 'Started B.Tech' AND year = '2022';

UPDATE public.portfolio_timeline 
SET display_order = 8 
WHERE title = 'First ML Project' AND year = '2022';

-- Step 3: Insert new hackathon achievements for 2025
INSERT INTO public.portfolio_timeline (year, title, description, icon_name, event_type, display_order) VALUES
('2025', 'Aptos Hackathon Winner', 'Won Aptos blockchain hackathon building decentralized applications on Move', 'Award', 'achievement', 1),
('2025', 'Algorand Hackathon Winner', 'First place at Algorand hackathon developing smart contract solutions', 'Award', 'achievement', 2),
('2025', 'Avalanche Hackathon Winner', 'Won Avalanche hackathon creating DeFi protocols and dApps', 'Award', 'achievement', 3),
('2025', 'Sidetripe Hackathon Winner', 'Champion at Sidetripe hackathon building innovative web3 solutions', 'Award', 'achievement', 4);

-- Verify the data
SELECT * FROM public.portfolio_timeline ORDER BY display_order;
