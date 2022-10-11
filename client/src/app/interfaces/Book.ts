export interface Book {
    id: number,
    title: string
    author: string
    description?: string
    cover_image?: string
}

export interface BookCreate {
    title: string
    author: string
    description?: string
    cover_image?: File
}