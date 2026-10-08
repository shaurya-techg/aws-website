'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ViewMode, ServiceId, SERVICE_NODES } from './types';
import ConsoleHeader from './ConsoleHeader';
import ServiceRail from './ServiceRail';
import CloudShellDrawer from './CloudShellDrawer';
import TopologyMap from './TopologyMap';
import CommandPalette from './CommandPalette';
import {
  getServiceIcon,
  ChevronRightIcon,
  TopologyModeIcon,
  StreamModeIcon,
  PlusIcon,
  ExternalLinkIcon,
  GridDotsIcon,
  HelpIcon,
} from './AwsIcons';

// Existing content components
import HeroTypography from '@/components/HeroTypography';
import StatsSection from '@/components/StatsSection';
import AboutSection from '@/components/AboutSection';
import Teams from '@/components/Teams';
import Events from '@/components/events';
import PeopleSection from '@/components/PeopleSection';
import BePartSection from '@/components/BePartSection';
import ChatBot from '@/components/ChatBot';

const Logo3D = dynamic(() => import('@/components/Logo3D'), { ssr: false });

export default function ConsoleLayout() {
  const [currentMode, setCurrentMode] = useState<ViewMode>('station');
  const [activeService, setActiveService] = useState<ServiceId>('overview');
  const [isCloudShellOpen, setIsCloudShellOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Sync active service title
  const currentServiceNode = SERVICE_NODES.find((s) => s.id === activeService) || SERVICE_NODES[0];

  const handleSelectService = (id: ServiceId) => {
    setActiveService(id);
    if (currentMode === 'stream') {
      const el = document.getElementById(`section-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSwitchToStation = (service?: ServiceId) => {
    if (service) setActiveService(service);
    setCurrentMode('station');
  };

  // ScrollSpy for Stream mode
  useEffect(() => {
    if (currentMode !== 'stream') return;

    const sections = SERVICE_NODES.map((n) => document.getElementById(`section-${n.id}`)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace('section-', '') as ServiceId;
            setActiveService(id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((sec) => sec && observer.observe(sec));
    return () => observer.disconnect();
  }, [currentMode]);

  return (
    <div className="relative min-h-screen w-full bg-[#0a0b10] text-white flex flex-col selection:bg-[#E09F67]/20 selection:text-[#E09F67]">
      {/* ─── TOP AWS CONSOLE GLOBAL HEADER ─── */}
      <ConsoleHeader
        currentMode={currentMode}
        onModeChange={setCurrentMode}
        onToggleCloudShell={() => setIsCloudShellOpen(!isCloudShellOpen)}
        isCloudShellOpen={isCloudShellOpen}
        onOpenSearch={() => setIsCommandPaletteOpen(true)}
        activeServiceLabel={currentServiceNode.label}
      />

      {/* ─── AWS CONSOLE SIDEBAR (Left Dock) ─── */}
      <ServiceRail
        activeService={activeService}
        onSelectService={handleSelectService}
        currentMode={currentMode}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* ─── MAIN WORKSPACE STAGE ─── */}
      <main
        className={`relative flex-1 w-full transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* VIEW MODE 1: INTERACTIVE TOPOLOGY MAP */}
        {currentMode === 'topology' && (
          <TopologyMap
            onSelectService={handleSelectService}
            onSwitchToStation={handleSwitchToStation}
          />
        )}

        {/* VIEW MODE 2: CONSOLE WORKSTATION STAGE (FOCUSED ACTIVE SERVICE) */}
        {currentMode === 'station' && (
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 pb-24 lg:pb-12">
            {/* ─── AWS CONSOLE SERVICE SUB-HEADER / CONTROL BANNER ─── */}
            <motion.div
              key={activeService + '-blade'}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 rounded-2xl bg-[#0e1118] border border-white/10 shadow-sm overflow-hidden"
            >
              {/* Breadcrumbs & Status Ribbon */}
              <div className="px-4 sm:px-6 py-2.5 bg-white/[0.02] border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="hover:text-white transition-colors cursor-pointer" onClick={() => handleSelectService('overview')}>
                    AWS Console
                  </span>
                  <ChevronRightIcon className="w-3 h-3 text-slate-600" />
                  <span>GGSIPU EDC</span>
                  <ChevronRightIcon className="w-3 h-3 text-slate-600" />
                  <span className="text-white font-semibold">{currentServiceNode.awsCode}</span>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#86B398]" />
                    <span>Health: <strong className="text-[#86B398]">Operational</strong></span>
                  </span>
                  <span className="text-slate-600">|</span>
                  <span>Region: <strong className="text-slate-300">ap-south-1</strong></span>
                </div>
              </div>

              {/* Main Banner Heading & Action Buttons */}
              <div className="p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div
                    className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/[0.05]"
                    style={{
                      color: currentServiceNode.color,
                    }}
                  >
                    {getServiceIcon(currentServiceNode.id, 'w-5 h-5 sm:w-6 sm:h-6')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-base sm:text-xl font-bold text-white tracking-wide">
                        {currentServiceNode.label}
                      </h2>
                      <span className="px-2 py-0.5 text-[10px] font-mono font-medium rounded bg-white/[0.08] text-slate-300">
                        {currentServiceNode.awsCode}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300">{currentServiceNode.description}</p>
                  </div>
                </div>

                {/* AWS Console Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setCurrentMode('topology')}
                    className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/10 text-xs font-mono transition-colors flex items-center gap-1.5"
                  >
                    <TopologyModeIcon className="w-3.5 h-3.5 text-[#86B398]" />
                    <span>Topology Map</span>
                  </button>

                  <button
                    onClick={() => setCurrentMode('stream')}
                    className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/10 text-xs font-mono transition-colors flex items-center gap-1.5"
                  >
                    <StreamModeIcon className="w-3.5 h-3.5 text-[#A5B4FC]" />
                    <span>Stream View</span>
                  </button>

                  <button
                    onClick={() => handleSelectService('deploy')}
                    className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#E09F67] hover:bg-[#e8aa77] text-[#0d0e15] text-xs font-mono font-bold transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <PlusIcon className="w-3.5 h-3.5" />
                    <span>Join Community</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Dynamic Service Viewport Content */}
            <AnimatePresence mode="wait">
              {activeService === 'overview' && (
                <motion.div
                  key="view-overview"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-12"
                >
                  {/* Hero Section with 3D Visualizer */}
                  <div className="relative min-h-[65vh] flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                      <div className="w-[450px] h-[450px] sm:w-[550px] sm:h-[550px]">
                        <Logo3D />
                      </div>
                    </div>
                    <div className="relative z-10">
                      <HeroTypography />
                    </div>
                  </div>

                  {/* Stats Marquee Strip */}
                  <StatsSection />

                  {/* ─── AWS CONSOLE SERVICES GRID (INSPIRED BY AWS CONSOLE RECENTLY VISITED WIDGET) ─── */}
                  <div className="rounded-2xl bg-[#0e1118] border border-white/10 p-5 sm:p-6">
                    <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.08]">
                      <div className="flex items-center gap-2">
                        <GridDotsIcon className="w-4 h-4 text-[#E09F67]" />
                        <h3 className="text-sm font-bold text-white font-mono tracking-wide">
                          AWS Services & Community Infrastructure
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                        <HelpIcon className="w-3 h-3" />
                        <span>Console Index</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {SERVICE_NODES.filter((n) => n.id !== 'overview').map((node) => (
                        <button
                          key={node.id}
                          onClick={() => handleSelectService(node.id)}
                          className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/15 transition-all text-left group flex items-start gap-3"
                        >
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 bg-white/[0.04] group-hover:bg-white/[0.08] transition-colors"
                            style={{
                              color: node.color,
                            }}
                          >
                            {getServiceIcon(node.id, 'w-4 h-4')}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs font-bold text-white group-hover:text-[#E09F67] transition-colors">
                                {node.label}
                              </span>
                              <ExternalLinkIcon className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                              {node.description}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ─── AWS HEALTH & TELEMETRY WIDGET BAR ─── */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-[#0e1118] border border-white/10">
                      <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                        Open Issues
                      </div>
                      <div className="text-2xl font-bold text-[#86B398] font-mono">0</div>
                      <div className="text-[10px] text-slate-400 mt-1">Past 7 days across all nodes</div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0e1118] border border-white/10">
                      <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                        Active Builders
                      </div>
                      <div className="text-2xl font-bold text-[#E09F67] font-mono">1,200+</div>
                      <div className="text-[10px] text-slate-400 mt-1">Registered community members</div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0e1118] border border-white/10">
                      <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                        Certifications Earned
                      </div>
                      <div className="text-2xl font-bold text-[#A5B4FC] font-mono">100+</div>
                      <div className="text-[10px] text-slate-400 mt-1">AWS Practitioner & Solutions Arch</div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0e1118] border border-white/10">
                      <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                        Deployment Region
                      </div>
                      <div className="text-lg font-bold text-white font-mono">ap-south-1</div>
                      <div className="text-[10px] text-slate-400 mt-1">GGSIPU East Delhi Campus</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeService === 'compute' && (
                <motion.div
                  key="view-compute"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Teams />
                </motion.div>
              )}

              {activeService === 'events' && (
                <motion.div
                  key="view-events"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="py-6"
                >
                  <div className="mb-8">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                      EventBridge <span className="text-[#E09F67]">Pipeline</span>
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                      Real-time workshops, bootcamps, and certification hackathons.
                    </p>
                  </div>
                  <Events />
                </motion.div>
              )}

              {activeService === 'iam' && (
                <motion.div
                  key="view-iam"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <PeopleSection />
                </motion.div>
              )}

              {activeService === 's3' && (
                <motion.div
                  key="view-s3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <AboutSection />
                </motion.div>
              )}

              {activeService === 'cloudwatch' && (
                <motion.div
                  key="view-cloudwatch"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-10 py-6"
                >
                  <div className="text-center max-w-xl mx-auto">
                    <span className="text-xs font-mono text-[#E09F67] uppercase tracking-widest">
                      Live Telemetry
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                      CloudWatch Metrics
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-2">
                      High-availability student engineering community at GGSIPU East Delhi Campus.
                    </p>
                  </div>
                  <StatsSection />
                </motion.div>
              )}

              {activeService === 'deploy' && (
                <motion.div
                  key="view-deploy"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <BePartSection />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* VIEW MODE 3: CONTINUOUS STREAM (FOR USERS WHO WANT FULL SCROLL) */}
        {currentMode === 'stream' && (
          <div className="w-full">
            <div id="section-overview">
              <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                  <div className="w-[450px] h-[450px] sm:w-[550px] sm:h-[550px]">
                    <Logo3D />
                  </div>
                </div>
                <div className="relative z-10">
                  <HeroTypography />
                </div>
              </section>
            </div>

            <div id="section-cloudwatch">
              <StatsSection />
            </div>

            <div id="section-s3">
              <AboutSection />
            </div>

            <div id="section-compute">
              <Teams />
            </div>

            <div id="section-events" className="w-full px-4 sm:px-6 lg:px-8 py-20">
              <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                  <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                    Latest <span className="text-[#E09F67]">Events</span>
                  </h2>
                  <div className="h-1 w-16 bg-[#E09F67] rounded-full" />
                </div>
                <Events />
              </div>
            </div>

            <div id="section-iam">
              <PeopleSection />
            </div>

            <div id="section-deploy">
              <BePartSection />
            </div>
          </div>
        )}
      </main>

      {/* ─── DOCKABLE INTERACTIVE AWS CLOUDSHELL TERMINAL ─── */}
      <CloudShellDrawer
        isOpen={isCloudShellOpen}
        onClose={() => setIsCloudShellOpen(false)}
        onSwitchMode={setCurrentMode}
        onSelectService={handleSelectService}
      />

      {/* ─── GLOBAL COMMAND PALETTE (⌘K / Option+S) ─── */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectService={handleSelectService}
        onSwitchMode={setCurrentMode}
        onOpenCloudShell={() => setIsCloudShellOpen(true)}
      />

      {/* ─── FLOATING CHATBOT ─── */}
      <ChatBot />
    </div>
  );
}
