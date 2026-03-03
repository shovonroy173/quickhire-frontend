import { Company } from '@/types/company.types';
import vodafoneLogo from '@/assets/images/vodafone.png';
import intelLogo from '@/assets/images/intel.png';
import teslaLogo from '@/assets/images/tesla.png';
import amdLogo from '@/assets/images/amd.png';
import talkitLogo from '@/assets/images/talkit.png';

export const MOCK_COMPANIES: Company[] = [
  {
    id: '1',
    name: 'vodafone',
    logo: vodafoneLogo,
    verified: true,
  },
  {
    id: '2',
    name: 'intel',
    logo: intelLogo,
    verified: true,
  },
  {
    id: '3',
    name: 'TESSLAR',
    logo: teslaLogo,
    verified: true,
  },
  {
    id: '4',
    name: 'AMD',
    logo: amdLogo,
    verified: true,
  },
  {
    id: '5',
    name: 'Talkit',
    logo: talkitLogo,
    verified: false,
  },
];
