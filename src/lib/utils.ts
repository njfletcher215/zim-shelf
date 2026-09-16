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

const mainPagePathCache = new Map<string, string>();

// kiwix-serve has no public API exposing a ZIM's main page,
// so we haveto use the private `/content/*` endpoint.
// We capture the redirect here before translating to `/raw/*`.
async function resolveMainPagePath(zimname: string): Promise<string> {
    if (mainPagePathCache.has(zimname)) return mainPagePathCache.get(zimname)!;

    let path: string;
    try {
        const res = await fetch(`${import.meta.env.VITE_KIWIX_SERVE_BASE_URL}/content/${zimname}`, {
            method: 'HEAD',
            signal: AbortSignal.timeout(5000)
        });
        const resolvedParts = new URL(res.url).pathname.split('/'); // ['', 'content', '<zimname>', ...'<path>']
        path = resolvedParts.slice(3).join('/');
    } catch {
        path = '';
    }

    mainPagePathCache.set(zimname, path);
    return path;
}

// unlike resolveMainPagePath, this is never cached -- a random page must
// differ per call, not get stuck on whatever was first resolved
async function resolveRandomPagePath(zimname: string): Promise<string> {
    try {
        const res = await fetch(`${import.meta.env.VITE_KIWIX_SERVE_BASE_URL}/random?content=${encodeURIComponent(zimname)}`, {
            method: 'HEAD',
            signal: AbortSignal.timeout(5000)
        });
        const resolvedParts = new URL(res.url).pathname.split('/'); // ['', 'content', '<zimname>', ...'<path>']
        return resolvedParts.slice(3).join('/');
    } catch {
        return '';
    }
}

export {
    cn,
    fetchXml,
    resolveMainPagePath,
    resolveRandomPagePath
};
