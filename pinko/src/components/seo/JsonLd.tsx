import { site } from "@/config/site";

/**
 * Structured data describing only what is real and verifiable (brief 14.3):
 * the person and the service. No aggregateRating, no address, no employee
 * count, no awards — none of that is confirmed, and inventing it would be a
 * false claim to search engines as much as to visitors.
 */

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from our own config, not from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function PersonJsonLd() {
  const person: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.person,
    url: site.url,
    jobTitle: "Digitalni razvoj, marketing i poslovni razvoj",
    description: site.description,
    knowsAbout: [
      "Next.js",
      "Razvoj webshopova",
      "Razvoj web aplikacija",
      "API integracije i automatizacija",
      "SEO i sadržaj",
      "Email marketing",
      "Amazon i Temu prodajni kanali",
    ],
    knowsLanguage: ["hr", "en"],
  };

  if (site.contact.email) person.email = site.contact.email;
  if (site.contact.phone) person.telephone = site.contact.phoneHref;

  return <JsonLd data={person} />;
}

export function ServiceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: `${site.url}${path}`,
        serviceType: name,
        provider: { "@type": "Person", name: site.person, url: site.url },
        areaServed: [{ "@type": "Country", name: "Hrvatska" }],
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${site.url}${item.path}`,
        })),
      }}
    />
  );
}
