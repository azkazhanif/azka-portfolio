import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { portfolios } from "@/data/portfolio";
import { SITE_AUTHOR, SITE_URL } from "@/lib/site";
import ProjectDetail from "./ProjectDetail";

type Params = Promise<{ slug: string }>;

// Pre-render every project page at build time
export const generateStaticParams = () => portfolios.map((project) => ({ slug: project.slug }));
export const dynamicParams = false;

// First paragraph, trimmed to a search-snippet length
const summarize = (text: string, max = 158) => {
  const firstParagraph = text.split(/\n\s*\n/)[0].replace(/\s+/g, " ").trim();
  if (firstParagraph.length <= max) return firstParagraph;
  return firstParagraph.slice(0, firstParagraph.lastIndexOf(" ", max - 1)) + "…";
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolios.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.title} — Case Study`;
  const description = project.description
    ? summarize(project.description)
    : `${project.title}, a project by ${SITE_AUTHOR}.`;
  const url = `/portfolio/${project.slug}`;
  const images = project.image ? [{ url: project.image, alt: `${project.title} by ${SITE_AUTHOR}` }] : undefined;

  return {
    title,
    description,
    keywords: [project.title, ...project.technologies, SITE_AUTHOR, "Case Study", "Portfolio"],
    alternates: { canonical: url },
    openGraph: { type: "article", url, title, description, ...(images && { images }) },
    twitter: { card: "summary_large_image", title, description, ...(images && { images: images.map((i) => i.url) }) },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const project = portfolios.find((p) => p.slug === slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    url: `${SITE_URL}/portfolio/${project.slug}`,
    description: project.description ? summarize(project.description, 300) : undefined,
    ...(project.image && { image: `${SITE_URL}${project.image}` }),
    // schema.org expects a date, so only plain years ("2026") qualify; ranges like "March 2024 - Now" are skipped
    ...(/^\d{4}$/.test(project.duration) && { dateCreated: project.duration }),
    keywords: project.technologies.join(", "),
    author: { "@id": `${SITE_URL}/#person` },
    creator: { "@type": "Person", name: SITE_AUTHOR, url: SITE_URL },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProjectDetail slug={slug} />
    </>
  );
}
