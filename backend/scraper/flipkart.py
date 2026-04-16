import asyncio
from playwright.async_api import async_playwright
from datetime import datetime

class FlipkartScraper:
    def __init__(self, product_url):
        self.product_url = product_url

    async def fetch_reviews(self):
        """
        Uses Playwright to scrape Flipkart reviews.
        """
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            
            reviews_data = []
            try:
                await page.goto(self.product_url, wait_until="networkidle")
                
                # Flipkart often uses specific col classes for reviews
                review_containers = await page.query_selector_all("div.col._2wY_pU")
                
                for el in review_containers:
                    text_el = await el.query_selector("div.t-ZTKy")
                    rating_el = await el.query_selector("div._3LWZlK")
                    author_el = await el.query_selector("p._2sc7Ds")
                    
                    text = await text_el.inner_text() if text_el else ""
                    rating = await rating_el.inner_text() if rating_el else "0"
                    author = await author_el.inner_text() if author_el else "Customer"
                    
                    reviews_data.append({
                        'text': text.strip(),
                        'author': author,
                        'rating': int(rating[0]) if rating and rating[0].isdigit() else 0,
                        'source': 'Flipkart',
                        'timestamp': datetime.utcnow()
                    })
            except Exception as e:
                print(f"Error scraping Flipkart: {e}")
            finally:
                await browser.close()
            
            return reviews_data

if __name__ == "__main__":
    test_url = "https://www.flipkart.com/apple-iphone-15-black-128-gb/product-reviews/itm059827d71c3f0"
    scraper = FlipkartScraper(test_url)
    loop = asyncio.get_event_loop()
    revs = loop.run_until_complete(scraper.fetch_reviews())
    print(f"Scraped {len(revs)} reviews from Flipkart.")
