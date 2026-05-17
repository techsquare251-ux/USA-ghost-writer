const fs = require('fs');
const path = require('path');
const siteUrl = process.env.SITE_URL || 'https://usaghostwriter.com';

const blog = require('../src/data/blog').blogPosts || [];
const services = require('../src/data/services').services || [];

const urls = [
  { loc: '/', changefreq: 'daily', priority: '1.0' },
  { loc: '/about', changefreq: 'monthly', priority: '0.8' },
  { loc: '/services', changefreq: 'weekly', priority: '0.8' },
  { loc: '/packages', changefreq: 'weekly', priority: '0.8' },
  { loc: '/portfolio', changefreq: 'weekly', priority: '0.8' },
  { loc: '/contact-us', changefreq: 'monthly', priority: '0.6' },
  { loc: '/blog', changefreq: 'weekly', priority: '0.6' },
];

blog.forEach((post) => urls.push({ loc: `/blog/${post.slug}`, lastmod: post.publishedAt || '', changefreq: 'monthly', priority: '0.6' }));
services.forEach((svc) => urls.push({ loc: `/services/${svc.slug}`, changefreq: 'monthly', priority: '0.7' }));

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map((u) => {
    return `  <url>\n    <loc>${siteUrl}${u.loc}</loc>\n    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>\n    ` : ''}<changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`;
  })
  .join('\n')}\n</urlset>`;

fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), xml);
console.log('sitemap.xml generated with', urls.length, 'URLs');
