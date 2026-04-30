import { Router, type IRouter } from "express";

const router: IRouter = Router();

const routes = [
  "/",
  "/products",
  "/our-story",
  "/nutrition",
  "/subscribe",
  "/find-us",
  "/contact",
  "/recipes",
  "/recipes/black-pepper-salad-bowl",
  "/recipes/oregano-stir-fry",
  "/recipes/red-chilli-tikka",
  "/recipes/panevo-skewers",
  "/recipes/creamy-pepper-pasta",
  "/recipes/spicy-panevo-wrap",
  "/privacy",
  "/terms",
  "/refund-policy"
];

const hostname = "https://panevo.in";
const lastmod = new Date().toISOString().split("T")[0];

router.get("/sitemap.xml", (_req, res) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${hostname}${route}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>`).join("\n")}
</urlset>`;

  res.header("Content-Type", "text/xml");
  res.send(xml);
});

router.get("/robots.txt", (_req, res) => {
  const robots = `User-agent: *
Allow: /
Disallow: /api/
Sitemap: ${hostname}/api/sitemap.xml
`;
  res.header("Content-Type", "text/plain");
  res.send(robots);
});

export default router;
