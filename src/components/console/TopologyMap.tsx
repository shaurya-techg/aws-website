'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceId } from './types';
import { getServiceIcon, StationModeIcon } from './AwsIcons';

interface TopologyMapProps {
  onSelectService: (service: ServiceId) => void;
  onSwitchToStation: (service?: ServiceId) => void;
}

interface ArchNode {
  id: ServiceId;
  awsService: string;
  name: string;
  type: string;
  x: number; // percentage
  y: number; // percentage
  color: string;
  metrics: string;
  summary: string;
}

const ARCH_NODES: ArchNode[] = [
  {
    id: 'overview',
    awsService: 'Route 53 + CloudFront',
    name: 'Entry Gateway',
    type: 'Edge & CDN',
    x: 50,
    y: 12,
    color: '#B8B8D1', // soft pastel lavender
    metrics: 'Latency < 15ms',
    summary: 'Global entrance to the AWS Student Builder Group community at GGSIPU.',
  },
  {
    id: 'compute',
    awsService: 'EC2 Auto Scaling',
    name: 'Compute Clusters',
    type: 'Core Teams',
    x: 22,
    y: 42,
    color: '#E09F67', // soft pastel peach
    metrics: '6 Active Clusters',
    summary: 'Specialized domain teams: Web, AI/ML, Cloud DevOps, Cybersecurity, Design, Content.',
  },
  {
    id: 'events',
    awsService: 'Amazon EventBridge',
    name: 'Event Stream',
    type: 'Event-Driven',
    x: 78,
    y: 42,
    color: '#E5989B', // soft pastel dusty rose
    metrics: '45+ Events Dispatched',
    summary: 'Asynchronous event pipeline powering hands-on bootcamps, workshops, and hackathons.',
  },
  {
    id: 'iam',
    awsService: 'AWS IAM Identity Center',
    name: 'IAM Governance',
    type: 'Security & People',
    x: 22,
    y: 78,
    color: '#86B398', // soft pastel sage
    metrics: 'Faculty & Leads',
    summary: 'Faculty mentors, student leads, and advisory board governing club initiatives.',
  },
  {
    id: 's3',
    awsService: 'Amazon S3 + Glacier',
    name: 'Data Lake & Bento',
    type: 'Object Storage',
    x: 50,
    y: 56,
    color: '#90BEDE', // soft pastel sky
    metrics: 'Infinite Knowledge',
    summary: 'Club mission, vision, milestone archives, and high-resolution photo memories.',
  },
  {
    id: 'cloudwatch',
    awsService: 'Amazon CloudWatch',
    name: 'ClubWatch Telemetry',
    type: 'Observability',
    x: 78,
    y: 78,
    color: '#E2C799', // soft pastel warm sand
    metrics: '1,200+ Active Builders',
    summary: 'Real-time telemetry, certification achievements, member impact, and growth metrics.',
  },
];

