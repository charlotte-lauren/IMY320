import axios from 'axios';
import cheerio from 'cheerio';
import Coin from './models/Coin.js';

async function updateAllCoinImages() {
  const coins = await Coin.find();

  for (const coin of coins) {
    if (!coin.Link) continue;

    try {
      const { data } = await axios.get(coin.Link);
      const $ = cheerio.load(data);
      const imgUrl = $('.coin-detail-photo img').attr('src'); // Update selector if needed

      if (imgUrl) {
        coin.img = imgUrl;
        await coin.save();
        console.log(`Updated image for ${coin.Name}`);
      }
    } catch (err) {
      console.error(`Failed for ${coin.Name}:`, err.message);
    }

    // Optional: delay between requests
    await new Promise(r => setTimeout(r, 500));
  }
}

updateAllCoinImages();
