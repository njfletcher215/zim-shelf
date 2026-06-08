import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

async function fetchXml(url: string): Promise<Document> {
    const res = await fetch(url);
    const text = await res.text();
    return new DOMParser().parseFromString(text, 'application/xml');
}

export {
    cn,
    fetchXml
};
