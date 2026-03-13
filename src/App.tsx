import React, { useState, useEffect, useRef } from 'react';
import { Github, Download, Terminal, FileJson, Play } from 'lucide-react';

export default function App() {
  const [bootSequence, setBootSequence] = useState<string[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const scrollRef = useRef<HTMLDivElement>(null);

  const bootLines = [
    "ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM",
    "COPYRIGHT 2075-2077 ROBCO INDUSTRIES",
    "-Server 1-",
    "Compiled on Python 3.9+",
    "Initializing Dialogue Engine v2.1.1...",
    "Loading Node Graph... OK",
    "Checking dependencies... OK",
    "Welcome to FALLOUT DIALOGUE CREATOR.",
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootLines.length) {
        setBootSequence(prev => [...prev, bootLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsBooting(false), 500);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [bootSequence, activeTab]);

  const renderContent = () => {
    if (isBooting) {
      return (
        <div className="flex flex-col gap-1">
          {bootSequence.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
          <div className="cursor"></div>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full">
        <div className="mb-6 border-b-2 border-[#14ff00] pb-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-widest uppercase">Fallout Dialogue Creator</h1>
          <p className="text-lg md:text-xl opacity-80">v2.1.1 - Python Environment</p>
        </div>

        <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
          {/* Sidebar Menu */}
          <div className="w-full md:w-1/4 md:pr-4 md:border-r-2 border-[#14ff00] flex flex-col gap-2 mb-4 md:mb-0">
            <div 
              className={`term-menu-item text-xl ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              [ OVERVIEW ]
            </div>
            <div 
              className={`term-menu-item text-xl ${activeTab === 'features' ? 'active' : ''}`}
              onClick={() => setActiveTab('features')}
            >
              [ FEATURES ]
            </div>
            <div 
              className={`term-menu-item text-xl ${activeTab === 'install' ? 'active' : ''}`}
              onClick={() => setActiveTab('install')}
            >
              [ INSTALLATION ]
            </div>
            <div 
              className={`term-menu-item text-xl ${activeTab === 'usage' ? 'active' : ''}`}
              onClick={() => setActiveTab('usage')}
            >
              [ USAGE & CONFIG ]
            </div>
            <div 
              className={`term-menu-item text-xl ${activeTab === 'credits' ? 'active' : ''}`}
              onClick={() => setActiveTab('credits')}
            >
              [ CREDITS ]
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full md:w-3/4 md:pl-6 crt-content-scroll" ref={scrollRef}>
            {activeTab === 'home' && (
              <div className="space-y-4">
                <p className="text-lg md:text-xl leading-relaxed">
                  Welcome to Fallout Dialogue Creator 2.0, a modern tool for creating and editing dialogue files for Fallout 1 and Fallout 2. Originally based on the classic FMF (Fan Made Fallout) format, this application has evolved into a full-featured dialogue editor with a distinctive Fallout 2 aesthetic.
                </p>
                <p className="text-lg md:text-xl leading-relaxed">
                  The application is built using Python 3 and PyQt6, providing a cross-platform solution for modders and game developers who want to create authentic Fallout dialogue.
                </p>
                <div className="mt-4 p-4 border border-yellow-500 bg-yellow-500/10 text-base md:text-lg text-yellow-400">
                  <p>&gt; NOTE: This application is not affiliated with, nor endorsed by, Bethesda Softworks or Interplay Entertainment. Fallout is a trademark of Bethesda.</p>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-6">
                <h2 className="text-xl md:text-2xl mb-4 underline">KEY FEATURES</h2>
                <div className="grid grid-cols-1 gap-4 text-base md:text-lg">
                  <div>
                    <h3 className="text-[#14ff00] font-bold">&gt; FMF File Encoding Detection</h3>
                    <p className="opacity-80">Automatically detects file encoding (UTF-8, UTF-16, Windows-1252, DOS code pages) for maximum compatibility.</p>
                  </div>
                  <div>
                    <h3 className="text-[#14ff00] font-bold">&gt; Fallout 2 Themed UI</h3>
                    <p className="opacity-80">Authentic post-apocalyptic aesthetic with olive drab greens, rust oranges, and signature yellow highlighting.</p>
                  </div>
                  <div>
                    <h3 className="text-[#14ff00] font-bold">&gt; Plugin Designer & System</h3>
                    <p className="opacity-80">Built-in visual plugin designer. Extensible architecture with hot-reloadable plugins.</p>
                  </div>
                  <div>
                    <h3 className="text-[#14ff00] font-bold">&gt; Script Compiler Integration</h3>
                    <p className="opacity-80">Configure and use the SSL (Fallout Scripting Language) compiler directly from the application.</p>
                  </div>
                  <div>
                    <h3 className="text-[#14ff00] font-bold">&gt; MSG/DDF Export</h3>
                    <p className="opacity-80">Export dialogues to SSL scripts, MSG message files, and DDF format.</p>
                  </div>
                  <div>
                    <h3 className="text-[#14ff00] font-bold">&gt; Enhanced Diagram Widget</h3>
                    <p className="opacity-80">Visual dialogue editor with color-coded nodes, curved arrows, gradients, and smooth zooming.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'install' && (
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl mb-4 underline">INSTALLATION</h2>
                
                <h3 className="text-lg text-yellow-400 mt-4">REQUIREMENTS</h3>
                <ul className="list-none space-y-1 opacity-80">
                  <li>* Python 3.9+ - Required runtime</li>
                  <li>* PyQt6 - GUI framework</li>
                  <li>* pyyaml - Configuration file handling</li>
                </ul>

                <h3 className="text-lg text-yellow-400 mt-4">RUNNING FROM SOURCE</h3>
                <div className="bg-[#14ff00]/20 p-4 font-mono text-sm md:text-base break-all">
                  <p>C:\&gt; git clone https://github.com/TimoP80/fdc_python.git</p>
                  <p>C:\&gt; cd fdc_python</p>
                  <p>C:\&gt; pip install -r requirements.txt</p>
                  <p>C:\&gt; python main.py</p>
                </div>

                <h3 className="text-lg text-yellow-400 mt-4">RUNNING THE EXECUTABLE</h3>
                <div className="bg-[#14ff00]/20 p-4 font-mono text-sm md:text-base break-all">
                  <p>C:\&gt; FalloutDialogueCreator.exe</p>
                </div>
                <p className="text-sm opacity-80 mt-2">Tip: On first run, the application will create a configuration directory at %APPDATA%/FMFDLG for storing settings and user data.</p>
              </div>
            )}

            {activeTab === 'usage' && (
              <div className="space-y-6">
                <h2 className="text-xl md:text-2xl mb-4 underline">USAGE & CONFIGURATION</h2>
                
                <div>
                  <h3 className="text-lg text-yellow-400">GETTING STARTED</h3>
                  <ul className="list-none space-y-1 opacity-80 mt-2">
                    <li>&gt; Launch the application</li>
                    <li>&gt; Create or open a dialogue (File → New / Open)</li>
                    <li>&gt; Add nodes (Right-click in tree or use toolbar)</li>
                    <li>&gt; Edit NPC text & Add player options</li>
                    <li>&gt; Link nodes to connect options</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg text-yellow-400">VISUAL DIAGRAM EDITOR</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 opacity-80 mt-2">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 bg-green-500 inline-block"></span> Starting nodes (WTG)</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-500 inline-block"></span> Regular nodes</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 bg-gray-500 inline-block"></span> Hidden nodes</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 bg-orange-500 inline-block"></span> Skill checks</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 bg-yellow-400 inline-block"></span> Selected node</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg text-yellow-400">CONFIGURATION</h3>
                  <p className="opacity-80 mt-2">Settings stored in <span className="font-mono text-sm">%APPDATA%/FMFDLG</span> (Windows) or <span className="font-mono text-sm">~/.config/FMFDLG</span> (Linux/Mac).</p>
                  <p className="opacity-80 mt-2">To compile SSL scripts, obtain <span className="font-mono text-sm">sslc.exe</span> and configure it via Tools → Configure Script Compiler.</p>
                </div>
              </div>
            )}

            {activeTab === 'credits' && (
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl mb-4 underline">CREDITS & LICENSE</h2>
                
                <div className="mb-4">
                  <h3 className="text-lg text-yellow-400">DEVELOPMENT TEAM</h3>
                  <p className="opacity-80">Lead Developer: Timo P</p>
                  <p className="opacity-80">Contributors: Community contributions welcome</p>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg text-yellow-400">ACKNOWLEDGMENTS</h3>
                  <ul className="list-none space-y-1 opacity-80">
                    <li>* Original FMF format by the Fan Made Fallout community</li>
                    <li>* Fallout is a trademark of Bethesda Softworks LLC</li>
                    <li>* PyQt6 for the excellent GUI framework</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg text-yellow-400">LICENSE</h3>
                  <p className="opacity-80 text-sm">This project is open source and available under the MIT License. Copyright (c) 2024 Fallout Dialogue Creator.</p>
                </div>
                
                <div className="mt-8 border-t border-[#14ff00] pt-4 text-center opacity-60">
                  <p>&gt; Fallout Dialogue Creator 2.1.1</p>
                  <p>&gt; END OF LINE</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="terminal-casing">
      {/* Screws */}
      <div className="screw tl"></div>
      <div className="screw tr"></div>
      <div className="screw bl"></div>
      <div className="screw br"></div>

      {/* Screen Area */}
      <div className="crt-bezel">
        <div className="crt-screen">
          <div className="crt-content text-lg md:text-xl">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Hardware Panel Below Screen */}
      <div className="hardware-panel">
        <div className="flex items-center gap-4">
          <div className="brand-plate">ROBCO INDUSTRIES</div>
          <div className="flex items-center gap-2">
            <div className="power-led"></div>
            <span className="text-[#aaa] text-xs font-bold tracking-widest uppercase">PWR</span>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button 
            className="physical-btn"
            onClick={() => window.open('https://github.com/TimoP80/fdc_python', '_blank')}
          >
            <Github className="w-5 h-5" />
            GitHub
          </button>
          <button 
            className="physical-btn"
            onClick={() => {
              setActiveTab('install');
              setIsBooting(false);
            }}
          >
            <Download className="w-5 h-5" />
            Install
          </button>
        </div>
      </div>
    </div>
  );
}
