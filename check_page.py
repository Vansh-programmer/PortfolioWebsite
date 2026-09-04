import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        errors = []
        page.on("console", lambda msg: errors.append(f"[{msg.type}] {msg.text}") if msg.type in ["error", "warning"] else None)
        page.on("pageerror", lambda exc: errors.append(f"[uncaught exception] {exc.message}"))
        
        await page.goto("file:///home/vp/Work/PortfolioWebsite/index.html")
        await page.wait_for_timeout(2000)
        
        for e in errors:
            print(e)
            
        await browser.close()

asyncio.run(main())
