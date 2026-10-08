'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceId, ViewMode } from './types';
import {
  MgmtServiceIcon,
  Ec2ServiceIcon,
  EventBridgeServiceIcon,
  IamServiceIcon,
  S3ServiceIcon,
  CloudWatchServiceIcon,
  DeployServiceIcon,
  TopologyModeIcon,
  StreamModeIcon,
  TerminalIcon,
  SearchIcon,
} from './AwsIcons';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (service: ServiceId) => void;
  onSwitchMode: (mode: ViewMode) => void;
  onOpenCloudShell: () => void;
}

interface PaletteItem {
  id: string;
  title: string;
  category: 'Service' | 'Team' | 'Action' | 'Layout';
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onSelectService,
  onSwitchMode,
  onOpenCloudShell,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global keybind: Cmd+K / Ctrl+K / Option+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') || (e.altKey && e.key.toLowerCase() === 's')) {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const items: PaletteItem[] = [
    {
      id: 's-overview',
      title: 'Mission Control (Home Hero & 3D Logo)',
      category: 'Service',
      icon: <MgmtServiceIcon className="w-4 h-4 text-[#E09F67]" />,
      action: () => {
        onSelectService('overview');
        onClose();
      },
    },
    {
      id: 's-compute',
      title: 'EC2 Compute Clusters (Technical Domains)',
      category: 'Service',
      icon: <Ec2ServiceIcon className="w-4 h-4 text-[#E09F67]" />,
      action: () => {
        onSelectService('compute');
        onClose();
      },
    },
    {
      id: 's-events',
      title: 'EventBridge (Live Workshops & Hackathons)',
      category: 'Service',
      icon: <EventBridgeServiceIcon className="w-4 h-4 text-[#C4B5FD]" />,
      action: () => {
        onSelectService('events');
        onClose();
      },
    },
    {
      id: 's-iam',
      title: 'IAM Roles (Faculty Mentors & Student Leads)',
      category: 'Service',
      icon: <IamServiceIcon className="w-4 h-4 text-[#A5B4FC]" />,
      action: () => {
        onSelectService('iam');
        onClose();
      },
    },
    {
      id: 's-s3',
      title: 'S3 Data Lake (About Us & Bento Gallery)',
      category: 'Service',
      icon: <S3ServiceIcon className="w-4 h-4 text-[#86B398]" />,
      action: () => {
        onSelectService('s3');
        onClose();
      },
    },
    {
      id: 's-cw',
      title: 'CloudWatch Telemetry (Stats & Impact Metrics)',
      category: 'Service',
      icon: <CloudWatchServiceIcon className="w-4 h-4 text-[#F4A261]" />,
      action: () => {
        onSelectService('cloudwatch');
        onClose();
      },
    },
    {
      id: 'm-topo',
      title: 'Switch to Interactive Topology Map View',
      category: 'Layout',
      icon: <TopologyModeIcon className="w-4 h-4 text-[#86B398]" />,
      action: () => {
        onSwitchMode('topology');
        onClose();
      },
    },
    {
      id: 'm-stream',
      title: 'Switch to Continuous Stream Mode',
      category: 'Layout',
      icon: <StreamModeIcon className="w-4 h-4 text-[#A5B4FC]" />,
      action: () => {
        onSwitchMode('stream');
        onClose();
      },
    },
    {
      id: 'a-shell',
      title: 'Launch AWS CloudShell Terminal',
      category: 'Action',
      icon: <TerminalIcon className="w-4 h-4 text-[#E09F67]" />,
      action: () => {
        onOpenCloudShell();
        onClose();
      },
    },
    {
      id: 'a-join',
      title: 'Join AWS Student Builder Group (Meetup / WhatsApp)',
      category: 'Action',
      icon: <DeployServiceIcon className="w-4 h-4 text-[#E09F67]" />,
      action: () => {
        onSelectService('deploy');
        onClose();
      },
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? (filteredItems.length ? filteredItems.length - 1 : 0) : prev - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Palette Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl rounded-2xl border border-white/20 bg-[#0e1118] shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden z-10"
          >
            {/* Search Input Box */}
            <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-white/[0.02]">
              <SearchIcon className="w-5 h-5 text-slate-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search services, teams, actions (or press Esc)..."
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-400 outline-none font-mono"
              />
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-400 border border-white/10">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="p-6 text-center text-xs font-mono text-slate-400">
                  No matching services or operations found.
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
                        isSelected
                          ? 'bg-white/[0.08] text-white'
                          : 'text-slate-300 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center">
                          {item.icon}
                        </div>
                        <span className="text-xs font-medium text-white">{item.title}</span>
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-slate-300">
                        {item.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Bottom Keyboard Legend */}
            <div className="px-4 py-2 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-[10px] font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span>Navigate: <kbd className="px-1 bg-white/5 rounded border border-white/10">↑</kbd> <kbd className="px-1 bg-white/5 rounded border border-white/10">↓</kbd></span>
                <span>Select: <kbd className="px-1 bg-white/5 rounded border border-white/10">↵</kbd></span>
              </div>
              <span className="text-[#E09F67]">AWS Management Console</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