export default function TopologyMap({
  onSelectService,
  onSwitchToStation,
}: TopologyMapProps) {
  const [selectedNode, setSelectedNode] = useState<ArchNode | null>(ARCH_NODES[1]); // EC2 default
  const [hoveredNode, setHoveredNode] = useState<ArchNode | null>(null);

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden bg-[#0a0b10]">
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Top Banner / HUD Header */}
      <div className="relative z-20 mb-4 sm:mb-6 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E09F67]/10 border border-[#E09F67]/25 text-[#E09F67] text-xs font-mono font-medium mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E09F67]" />
          INTERACTIVE ARCHITECTURE TOPOLOGY
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          AWS Cloud Architecture Graph
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Click any AWS service node to inspect live club operations, teams, and event pipelines.
        </p>
      </div>

      {/* Interactive Architecture Canvas Container */}
      <div className="relative z-10 w-full max-w-5xl h-[520px] sm:h-[620px] rounded-3xl border border-white/10 bg-[#0e1017]/85 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* VPC Boundary Frame */}
        <div className="absolute inset-4 sm:inset-6 rounded-2xl border-2 border-dashed border-white/10 pointer-events-none flex flex-col justify-between p-3 sm:p-4">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
              VPC: vpc-ggsipu-aws (10.0.0.0/16)
            </span>
            <span className="text-[#86B398] font-semibold">● ap-south-1a/b High Availability</span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 flex justify-between">
            <span>Security Groups: 6 Applied</span>
            <span>CIDR Block: 10.0.0.0/16</span>
          </div>
        </div>

        {/* Dynamic SVG Connection Cables in Soft Pastel Tones */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="cableGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B8B8D1" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#E09F67" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="cableGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B8B8D1" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#E5989B" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="cableGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E09F67" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#90BEDE" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="cableGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#90BEDE" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#86B398" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="cableGrad5" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E5989B" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#E2C799" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Route53 to EC2 */}
          <line
            x1="50%"
            y1="16%"
            x2="22%"
            y2="42%"
            stroke="url(#cableGrad1)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          {/* Route53 to EventBridge */}
          <line
            x1="50%"
            y1="16%"
            x2="78%"
            y2="42%"
            stroke="url(#cableGrad2)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          {/* Route53 to S3 */}
          <line
            x1="50%"
            y1="16%"
            x2="50%"
            y2="56%"
            stroke="#B8B8D1"
            strokeWidth="1.5"
            strokeOpacity="0.4"
            strokeDasharray="4 4"
          />
          {/* EC2 to IAM */}
          <line
            x1="22%"
            y1="42%"
            x2="22%"
            y2="78%"
            stroke="url(#cableGrad4)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          {/* EventBridge to CloudWatch */}
          <line
            x1="78%"
            y1="42%"
            x2="78%"
            y2="78%"
            stroke="url(#cableGrad5)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          {/* S3 to CloudWatch */}
          <line
            x1="50%"
            y1="56%"
            x2="78%"
            y2="78%"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          {/* S3 to IAM */}
          <line
            x1="50%"
            y1="56%"
            x2="22%"
            y2="78%"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Nodes Layer */}
        {ARCH_NODES.map((node) => {
          const isSelected = selectedNode?.id === node.id;
          const isHovered = hoveredNode?.id === node.id;

          return (
            <div
              key={node.id}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedNode(node);
                  onSelectService(node.id);
                }}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`group relative p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#181c26] shadow-xl ring-1 ring-white/20'
                    : `bg-[#0e1017]/90 hover:bg-[#141720] border border-white/[0.08] ${isHovered ? 'ring-1 ring-white/15' : ''}`
                }`}
              >
                {/* Node Vector Icon Badge */}
                <div
                  className="w-10 h-10 rounded-xl mb-1.5 flex items-center justify-center bg-white/[0.05]"
                  style={{
                    color: node.color,
                  }}
                >
                  {getServiceIcon(node.id, 'w-5 h-5')}
                </div>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-white tracking-wide">
                  {node.name}
                </span>
                <span className="text-[9px] font-mono text-[#E09F67]">
                  {node.awsService}
                </span>

                {/* Status Indicator */}
                <div className="flex items-center gap-1 mt-1 text-[9px] font-mono text-[#86B398]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#86B398]" />
                  {node.metrics}
                </div>
              </motion.button>
            </div>
          );
        })}

        {/* Floating Node Inspector Drawer (Bottom Left) */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute left-3 sm:left-6 bottom-3 sm:bottom-6 z-20 w-[calc(100%-1.5rem)] sm:w-[440px] max-w-lg rounded-2xl bg-[#0e1017]/95 border border-white/15 p-4 sm:p-5 shadow-[0_15px_40px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/[0.05]"
                    style={{
                      color: selectedNode.color,
                    }}
                  >
                    {getServiceIcon(selectedNode.id, 'w-5 h-5')}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{selectedNode.name}</h3>
                    <p className="text-[10px] font-mono text-[#E09F67]">{selectedNode.awsService}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 text-[9px] font-mono font-medium bg-[#86B398]/15 text-[#86B398] rounded">
                  ACTIVE
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-3 sm:mb-4">
                {selectedNode.summary}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <span className="text-slate-500 text-[10px] uppercase tracking-wider">Telemetry:</span>
                  <span className="text-white font-semibold bg-white/[0.06] px-2.5 py-1 rounded-md border border-white/10">
                    {selectedNode.metrics}
                  </span>
                </div>
                <button
                  onClick={() => onSwitchToStation(selectedNode.id)}
                  className="self-end sm:self-auto px-4 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#E09F67] hover:bg-[#e8aa77] text-[#0d0e15] transition-all flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap flex-shrink-0"
                >
                  Inspect Stage ↗
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mode Action Button */}
      <div className="relative z-20 mt-6 flex items-center gap-3">
        <button
          onClick={() => onSwitchToStation()}
          className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-[#0d0e15] bg-[#E09F67] hover:bg-[#e8aa77] transition-all flex items-center gap-2"
        >
          <StationModeIcon className="w-4 h-4 text-[#0d0e15]" />
          <span>Return to Console Station Mode</span>
        </button>
      </div>
    </div>
  );
}
