type Offer = { price: string | number; priceCurrency: string; availability?: string; url?: string };

export function ProductSchema({
  name,
  description,
  image,
  brand,
  offers,
}: {
  name: string;
  description: string;
  image: string;
  brand: string;
  offers?: Offer;
}) {
  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    brand: { "@type": "Brand", name: brand },
    offers: offers
      ? {
          "@type": "Offer",
          price: String(offers.price),
          priceCurrency: offers.priceCurrency,
          availability: offers.availability,
          url: offers.url,
        }
      : undefined,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }} />;
}

export default ProductSchema;
