'use client';

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// ─── AWS SERVICE BADGES (AUTHENTIC GEOMETRIC EMBEDDED ICONS) ───

// MGMT / AWS Management Console Badge (Warm Pastel Peach / Slate)
export function MgmtServiceIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <path d="M7 6.5h-.01M17.5 6.5h-.01M17.5 17.5h-.01M6.5 17.5h1" strokeLinecap="round" strokeWidth="2.5" />
    </svg>
  );
}

// EC2 Compute Badge (Compute Circuit / Processor)
export function Ec2ServiceIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <path d="M9 9h6v6H9z" />
      <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" strokeLinecap="round" />
    </svg>
  );
}

// EventBridge / Event Router Badge (Event Bus Nodes & Pipeline)
export function EventBridgeServiceIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="12" cy="18" r="3" />
      <path d="M8.5 7.5l4.5 8M15.5 7.5l-4.5 8M9 6h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// IAM Identity & Access Management Badge (Key & Security Shield)
export function IamServiceIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M12 2L4 5.5v6c0 5 3.5 9.7 8 10.5 4.5-.8 8-5.5 8-10.5v-6L12 2z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M8.5 16c0-1.8 1.6-3.2 3.5-3.2s3.5 1.4 3.5 3.2" strokeLinecap="round" />
    </svg>
  );
}

// S3 Simple Storage Service Badge (Storage Bucket / Cube)
export function S3ServiceIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M21 8v8a2 2 0 0 1-1 1.73l-7 4a2 2 0 0 1-2 0l-7-4A2 2 0 0 1 3 16V8a2 2 0 0 1 1-1.73l7-4a2 2 0 0 1 2 0l7 4A2 2 0 0 1 21 8z" />
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// CloudWatch Observability Badge (Telemetry Metrics & Dial Chart)
export function CloudWatchServiceIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 14l4-5 4 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="21" cy="5" r="1.5" fill="currentColor" />
    </svg>
  );
}

// CodeDeploy / Community Launch Badge (Rocket / Launch Vector Outline)
export function DeployServiceIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2.5 5-2.5M15 18v5s3.03-.55 4.5-2c1.63-1.62 2.5-5 2.5-5" strokeLinecap="round" />
    </svg>
  );
}

// ─── AWS CONSOLE UI UTILITIES ───

// 3x3 Dots Grid ("Services" Menu Button)
export function GridDotsIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className}>
      <circle cx="2.5" cy="2.5" r="1.5" />
      <circle cx="8" cy="2.5" r="1.5" />
      <circle cx="13.5" cy="2.5" r="1.5" />
      <circle cx="2.5" cy="8" r="1.5" />
      <circle cx="8" cy="8" r="1.5" />
      <circle cx="13.5" cy="8" r="1.5" />
      <circle cx="2.5" cy="13.5" r="1.5" />
      <circle cx="8" cy="13.5" r="1.5" />
      <circle cx="13.5" cy="13.5" r="1.5" />
    </svg>
  );
}

// Search Magnifying Glass
export function SearchIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
    </svg>
  );
}

// CloudShell Terminal (`>_`)
export function TerminalIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <polyline points="4 17 10 11 4 5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="19" x2="20" y2="19" strokeLinecap="round" />
    </svg>
  );
}

// Notification Bell
export function BellIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Help Circle (?)
export function HelpIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Settings Gear
export function SettingsIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

// Station Mode / Sliders Icon
export function StationModeIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <line x1="4" y1="21" x2="4" y2="14" strokeLinecap="round" />
      <line x1="4" y1="10" x2="4" y2="3" strokeLinecap="round" />
      <line x1="12" y1="21" x2="12" y2="12" strokeLinecap="round" />
      <line x1="12" y1="8" x2="12" y2="3" strokeLinecap="round" />
      <line x1="20" y1="21" x2="20" y2="16" strokeLinecap="round" />
      <line x1="20" y1="12" x2="20" y2="3" strokeLinecap="round" />
      <line x1="1" y1="14" x2="7" y2="14" strokeLinecap="round" />
      <line x1="9" y1="8" x2="15" y2="8" strokeLinecap="round" />
      <line x1="17" y1="16" x2="23" y2="16" strokeLinecap="round" />
    </svg>
  );
}

// Topology Mode / Network Graph Icon
export function TopologyModeIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" strokeLinecap="round" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" strokeLinecap="round" />
    </svg>
  );
}

// Stream Mode / Document Stream Icon
export function StreamModeIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" />
      <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" />
      <line x1="10" y1="9" x2="8" y2="9" strokeLinecap="round" />
    </svg>
  );
}

// External Link (`↗`)
export function ExternalLinkIcon({ className = 'w-3.5 h-3.5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="15 3 21 3 21 9" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round" />
    </svg>
  );
}

// Refresh / Reset Layout Icon
export function RefreshIcon({ className = 'w-3.5 h-3.5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M23 4v6h-6M1 20v-6h6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Plus Icon (+ Add widgets)
export function PlusIcon({ className = 'w-3.5 h-3.5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
      <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
      <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
    </svg>
  );
}

// Chevron Right Icon
export function ChevronRightIcon({ className = 'w-3.5 h-3.5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Chevron Down Icon
export function ChevronDownIcon({ className = 'w-3.5 h-3.5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Sidebar Collapse / Expand Toggle
export function SidebarToggleIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <path d="M15 10l-2 2 2 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Helper function to render service icon by ServiceId
export function getServiceIcon(id: string, className = 'w-5 h-5') {
  switch (id) {
    case 'overview':
    case 'mgmt':
      return <MgmtServiceIcon className={className} />;
    case 'compute':
    case 'ec2':
      return <Ec2ServiceIcon className={className} />;
    case 'events':
    case 'evbr':
    case 'eventbridge':
      return <EventBridgeServiceIcon className={className} />;
    case 's3':
      return <S3ServiceIcon className={className} />;
    case 'cloudwatch':
    case 'cw':
      return <CloudWatchServiceIcon className={className} />;
    case 'iam':
      return <IamServiceIcon className={className} />;
    case 'deploy':
    case 'dply':
      return <DeployServiceIcon className={className} />;
    default:
      return <MgmtServiceIcon className={className} />;
  }
}

// User / Account Icon
export function UserAccountIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}


