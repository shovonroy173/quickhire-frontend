import { StaticImageData } from 'next/image';

export interface Company {
  id: string;
  name: string;
  logo: string | StaticImageData;
  verified: boolean;
  website?: string;
}
