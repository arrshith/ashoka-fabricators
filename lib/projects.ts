/**
 * The project archive.
 *
 * Empty by design. An entry may only be added once the client has supplied a
 * photograph they own, the installation details, and the customer's permission
 * to name them. `imageWidth`/`imageHeight` are required so the archive can
 * honour the site-wide rule that no photograph is displayed above its native
 * resolution.
 */
export type Project = {
  slug: string;
  title: string;
  category: 'Rolling shutters' | 'Gates' | 'Automation' | 'Fabrication';
  location?: string;
  productSlug?: string;
  application?: string;
  description: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  challenge?: string;
  solution?: string;
  result?: string;
};

export const projects: Project[] = [];
