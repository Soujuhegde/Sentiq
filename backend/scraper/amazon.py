import asyncio
from playwright.async_api import async_playwright
from datetime import datetime

class AmazonScraper:
    def __init__(self, product_url):
        self.product_url = product_url

    async def fetch_reviews(self, max_pages=1):
        """
        Uses Playwright to scrape Amazon reviews.
        Note: This is a simplified version; production scrapers 
        need anti-bot handling (Rotating proxies, User-Agents).
        """
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            
            # Simple User-Agent to avoid immediate block
            await page.set_extra_http_headers({
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
            })

            reviews_data = []
            try:
                await page.goto(self.product_url, wait_until="networkidle")
                
                # Look for review elements
                review_elements = await page.query_selector_all("[data-hook='review']")
                
                for el in review_elements:
                    body = await el.query_selector("[data-hook='review-body']")
                    rating = await el.query_selector("[class*='a-icon-star']")
                    author = await el.query_selector(".a-profile-name")
                    
                    text = await body.inner_text() if body else ""
                    rating_val = await rating.inner_text() if rating else "0"
                    author_name = await author.inner_text() if author else "Anonymous"
                    
                    reviews_data.append({
                        'text': text.strip(),
                        'author': author_name,
                        'rating': int(rating_val[0]) if rating_val[0].isdigit() else 0,
                        'source': 'Amazon',
                        'timestamp': datetime.utcnow()
                    })

            except Exception as e:
                print(f"Playwright error scraping Amazon: {e}")
            finally:
                await browser.close()
            
            return reviews_data

if __name__ == "__main__":
    # Test URL - replace with real product
    test_url = "https://www.amazon.com/product-reviews/B0CZPT6TTC"
    scraper = AmazonScraper(test_url)
    loop = asyncio.get_event_loop()
    revs = loop.run_until_complete(scraper.fetch_reviews())
    print(f"Scraped {len(revs)} reviews.")
