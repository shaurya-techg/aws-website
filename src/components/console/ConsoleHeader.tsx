'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewMode, RegionInfo, AWS_REGIONS } from './types';
import Image from 'next/image';
import Logo from '../../../public/new_logo.jpeg';
import {
  SearchIcon,
  TerminalIcon,
  StationModeIcon,
  TopologyModeIcon,
  StreamModeIcon,
  ChevronDownIcon,
} from './AwsIcons';

interface ConsoleHeaderProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  onToggleCloudShell: () => void;
  isCloudShellOpen: boolean;
  onOpenSearch: () => void;
  activeServiceLabel?: string;
}

export default function ConsoleHeader({
  currentMode,
  onModeChange,
  onToggleCloudShell,
  isCloudShellOpen,
  onOpenSearch,
  activeServiceLabel = 'Mission Control',
}: ConsoleHeaderProps) {
  const [selectedRegion, setSelectedRegion] = useState<RegionInfo>(AWS_REGIONS[0]);
  const [isRegionMenuOpen, setIsRegionMenuOpen] = useState(false);
  const [latencyJitter, setLatencyJitter] = useState(selectedRegion.latency);

  // Simulated regional latency jitter
  useEffect(() => {
    const interval = setInterval(() => {
      const jitter = Math.floor(Math.random() * 5) - 2;
      setLatencyJitter(Math.max(8, selectedRegion.latency + jitter));
    }, 4000);
    return () => clearInterval(interval);
  }, [selectedRegion]);

  return (
    <header className="sticky top-0 left-0 right-0 z-40 w-full border-b border-white/[0.08] bg-[#0b0d14] backdrop-blur-2xl transition-all duration-300">
      <div className="w-full px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
        {/* Left: AWS Brand Mark & Region Indicator */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <Image
                src={Logo.src}
                alt="AWS Student Builder Group Logo"
                width={36}
                height={36}
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg object-contain ring-1 ring-white/10"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-[#86B398] rounded-full ring-2 ring-[#0b0d14]" />
            </div>
            <div className="hidden sm:flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs sm:text-sm text-white tracking-wide font-mono">
                  AWS <span className="text-[#E09F67]">Console</span>
                </span>
                <span className="px-1.5 py-0.2 text-[9px] font-mono font-semibold uppercase tracking-wider bg-white/10 text-slate-300 rounded">
                  GGSIPU
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono truncate max-w-[140px]">
                {activeServiceLabel}
              </span>
            </div>
          </div>

          {/* Clean Region Picker Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRegionMenuOpen(!isRegionMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-mono bg-white/[0.03] hover:bg-white/[0.07] text-slate-300 transition-colors"
              title="Switch AWS Cloud Region"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#86B398]" />
              <span className="font-semibold text-white">{selectedRegion.id}</span>
              <span className="hidden md:inline text-slate-400">({selectedRegion.city})</span>
              <span className="text-[#E09F67] text-[10px]">{latencyJitter}ms</span>
              <ChevronDownIcon className="w-3 h-3 text-slate-400 ml-0.5" />
            </button>

            <AnimatePresence>
              {isRegionMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 mt-2 w-64 rounded-xl border border-white/15 bg-[#0e1118] shadow-[0_12px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl p-1.5 z-50"
                  onClick={() => setIsRegionMenuOpen(false)}
                >
                  <div className="px-2 py-1 text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                    Available Edge Gateways
                  </div>
                  {AWS_REGIONS.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRegion(r)}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left text-xs transition-colors font-mono ${
                        selectedRegion.id === r.id
                          ? 'bg-white/[0.08] text-white'
                          : 'text-slate-300 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-[11px] text-white">{r.id}</div>
                        <div className="text-[10px] text-slate-400">{r.name}</div>
                      </div>
                      <span className="text-[10px] text-[#E09F67] font-mono">{r.latency}ms</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Center: Search Bar & Layout Modes */}
        <div className="flex items-center gap-3 flex-1 max-w-lg justify-center">
          {/* Minimal Search Bar */}
          <button
            onClick={onOpenSearch}
            className="flex-1 max-w-xs hidden sm:flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.07] text-xs font-mono text-slate-400 transition-colors"
            title="Search AWS Console (Option+S / ⌘K)"
          >
            <div className="flex items-center gap-2">
              <SearchIcon className="w-3.5 h-3.5 text-slate-400" />
              <span>Search console...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[9px] bg-white/10 text-slate-300 rounded">
              ⌘K
            </kbd>
          </button>

          {/* Minimal Mode Switcher Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-white/[0.03]">
            <button
              onClick={() => onModeChange('station')}
              className={`relative flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                currentMode === 'station'
                  ? 'text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {currentMode === 'station' && (
                <motion.div
                  layoutId="activeModePill"
                  className="absolute inset-0 rounded-lg bg-white/[0.08]"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <StationModeIcon className="w-3.5 h-3.5 relative z-10 text-[#E09F67]" />
              <span className="relative z-10 hidden sm:inline font-mono text-xs">Station</span>
            </button>

            <button
              onClick={() => onModeChange('topology')}
              className={`relative flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                currentMode === 'topology'
                  ? 'text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {currentMode === 'topology' && (
                <motion.div
                  layoutId="activeModePill"
                  className="absolute inset-0 rounded-lg bg-white/[0.08]"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <TopologyModeIcon className="w-3.5 h-3.5 relative z-10 text-[#86B398]" />
              <span className="relative z-10 font-mono text-xs">Topology</span>
            </button>

            <button
              onClick={() => onModeChange('stream')}
              className={`relative flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                currentMode === 'stream'
                  ? 'text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {currentMode === 'stream' && (
                <motion.div
                  layoutId="activeModePill"
                  className="absolute inset-0 rounded-lg bg-white/[0.08]"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <StreamModeIcon className="w-3.5 h-3.5 relative z-10 text-[#A5B4FC]" />
              <span className="relative z-10 hidden sm:inline font-mono text-xs">Stream</span>
            </button>
          </div>
        </div>

        {/* Right: CloudShell Launcher Only (Zero Clutter) */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Mobile search icon button */}
          <button
            onClick={onOpenSearch}
            className="sm:hidden p-2 rounded-lg bg-white/[0.04] text-slate-300"
            title="Search"
          >
            <SearchIcon className="w-3.5 h-3.5" />
          </button>

          {/* CloudShell Launcher */}
          <button
            onClick={onToggleCloudShell}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              isCloudShellOpen
                ? 'bg-[#E09F67] text-[#0d0e15]'
                : 'bg-white/[0.06] hover:bg-white/[0.1] text-white'
            }`}
            title="Launch AWS CloudShell Terminal"
          >
            <TerminalIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CloudShell</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#86B398]" />
          </button>
        </div>
      </div>
    </header>
  );
}
