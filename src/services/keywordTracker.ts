import { KeywordRankingResult } from '@/shared/types/keyword-tracker';
import puppeteer from 'puppeteer';

export class KeywordTrackerService {
  async trackKeywords(domain: string, keywords: string[], location: string = 'google.com'): Promise<KeywordRankingResult[]> {
    try {
      // Validate inputs
      if (!domain || !keywords || keywords.length === 0) {
        throw new Error('Domain and keywords are required');
      }

      // Format domain
      const formattedDomain = domain.toLowerCase()
        .replace(/^(https?:\/\/)?(www\.)?/, '')
        .replace(/\/$/, '');

      // Format location for Google search
      const googleDomain = location.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '');
      
      const results: KeywordRankingResult[] = [];

      // Launch browser
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      try {
        const page = await browser.newPage();
        
        // Set user agent to avoid detection
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

        for (const keyword of keywords) {
          try {
            // Navigate to Google search
            const searchUrl = `https://${googleDomain}/search?q=${encodeURIComponent(keyword)}&num=100`;
            await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });

            // Wait for search results to load
            await page.waitForSelector('#search', { timeout: 10000 });

            // Extract search results
            const searchResults = await page.evaluate(() => {
              const results: Array<{ url: string; title: string; position: number }> = [];
              const links = document.querySelectorAll('#search a[href^="http"]');
              
              let position = 1;
              for (const link of links) {
                const href = (link as HTMLAnchorElement).href;
                const url = new URL(href);
                const domain = url.hostname.toLowerCase();
                
                // Skip Google's own domains and other non-result links
                if (!domain.includes('google') && !domain.includes('youtube') && !domain.includes('maps')) {
                  results.push({
                    url: href,
                    title: (link as HTMLAnchorElement).textContent?.trim() || '',
                    position
                  });
                  position++;
                  
                  // Stop after 100 results
                  if (position > 100) break;
                }
              }
              
              return results;
            }, formattedDomain);

            // Find the target domain in results
            let rank = -1;
            for (const result of searchResults) {
              const resultDomain = new URL(result.url).hostname.toLowerCase();
              if (resultDomain === formattedDomain || resultDomain.includes(formattedDomain)) {
                rank = result.position;
                break;
              }
            }

            results.push({
              keyword,
              rank,
              timestamp: new Date().toISOString()
            });

            // Add delay between searches to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
    
          } catch (error) {
            console.error(`Error tracking keyword "${keyword}":`, error);
            // Add failed result
            results.push({
      keyword,
              rank: -1,
      timestamp: new Date().toISOString()
            });
          }
        }

      } finally {
        await browser.close();
      }

      return results;

    } catch (error) {
      console.error('Error in trackKeywords:', error);
      throw new Error(`Failed to track keywords: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const keywordTracker = new KeywordTrackerService(); 