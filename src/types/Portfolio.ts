export interface Portfolio {
    id: number,
    image: string,
    title: string,
    slug: string,
    // Paragraphs separated by a blank line ("\n\n") render as separate <p> on the detail page
    description: string,
    technologies: string[],
    duration: string,
    role?: string,
    challenge?: string,
    features?: string[],
    gallery?: { src: string, caption: string }[],
    // Omit for internal projects: the "Live Preview" button only renders when a link exists
    link?: string
}
