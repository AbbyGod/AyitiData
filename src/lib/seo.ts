export const SITE_URL = 'https://ayitidata.org'
export const SITE_NAME = 'Ayiti Data'

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
