export interface Portfolio {
    id: number,
    image: string,
    title: string,
    slug: string,
    description: string,
    technologies: string[],
    duration: string,
    role?: string,
    challenge?: string
}