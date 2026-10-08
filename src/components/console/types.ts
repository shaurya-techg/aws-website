export type ViewMode = 'station' | 'topology' | 'stream';

export type ServiceId = 'overview' | 'compute' | 'events' | 'iam' | 's3' | 'cloudwatch' | 'deploy';

export interface ServiceNode {
  id: ServiceId;
  label: string;
  awsCode: string;
  category: 'core' | 'storage' | 'security';
  description: string;
  shortcut: string;
  badge?: string;
  color: string; // pastel category accent
}

export interface RegionInfo {
  id: string;
  name: string;
  city: string;
  latency: number;
  status: 'optimal' | 'degraded' | 'offline';
}

export const AWS_REGIONS: RegionInfo[] = [
  { id: 'ap-south-1', name: 'Asia Pacific (Mumbai / Delhi)', city: 'Delhi Campus', latency: 14, status: 'optimal' },
  { id: 'us-east-1', name: 'US East (N. Virginia)', city: 'Global Cloud', latency: 148, status: 'optimal' },
  { id: 'eu-central-1', name: 'Europe (Frankfurt)', city: 'EU Bridge', latency: 112, status: 'optimal' },
  { id: 'ap-southeast-1', name: 'Asia Pacific (Singapore)', city: 'Pacific Relay', latency: 68, status: 'optimal' },
];

export const SERVICE_NODES: ServiceNode[] = [
  {
    id: 'overview',
    label: 'Mission Control',
    awsCode: 'MGMT',
    category: 'core',
    description: 'Console Home & 3D Interactive Model',
    shortcut: '1',
    badge: 'LIVE',
    color: '#E09F67', // pastel peach
  },
  {
    id: 'compute',
    label: 'Compute Clusters',
    awsCode: 'EC2',
    category: 'core',
    description: '6 Core Technical Teams & Domains',
    shortcut: '2',
    badge: '6 TEAMS',
    color: '#E09F67', // AWS compute orange / pastel peach
  },
  {
    id: 'events',
    label: 'EventBridge',
    awsCode: 'EVBR',
    category: 'core',
    description: 'Workshops, Hackathons & Event Stream',
    shortcut: '3',
    badge: 'ACTIVE',
    color: '#C4B5FD', // AWS event lavender / magenta
  },
  {
    id: 's3',
    label: 'S3 Data Lake',
    awsCode: 'S3',
    category: 'storage',
    description: 'About Us, Mission, Vision & Bento Gallery',
    shortcut: '4',
    color: '#86B398', // AWS storage pastel sage green
  },
  {
    id: 'cloudwatch',
    label: 'CloudWatch',
    awsCode: 'CW',
    category: 'storage',
    description: 'Community Telemetry & Impact Milestones',
    shortcut: '5',
    color: '#F4A261', // AWS monitoring pastel amber
  },
  {
    id: 'iam',
    label: 'IAM Roles',
    awsCode: 'IAM',
    category: 'security',
    description: 'Faculty Mentors & Student Leadership',
    shortcut: '6',
    color: '#A5B4FC', // AWS IAM pastel periwinkle
  },
  {
    id: 'deploy',
    label: 'CodeDeploy',
    awsCode: 'DPLY',
    category: 'security',
    description: 'Deploy to WhatsApp & Meetup Channels',
    shortcut: '7',
    badge: 'JOIN',
    color: '#E09F67', // pastel peach
  },
];
