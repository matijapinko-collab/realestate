export function GET() {
  const robots = `User-agent: *
Allow: /
Disallow: /admin/

Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/sitemap.xml
`;
  return new Response(robots, { headers: { "Content-Type": "text/plain" } });
}
