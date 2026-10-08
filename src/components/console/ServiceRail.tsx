'use client';

import React, { useEffect } from 'react';
import { ServiceId, SERVICE_NODES, ViewMode } from './types';
import { getServiceIcon, GridDotsIcon, SidebarToggleIcon } from './AwsIcons';

interface ServiceRailProps {
  activeService: ServiceId;
  onSelectService: (id: ServiceId) => void;
  currentMode?: ViewMode;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function ServiceRail({
  activeService,
  onSelectService,
  isCollapsed = false,
  onToggleCollapse,
}: ServiceRailProps) {
  // Global numeric keyboard shortcuts (1-7)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      const keyNum = parseInt(e.key, 10);
      if (keyNum >= 1 && keyNum <= SERVICE_NODES.length) {
        onSelectService(SERVICE_NODES[keyNum - 1].id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSelectService]);

  // Group services by category
  const coreServices = SERVICE_NODES.filter((n) => n.category === 'core');
  const storageServices = SERVICE_NODES.filter((n) => n.category === 'storage');
  const securityServices = SERVICE_NODES.filter((n) => n.category === 'security');

  const renderServiceItem = (node: typeof SERVICE_NODES[0]) => {
    const isActive = activeService === node.id;
    return (
      <div key={node.id} className="relative group w-full">
        <button
          onClick={() => onSelectService(node.id)}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-150 text-left ${
            isActive
              ? 'bg-white/[0.08] text-white'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
          }`}
          aria-label={node.label}
        >
          {/* AWS Service Vector Badge */}
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
              isActive ? 'bg-white/[0.06]' : 'bg-transparent group-hover:bg-white/[0.03]'
            }`}
            style={{
              color: node.color,
            }}
          >
            {getServiceIcon(node.id, 'w-4 h-4')}
          </div>

          {/* Expanded Labels */}
          {!isCollapsed && (
            <div className="flex-1 min-w-0 flex items-center justify-between">
              <div className="truncate pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-bold text-white tracking-wide">
                    {node.awsCode}
                  </span>
                  {node.badge && (
                    <span
                      className="px-1.5 py-0.2 text-[8px] font-mono font-medium rounded"
                      style={{
                        backgroundColor: `${node.color}18`,
                        color: node.color,
                      }}
                    >
                      {node.badge}
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-400 truncate">{node.label}</div>
              </div>

              <span className="hidden xl:inline text-[10px] font-mono text-slate-500 flex-shrink-0">
                {node.shortcut}
              </span>
            </div>
          )}
        </button>

        {/* Hover Tooltip Card (Only in Collapsed Mode) */}
        {isCollapsed && (
          <div className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 z-50">
            <div className="w-56 p-3 rounded-xl bg-[#0e1118] border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                  <span style={{ color: node.color }}>{node.awsCode}</span>
                  <span className="text-slate-400">::</span>
                  <span>{node.label}</span>
                </span>
                <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-white/10 text-slate-300 rounded border border-white/10">
                  {node.shortcut}
                </kbd>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">{node.description}</p>
              <div className="mt-2 pt-1.5 border-t border-white/10 text-[9px] font-mono text-slate-400 flex items-center justify-between">
                <span>Status</span>
                <span className="text-[#86B398] font-semibold">● ACTIVE</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* ─── DESKTOP AWS CONSOLE SIDEBAR (Left Full-Height Dock) ─── */}
      <aside
        className={`hidden lg:flex fixed left-0 top-14 sm:top-16 bottom-0 z-30 flex-col justify-between bg-[#0b0d14] border-r border-white/10 transition-all duration-300 select-none ${
          isCollapsed ? 'w-20 px-2.5 py-4' : 'w-64 px-4 py-4'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/[0.08]">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#E09F67] flex-shrink-0">
              <GridDotsIcon className="w-3.5 h-3.5" />
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <div className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">
                  Services
                </div>
                <div className="text-[10px] font-mono text-slate-400 truncate">
                  GGSIPU EDC Node Index
                </div>
              </div>
            )}
          </div>

          {/* Collapse / Expand Toggle Button */}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              aria-label="Toggle Sidebar"
            >
              <SidebarToggleIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Scrollable Navigation Groups */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pr-0.5">
          {/* Section 1: Core Technical Services */}
          <div>
            {!isCollapsed && (
              <div className="px-3 pb-1 text-[9px] font-mono font-semibold text-slate-400 uppercase tracking-widest">
                Core Services
              </div>
            )}
            <div className="space-y-1">{coreServices.map(renderServiceItem)}</div>
          </div>

          {/* Section 2: Storage & Observe */}
          <div>
            {!isCollapsed && (
              <div className="px-3 pb-1 text-[9px] font-mono font-semibold text-slate-400 uppercase tracking-widest">
                Storage & Observe
              </div>
            )}
            <div className="space-y-1">{storageServices.map(renderServiceItem)}</div>
          </div>

          {/* Section 3: Security & Deploy */}
          <div>
            {!isCollapsed && (
              <div className="px-3 pb-1 text-[9px] font-mono font-semibold text-slate-400 uppercase tracking-widest">
                Security & Deploy
              </div>
            )}
            <div className="space-y-1">{securityServices.map(renderServiceItem)}</div>
          </div>
        </div>

        {/* Sidebar Footer (Status & Shortcuts Hint) */}
        <div className="pt-3 mt-2 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-slate-400">
          {!isCollapsed ? (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#86B398]" />
                <span className="text-slate-300 font-medium">All Nodes Healthy</span>
              </div>
              <span className="px-1.5 py-0.5 bg-white/[0.04] rounded border border-white/10 text-slate-400">
                1-7 keys
              </span>
            </>
          ) : (
            <div className="mx-auto text-center text-slate-400">
              <span className="w-2 h-2 rounded-full bg-[#86B398] inline-block" title="Healthy" />
            </div>
          )}
        </div>
      </aside>

      {/* ─── MOBILE BOTTOM BAR (Spacious & Clean with SVG Icons) ─── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-2 py-2 bg-[#0b0d14]/95 border-t border-white/10 backdrop-blur-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-around gap-1 overflow-x-auto no-scrollbar py-0.5">
          {SERVICE_NODES.map((node) => {
            const isActive = activeService === node.id;
            return (
              <button
                key={node.id}
                onClick={() => onSelectService(node.id)}
                className={`relative flex-1 min-w-[46px] py-2 px-1 rounded-xl flex flex-col items-center justify-center transition-all ${
                  isActive
                    ? 'text-white bg-white/[0.08]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center mb-0.5"
                  style={{ color: node.color }}
                >
                  {getServiceIcon(node.id, 'w-4 h-4')}
                </div>
                <span className="text-[9px] font-mono font-bold tracking-tight">
                  {node.awsCode}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
