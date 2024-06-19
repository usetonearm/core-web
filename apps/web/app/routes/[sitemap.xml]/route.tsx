export const loader = () => {
  // handle "GET" request
  // separating xml content from Response to keep clean code.
  const content = `
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
    <loc>https://usetonearm.com/</loc>
    <lastmod>2024-06-19T00:15:16+01:00</lastmod>
    <priority>1.0</priority>
    </url>
    <url>
    <loc>https://usetonearm.com/pricing</loc>
    <lastmod>2024-06-19T00:15:16+01:00</lastmod>
    <priority>0.9</priority>
    </url>
    <url>
    <loc>https://usetonearm.com/about</loc>
    <lastmod>2024-06-19T00:15:16+01:00</lastmod>
    <priority>0.9</priority>
    </url>
    <url>
    <loc>https://usetonearm.com/faq</loc>
    <lastmod>2024-06-19T00:15:16+01:00</lastmod>
    <priority>0.9</priority>
    </url>
    <url>
    <loc>https://usetonearm.com/contact</loc>
    <lastmod>2024-06-19T00:15:16+01:00</lastmod>
    <priority>0.9</priority>
    </url>
    <url>
    <loc>https://usetonearm.com/privacy-policy</loc>
    <lastmod>2024-06-19T00:15:16+01:00</lastmod>
    <priority>0.9</priority>
    </url>
    <url>
    <loc>https://usetonearm.com/terms-of-service</loc>
    <lastmod>2024-06-19T00:15:16+01:00</lastmod>
    <priority>0.9</priority>
    </url>
    <url>
    <loc>https://usetonearm.com/cookie-policy</loc>
    <lastmod>2024-06-19T00:15:16+01:00</lastmod>
    <priority>0.9</priority>
    </url>
    <url>
    <loc>https://usetonearm.com/auth/sign-in</loc>
    <lastmod>2024-06-19T00:15:16+01:00</lastmod>
    <priority>0.9</priority>
    </url>
    <url>
    <loc>https://usetonearm.com/auth/sign-up</loc>
    <lastmod>2024-06-19T00:15:16+01:00</lastmod>
    <priority>0.9</priority>
    </url>
    </urlset>
    `;
  // Return the response with the content, a status 200 message, and the appropriate headers for an XML page
  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'xml-version': '1.0',
      encoding: 'UTF-8',
    },
  });
};
