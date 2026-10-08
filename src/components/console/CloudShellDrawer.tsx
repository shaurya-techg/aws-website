'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceId, ViewMode } from './types';

interface CloudShellDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchMode: (mode: ViewMode) => void;
  onSelectService: (service: ServiceId) => void;
}

interface CommandLog {
  id: string;
  type: 'input' | 'output' | 'error' | 'success';
  text: React.ReactNode;
}

export default function CloudShellDrawer({
  isOpen,
  onClose,
  onSwitchMode,
  onSelectService,
}: CloudShellDrawerProps) {
  const [inputVal, setInputVal] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 'welcome-1',
      type: 'output',
      text: (
        <div className="text-slate-300 font-mono text-xs leading-relaxed space-y-1">
          <div className="text-[#E09F67] font-bold">
            AWS CloudShell v2026.4 (GGSIPU East Delhi Campus)
          </div>
          <div>Type <span className="text-[#86B398] font-bold">help</span> or click any chip below to run commands.</div>
        </div>
      ),
    },
  ]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Auto-scroll logs to bottom
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const newLogId = Date.now().toString();
    const cleanCmd = trimmed.toLowerCase();

    // Add command to input log
    const updatedLogs: CommandLog[] = [
      ...logs,
      {
        id: `in-${newLogId}`,
        type: 'input',
        text: (
          <span className="font-mono text-xs text-white">
            <span className="text-[#E09F67]">visitor@aws-cloudstation:~$</span> {trimmed}
          </span>
        ),
      },
    ];

    // Add to command history
    setHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);

    // Command parser
    let outputText: React.ReactNode = null;
    let logType: CommandLog['type'] = 'output';

    if (cleanCmd === 'clear' || cleanCmd === 'cls') {
      setLogs([]);
      setInputVal('');
      return;
    } else if (cleanCmd === 'help' || cleanCmd === '?') {
      outputText = (
        <div className="font-mono text-xs space-y-1 text-slate-300">
          <div className="text-[#E09F67] font-bold">Available Cloud Operations:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-1 text-slate-400">
            <div><span className="text-[#86B398] font-semibold">teams</span> : List 6 technical domains & leads</div>
            <div><span className="text-[#86B398] font-semibold">events</span> : View upcoming & past workshops</div>
            <div><span className="text-[#86B398] font-semibold">stats</span> : Live community CloudWatch metrics</div>
            <div><span className="text-[#86B398] font-semibold">join</span> : Instant links for WhatsApp & Meetup</div>
            <div><span className="text-[#86B398] font-semibold">about</span> : Club mission & faculty leadership</div>
            <div><span className="text-[#86B398] font-semibold">mode [station|topology|stream]</span> : Switch layout</div>
            <div><span className="text-[#86B398] font-semibold">whoami</span> : Display builder identity</div>
            <div><span className="text-[#86B398] font-semibold">clear</span> : Clear console buffer</div>
          </div>
        </div>
      );
    } else if (cleanCmd === 'teams' || cleanCmd === 'ec2') {
      onSelectService('compute');
      outputText = (
        <div className="font-mono text-xs space-y-1.5 text-slate-300">
          <div className="text-[#E09F67] font-bold">AWS Compute Clusters (Technical Domains):</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
            <div className="p-2 rounded bg-white/[0.04] border border-white/10">
              <span className="text-purple-300 font-bold">● Software Engineering</span>
              <p className="text-[11px] text-slate-400">Full-stack web & microservices architectures</p>
            </div>
            <div className="p-2 rounded bg-white/[0.04] border border-white/10">
              <span className="text-blue-300 font-bold">● AI & Machine Learning</span>
              <p className="text-[11px] text-slate-400">AWS Bedrock, SageMaker, LLM fine-tuning</p>
            </div>
            <div className="p-2 rounded bg-white/[0.04] border border-white/10">
              <span className="text-amber-300 font-bold">● Cloud & DevOps</span>
              <p className="text-[11px] text-slate-400">Terraform, Docker, Kubernetes, CI/CD</p>
            </div>
            <div className="p-2 rounded bg-white/[0.04] border border-white/10">
              <span className="text-[#86B398] font-bold">● Cybersecurity</span>
              <p className="text-[11px] text-slate-400">Cloud security posture, IAM hardening</p>
            </div>
            <div className="p-2 rounded bg-white/[0.04] border border-white/10">
              <span className="text-pink-300 font-bold">● UI/UX & Design</span>
              <p className="text-[11px] text-slate-400">Product design, wireframes, 3D graphics</p>
            </div>
            <div className="p-2 rounded bg-white/[0.04] border border-white/10">
              <span className="text-[#E09F67] font-bold">● Content & Community</span>
              <p className="text-[11px] text-slate-400">Social outreach, blog posts, event hosting</p>
            </div>
          </div>
          <div className="text-[11px] text-[#86B398]">✓ Switched workstation stage to Compute Clusters.</div>
        </div>
      );
    } else if (cleanCmd === 'events' || cleanCmd === 'eventbridge') {
      onSelectService('events');
      outputText = (
        <div className="font-mono text-xs space-y-1.5 text-slate-300">
          <div className="text-[#E09F67] font-bold">EventBridge Live Streams & Workshops:</div>
          <div className="text-slate-300">
            • <strong className="text-white">Cloud Practitioner Bootcamp</strong> — Hands-on certification drill<br/>
            • <strong className="text-white">Serverless GenAI Hackathon</strong> — Building agents with AWS Bedrock<br/>
            • <strong className="text-white">Docker & Kubernetes Masterclass</strong> — Cloud container deployment
          </div>
          <div className="text-[11px] text-[#86B398]">✓ Switched stage to EventBridge view.</div>
        </div>
      );
    } else if (cleanCmd === 'stats' || cleanCmd === 'cloudwatch') {
      onSelectService('cloudwatch');
      outputText = (
        <div className="font-mono text-xs space-y-1 text-slate-300">
          <div className="text-[#E09F67] font-bold">AWS CloudWatch Community Telemetry:</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center my-1">
            <div className="p-2 rounded bg-white/[0.04] border border-white/10">
              <div className="text-xl font-bold text-[#E09F67]">1,200+</div>
              <div className="text-[10px] text-slate-400 uppercase">Active Builders</div>
            </div>
            <div className="p-2 rounded bg-white/[0.04] border border-white/10">
              <div className="text-xl font-bold text-purple-300">45+</div>
              <div className="text-[10px] text-slate-400 uppercase">Workshops Hosted</div>
            </div>
            <div className="p-2 rounded bg-white/[0.04] border border-white/10">
              <div className="text-xl font-bold text-[#86B398]">100+</div>
              <div className="text-[10px] text-slate-400 uppercase">Certifications</div>
            </div>
            <div className="p-2 rounded bg-white/[0.04] border border-white/10">
              <div className="text-xl font-bold text-blue-300">99.9%</div>
              <div className="text-[10px] text-slate-400 uppercase">Uptime & Vibe</div>
            </div>
          </div>
        </div>
      );
    } else if (cleanCmd === 'join' || cleanCmd === 'deploy') {
      onSelectService('deploy');
      outputText = (
        <div className="font-mono text-xs space-y-1.5 text-slate-300">
          <div className="text-[#E09F67] font-bold">Deploy to Community Channels:</div>
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href="https://www.meetup.com/aws-cloud-club-at-ggsipu"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded bg-[#ED1C40]/20 hover:bg-[#ED1C40]/40 text-red-300 border border-[#ED1C40]/50 transition-colors"
            >
              Meetup Community ↗
            </a>
            <a
              href="https://chat.whatsapp.com/sample"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded bg-[#25D366]/20 hover:bg-[#25D366]/40 text-emerald-300 border border-[#25D366]/50 transition-colors"
            >
              WhatsApp Official ↗
            </a>
            <a
              href="https://www.linkedin.com/company/aws-student-builder-group-ggsipu/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded bg-[#0A66C2]/20 hover:bg-[#0A66C2]/40 text-blue-300 border border-[#0A66C2]/50 transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      );
    } else if (cleanCmd.startsWith('mode')) {
      const modeArg = cleanCmd.split(' ')[1];
      if (['station', 'topology', 'stream'].includes(modeArg)) {
        onSwitchMode(modeArg as ViewMode);
        outputText = (
          <div className="font-mono text-xs text-[#86B398]">
            ✓ Successfully switched layout mode to <span className="font-bold uppercase text-white">{modeArg}</span>!
          </div>
        );
      } else {
        logType = 'error';
        outputText = (
          <div className="font-mono text-xs text-rose-400">
            Invalid mode. Usage: mode [station | topology | stream]
          </div>
        );
      }
    } else if (cleanCmd === 'whoami') {
      outputText = (
        <div className="font-mono text-xs text-[#E09F67]">
          You are an AWS Cloud Builder! Welcome to AWS Student Builder Group (GGSIPU EDC).
        </div>
      );
    } else if (cleanCmd === 'about' || cleanCmd === 's3') {
      onSelectService('s3');
      outputText = (
        <div className="font-mono text-xs space-y-1 text-slate-300">
          <div className="text-[#E09F67] font-bold">About AWS Student Builder Group:</div>
          <p className="text-slate-400 leading-relaxed">
            The official AWS Student Builder Group at Guru Gobind Singh Indraprastha University (GGSIPU East Delhi Campus).
            We empower students to learn cloud architecture, build production-grade solutions, and earn AWS certifications.
          </p>
        </div>
      );
    } else {
      logType = 'error';
      outputText = (
        <div className="font-mono text-xs text-rose-400">
          Command not recognized: &quot;{trimmed}&quot;. Type <span className="text-white underline cursor-pointer" onClick={() => handleCommand('help')}>help</span> for available commands.
        </div>
      );
    }

    setLogs([
      ...updatedLogs,
      {
        id: `out-${newLogId}`,
        type: logType,
        text: outputText,
      },
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0) {
        const nextIndex = Math.min(historyIndex + 1, history.length - 1);
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  const quickChips = [
    { label: 'help', cmd: 'help' },
    { label: 'teams', cmd: 'teams' },
    { label: 'events', cmd: 'events' },
    { label: 'stats', cmd: 'stats' },
    { label: 'join', cmd: 'join' },
    { label: 'mode topology', cmd: 'mode topology' },
    { label: 'clear', cmd: 'clear' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`fixed left-0 right-0 bottom-0 z-50 rounded-t-2xl border-t border-white/20 bg-[#060314]/95 backdrop-blur-3xl shadow-[0_-10px_50px_rgba(0,0,0,0.85)] flex flex-col transition-all duration-300 ${
            isMaximized ? 'h-[85vh]' : 'h-[360px] sm:h-[400px]'
          }`}
        >
          {/* Top Window Bar */}
          <div className="h-10 px-4 flex items-center justify-between border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors"
                  title="Close Terminal"
                />
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors"
                  title="Maximize Terminal"
                />
              </div>
              <span className="font-mono text-xs font-semibold text-slate-300 flex items-center gap-1.5 ml-2">
                <span className="text-[#E09F67]">&gt;_</span> AWS CloudShell :: ggsipu-session
              </span>
              <span className="px-1.5 py-0.2 text-[9px] font-mono bg-[#86B398]/15 text-[#86B398] rounded border border-[#86B398]/30">
                CONNECTED
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="hidden sm:inline">bash 5.2</span>
              <button
                onClick={onClose}
                className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Quick Command Chips Bar */}
          <div className="px-4 py-2 border-b border-white/[0.06] bg-white/[0.01] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex-shrink-0">
              Quick:
            </span>
            {quickChips.map((chip) => (
              <button
                key={chip.label}
                onClick={() => handleCommand(chip.cmd)}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition-colors whitespace-nowrap flex-shrink-0"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Logs Output Screen */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs select-text">
            {logs.map((log) => (
              <div key={log.id} className="leading-relaxed">
                {log.text}
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>

          {/* Input Prompt Row */}
          <div className="p-3 border-t border-white/10 bg-[#090a10] flex items-center gap-2">
            <span className="text-[#E09F67] font-mono text-xs font-bold select-none whitespace-nowrap">
              visitor@aws:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type command (e.g. teams, events, join, help)..."
              className="flex-1 bg-transparent text-white font-mono text-xs outline-none placeholder:text-slate-400"
              autoFocus
            />
            <button
              onClick={() => handleCommand(inputVal)}
              className="px-3 py-1 rounded bg-[#E09F67] hover:bg-[#e8aa77] text-[#0d0e15] font-mono font-bold text-xs transition-colors"
            >
              RUN
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
