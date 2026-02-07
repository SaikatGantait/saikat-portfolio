import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../../.env') });

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  console.error('Please make sure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateTimeline() {
  try {
    console.log('🔄 Updating timeline data...');

    // Delete old hackathon entry
    const { error: deleteError } = await supabase
      .from('portfolio_timeline')
      .delete()
      .eq('title', 'Hackathon Winner')
      .eq('year', '2023');

    if (deleteError && deleteError.code !== 'PGRST116') {
      console.error('Error deleting old entry:', deleteError);
    } else {
      console.log('✅ Deleted old hackathon entry');
    }

    // Update display order for existing entries
    const updates = [
      { title: 'AI Research Intern', year: '2024', display_order: 5 },
      { title: 'Open Source Contributor', year: '2023', display_order: 6 },
      { title: 'Started B.Tech', year: '2022', display_order: 7 },
      { title: 'First ML Project', year: '2022', display_order: 8 }
    ];

    for (const update of updates) {
      const { error } = await supabase
        .from('portfolio_timeline')
        .update({ display_order: update.display_order })
        .eq('title', update.title)
        .eq('year', update.year);

      if (error) {
        console.error(`Error updating ${update.title}:`, error);
      }
    }
    console.log('✅ Updated display order for existing entries');

    // Insert new hackathon achievements
    const newEntries = [
      {
        year: '2025',
        title: 'Aptos Hackathon Winner',
        description: 'Won Aptos blockchain hackathon building decentralized applications on Move',
        icon_name: 'Award',
        event_type: 'achievement',
        display_order: 1
      },
      {
        year: '2025',
        title: 'Algorand Hackathon Winner',
        description: 'First place at Algorand hackathon developing smart contract solutions',
        icon_name: 'Award',
        event_type: 'achievement',
        display_order: 2
      },
      {
        year: '2025',
        title: 'Avalanche Hackathon Winner',
        description: 'Won Avalanche hackathon creating DeFi protocols and dApps',
        icon_name: 'Award',
        event_type: 'achievement',
        display_order: 3
      },
      {
        year: '2025',
        title: 'Sidetripe Hackathon Winner',
        description: 'Champion at Sidetripe hackathon building innovative web3 solutions',
        icon_name: 'Award',
        event_type: 'achievement',
        display_order: 4
      }
    ];

    const { data, error } = await supabase
      .from('portfolio_timeline')
      .insert(newEntries)
      .select();

    if (error) {
      if (error.code === '23505') {
        console.log('⚠️  Entries already exist, skipping insert');
      } else {
        console.error('Error inserting new entries:', error);
        throw error;
      }
    } else {
      console.log('✅ Successfully added 4 hackathon achievements');
      console.log('📊 New entries:', data);
    }

    console.log('\n🎉 Timeline update completed!');
    
  } catch (error) {
    console.error('❌ Error updating timeline:', error);
    throw error;
  }
}

// Run the update
updateTimeline()
  .then(() => {
    console.log('\n✅ All done! Refresh your portfolio to see the changes.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Update failed:', error);
    process.exit(1);
  });
