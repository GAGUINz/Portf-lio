"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { useLanguage } from "@/context/LanguageContext";
import {
  Code2, TerminalSquare, Database, Server, Cpu, Layers,
  CreditCard, MonitorSmartphone, ShieldCheck,
  Mail, ExternalLink, Activity, Cloud,
  Bug, Rocket, Download, Send, X
} from "lucide-react";

const Github = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const Linkedin = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const ZeroHoraIcon = ({ size = 16, className = "" }: { size?: number, className?: string }) => (
  <img 
    src="/zerohora-icon.svg" 
    alt="Zero Hora" 
    width={size} 
    height={size} 
    className={`${className} rounded-sm`}
  />
);

// Array com o log completo do FZ Quant Terminal
const terminalLogs = [
  "◇ injected env (41) from .env // tip: ⌘ override existing { override: true }",
  "◇ injected env (0) from .env // tip: ⌘ custom filepath { path: '/custom/path/.env' }",
  "◇ injected env (0) from .env // tip: ◈ encrypted .env [www.dotenvx.com]",
  "◇ injected env (41) from .env // tip: ⌘ suppress logs { quiet: true }",
  "Lendo chave da variável: BINANCE_API_KEY_TEST",
  "[BINANCE] Modo: DEMO TRADING (Unificado) | Key: 4ZC1vA...pjO9",
  "[DEMO TRADING] Roteamento ativado via CCXT nativo. Chave: 4ZC1vA...",
  "[SEGURANÇA] Motor restrito 100% para Mercado de Futuros.",
  "◇ injected env (0) from .env // tip: ⌘ override existing { override: true }",
  "[FOREX API] Aviso: Token da FXCM ausente no .env (Testnet: true). Rodando em modo Mock.",
  "[BOOT SYNC] Iniciando sincronização de posições com a Binance...",
  "[SUPABASE] Client inicializado.",
  "[ORDER-BOOK] BTCUSDT conectando via Subscription Payload (Anti-WAF)...",
  "[ORDER-BOOK] BNBUSDT conectando via Subscription Payload (Anti-WAF)...",
  "[ORDER-BOOK] BCHUSDT conectando via Subscription Payload (Anti-WAF)...",
  "[ORDER-BOOK] ARBUSDT conectando via Subscription Payload (Anti-WAF)...",
  "[ORDER-BOOK] XRPUSDT conectando via Subscription Payload (Anti-WAF)...",
  "[ORDER-BOOK] SANDUSDT conectando via Subscription Payload (Anti-WAF)...",
  "[ORDER-BOOK] ATOMUSDT conectando via Subscription Payload (Anti-WAF)...",
  "[ORDER-BOOK] LINKUSDT conectando via Subscription Payload (Anti-WAF)...",
  "[ORDER-BOOK] TONUSDT conectando via Subscription Payload (Anti-WAF)...",
  "[ORDER-BOOK] STXUSDT conectando via Subscription Payload (Anti-WAF)...",
  "[ORDER-BOOK] FETUSDT conectando via Subscription Payload (Anti-WAF)...",
  "============================================",
  "  FZ QUANT TERMINAL V6.1 — WEB DASHBOARD    ",
  "============================================",
  "[WEB] Dashboard acessível em: http://localhost:3000",
  "[WEB] Health check: http://localhost:3000/health",
  "[WEB] Mode: Docker-Ready (Headless)",
  "[INFRA RADAR] Diagnóstico de Hospedagem:",
  "  ▶ OS: Windows_NT 10.0.26200",
  "  ▶ Hostname: gaguinzcomputer",
  "  ▶ CWD: C:\\bot-trade",
  "[DATAFEED] Modo Shadow Trading — AWS São Paulo (sa-east-1).",
  "[DATAFEED V5] Inicializando (ZERO CACHE, WS MULTIPLEXADO, IMUTABILIDADE FORÇADA)...",
  "  Cripto (WS Streams): BTCUSDT, BNBUSDT, BCHUSDT, ARBUSDT, XRPUSDT, SANDUSDT, ATOMUSDT, LINKUSDT, TONUSDT, STXUSDT, FETUSDT",
  "[BOOT] Iniciando backfill sequencial de 11 ativos (Prevenção Rate Limit)...",
  "[BOOT] Aquecendo motor multi-timeframe: BTCUSDT (1h/15m/5m) — Requisitando 200 candles por TF...",
  "[HFT CONFIG] Fallback ativado. Usando valor padrão: adx_m15_min = 25",
  "[SENTIMENT] API alternative.me acessada com sucesso. Sentimento CRIPTO: 22 - Extreme Fear (Atualiza 1x ao dia)",
  "[BACKFILL] BTCUSDT H1: 200 velas injetadas no buffer.",
  "[BOOT] BTCUSDT H1: 200 candles históricos carregados (Binance Direto).",
  "[BACKFILL] BTCUSDT M15: 200 velas injetadas no buffer.",
  "[BOOT] BTCUSDT M15: 200 candles históricos carregados (Binance Direto).",
  "[NEWS RADAR] Radar CRIPTO Sincronizado. 2 eventos High Impact ativos.",
  "[NEWS RADAR] Alerta: Bitcoin miner inflows to Binance soar as BTC struggles to hold uptrend: Is $70K next? (22:04) - Bloqueio ativo.",
  "[NEWS RADAR] Alerta: Orca, Streamex roll out secondary trading infrastructure for tokenized securities (20:51) - Bloqueio ativo.",
  "[PUSHOVER] Alerta de bloqueio (News Radar) enviado para o celular!",
  "[PUSHOVER] Alerta de bloqueio (News Radar) enviado para o celular!",
  "[ORDER-BOOK] LINKUSDT SUBSCRIBE enviado.",
  "[ORDER-BOOK] TONUSDT SUBSCRIBE enviado.",
  "[ORDER-BOOK] BNBUSDT SUBSCRIBE enviado.",
  "[ORDER-BOOK] XRPUSDT SUBSCRIBE enviado.",
  "[BACKFILL] BTCUSDT M5: 200 velas injetadas no buffer.",
  "[BOOT] BTCUSDT M5: 200 candles históricos carregados (Binance Direto).",
  "[ORDER-BOOK] FETUSDT SUBSCRIBE enviado.",
  "[WEB] Cliente conectado: a5Ts4nplf7vKw6XCAAAC",
  "[ORDER-BOOK] ATOMUSDT SUBSCRIBE enviado.",
  "[MOTOR PRONTO] BTCUSDT calibrado com dados históricos (Motor Nativo JS).",
  "[ORDER-BOOK] BCHUSDT SUBSCRIBE enviado.",
  "[ORDER-BOOK] SANDUSDT SUBSCRIBE enviado.",
  "[ORDER-BOOK] BTCUSDT SUBSCRIBE enviado.",
  "[ORDER-BOOK] STXUSDT SUBSCRIBE enviado.",
  "[BOOT] Aquecendo motor multi-timeframe: BNBUSDT (1h/15m/5m) — Requisitando 200 candles por TF...",
  "[BACKFILL] BNBUSDT H1: 200 velas injetadas no buffer.",
  "[BOOT] BNBUSDT H1: 200 candles históricos carregados (Binance Direto).",
  "[BACKFILL] BNBUSDT M15: 200 velas injetadas no buffer.",
  "[BOOT] BNBUSDT M15: 200 candles históricos carregados (Binance Direto).",
  "[ORDER-BOOK] ARBUSDT SUBSCRIBE enviado.",
  "[BACKFILL] BNBUSDT M5: 200 velas injetadas no buffer.",
  "[BOOT] BNBUSDT M5: 200 candles históricos carregados (Binance Direto).",
  "[MOTOR PRONTO] BNBUSDT calibrado com dados históricos (Motor Nativo JS).",
  "[BOOT] Aquecendo motor multi-timeframe: BCHUSDT (1h/15m/5m) — Requisitando 200 candles por TF...",
  "[BACKFILL] BCHUSDT H1: 200 velas injetadas no buffer.",
  "[BOOT] BCHUSDT H1: 200 candles históricos carregados (Binance Direto).",
  "[BACKFILL] BCHUSDT M15: 200 velas injetadas no buffer.",
  "[BOOT] BCHUSDT M15: 200 candles históricos carregados (Binance Direto).",
  "[BOOT SYNC] Nenhuma posição ativa encontrada na Binance.",
  "[BACKFILL] BCHUSDT M5: 200 velas injetadas no buffer.",
  "[BOOT] BCHUSDT M5: 200 candles históricos carregados (Binance Direto).",
  "[MOTOR PRONTO] BCHUSDT calibrado com dados históricos (Motor Nativo JS).",
  "[BOOT] Aquecendo motor multi-timeframe: ARBUSDT (1h/15m/5m) — Requisitando 200 candles por TF...",
  "[BACKFILL] ARBUSDT H1: 200 velas injetadas no buffer.",
  "[BOOT] ARBUSDT H1: 200 candles históricos carregados (Binance Direto).",
  "[BACKFILL] ARBUSDT M15: 200 velas injetadas no buffer.",
  "[BOOT] ARBUSDT M15: 200 candles históricos carregados (Binance Direto).",
  "[BACKFILL] ARBUSDT M5: 200 velas injetadas no buffer.",
  "[BOOT] ARBUSDT M5: 200 candles históricos carregados (Binance Direto).",
  "[MOTOR PRONTO] ARBUSDT calibrado com dados históricos (Motor Nativo JS).",
  "[BOOT] Aquecendo motor multi-timeframe: XRPUSDT (1h/15m/5m) — Requisitando 200 candles por TF...",
  "[BACKFILL] XRPUSDT H1: 200 velas injetadas no buffer.",
  "[BOOT] XRPUSDT H1: 200 candles históricos carregados (Binance Direto).",
  "[BACKFILL] XRPUSDT M15: 200 velas injetadas no buffer.",
  "[BOOT] XRPUSDT M15: 200 candles históricos carregados (Binance Direto).",
  "[BACKFILL] XRPUSDT M5: 200 velas injetadas no buffer.",
  "[BOOT] XRPUSDT M5: 200 candles históricos carregados (Binance Direto).",
  "[MOTOR PRONTO] XRPUSDT calibrado com dados históricos (Motor Nativo JS).",
  "[BOOT] Aquecendo motor multi-timeframe: SANDUSDT (1h/15m/5m) — Requisitando 200 candles por TF...",
  "[BACKFILL] SANDUSDT H1: 200 velas injetadas no buffer.",
  "[BOOT] SANDUSDT H1: 200 candles históricos carregados (Binance Direto).",
  "[BACKFILL] SANDUSDT M15: 200 velas injetadas no buffer.",
  "[BOOT] SANDUSDT M15: 200 candles históricos carregados (Binance Direto).",
  "[BACKFILL] SANDUSDT M5: 200 velas injetadas no buffer.",
  "[BOOT] SANDUSDT M5: 200 candles históricos carregados (Binance Direto).",
  "[MOTOR PRONTO] SANDUSDT calibrado com dados históricos (Motor Nativo JS).",
  "[BOOT] Aquecendo motor multi-timeframe: ATOMUSDT (1h/15m/5m) — Requisitando 200 candles por TF...",
  "[BACKFILL] ATOMUSDT H1: 200 velas injetadas no buffer.",
  "[BOOT] ATOMUSDT H1: 200 candles históricos carregados (Binance Direto).",
  "[BACKFILL] ATOMUSDT M15: 200 velas injetadas no buffer.",
  "[BOOT] ATOMUSDT M15: 200 candles históricos carregados (Binance Direto).",
  "[BACKFILL] ATOMUSDT M5: 200 velas injetadas no buffer.",
  "[BOOT] ATOMUSDT M5: 200 candles históricos carregados (Binance Direto).",
  "[MOTOR PRONTO] ATOMUSDT calibrado com dados históricos (Motor Nativo JS).",
  "[BOOT] Aquecendo motor multi-timeframe: LINKUSDT (1h/15m/5m) — Requisitando 200 candles por TF...",
  "[BACKFILL] LINKUSDT H1: 200 velas injetadas no buffer.",
  "[BOOT] LINKUSDT H1: 200 candles históricos carregados (Binance Direto).",
  "[BACKFILL] LINKUSDT M15: 200 velas injetadas no buffer.",
  "[BOOT] LINKUSDT M15: 200 candles históricos carregados (Binance Direto).",
  "[BACKFILL] LINKUSDT M5: 200 velas injetadas no buffer.",
  "[BOOT] LINKUSDT M5: 200 candles históricos carregados (Binance Direto).",
  "[MOTOR PRONTO] LINKUSDT calibrado com dados históricos (Motor Nativo JS).",
  "[BOOT] Aquecendo motor multi-timeframe: TONUSDT (1h/15m/5m) — Requisitando 200 candles por TF...",
  "[BACKFILL] TONUSDT H1: 200 velas injetadas no buffer.",
  "[BOOT] TONUSDT H1: 200 candles históricos carregados (Binance Direto).",
  "[BACKFILL] TONUSDT M15: 200 velas injetadas no buffer.",
  "[BOOT] TONUSDT M15: 200 candles históricos carregados (Binance Direto).",
  "[BACKFILL] TONUSDT M5: 200 velas injetadas no buffer.",
  "[BOOT] TONUSDT M5: 200 candles históricos carregados (Binance Direto).",
  "[MOTOR PRONTO] TONUSDT calibrado com dados históricos (Motor Nativo JS).",
  "[BOOT] Aquecendo motor multi-timeframe: STXUSDT (1h/15m/5m) — Requisitando 200 candles por TF...",
  "[BACKFILL] STXUSDT H1: 200 velas injetadas no buffer.",
  "[BOOT] STXUSDT H1: 200 candles históricos carregados (Binance Direto).",
  "[BACKFILL] STXUSDT M15: 200 velas injetadas no buffer.",
  "[BOOT] STXUSDT M15: 200 candles históricos carregados (Binance Direto).",
  "[BACKFILL] STXUSDT M5: 200 velas injetadas no buffer.",
  "[BOOT] STXUSDT M5: 200 candles históricos carregados (Binance Direto).",
  "[MOTOR PRONTO] STXUSDT calibrado com dados históricos (Motor Nativo JS).",
  "[BOOT] Aquecendo motor multi-timeframe: FETUSDT (1h/15m/5m) — Requisitando 200 candles por TF...",
  "[BACKFILL] FETUSDT H1: 200 velas injetadas no buffer.",
  "[BOOT] FETUSDT H1: 200 candles históricos carregados (Binance Direto).",
  "[BACKFILL] FETUSDT M15: 200 velas injetadas no buffer.",
  "[BOOT] FETUSDT M15: 200 candles históricos carregados (Binance Direto).",
  "[BACKFILL] FETUSDT M5: 200 velas injetadas no buffer.",
  "[BOOT] FETUSDT M5: 200 candles históricos carregados (Binance Direto).",
  "[MOTOR PRONTO] FETUSDT calibrado com dados históricos (Motor Nativo JS).",
  "[BOOT COMPLETO] Todos os buffers aquecidos sequencialmente. Abrindo túnel WebSocket.",
  "[ARQUITETURA] Modo Shadow Trading: Lendo dados REAIS (WS Stream), Executando na TESTNET.",
  "[WS STREAM] Conectando via Subscription Payload (Anti-WAF)...",
  "  URL: wss://fstream.binance.com/ws",
  "[WS STREAM] Handshake OK! Enviando SUBSCRIBE...",
  "[WS STREAM] SUBSCRIBE enviado: 55 streams",
  "[WS SUBSCRIBE] Confirmado (id: 1). Streams ativos!",
  "» TRADE ENGINE ACTIVE. Listening for market signals..."
];

export default function Home() {
  const { lang, setLang, t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [contactStatus, setContactStatus] = useState<'idle'|'success'|'error'>('idle');

  const terminalScrollRef = useRef<HTMLDivElement>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      if (res.ok) {
        setContactStatus('success');
        setContactForm({ name: '', email: '', message: '' });
      } else {
        setContactStatus('error');
      }
    } catch {
      setContactStatus('error');
    }
    setIsSending(false);
    setTimeout(() => setContactStatus('idle'), 4000);
  };

  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);

  useEffect(() => {
    // Typewriter effect para o terminal
    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < terminalLogs.length) {
        setDisplayedLogs(prev => [...prev, terminalLogs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
      }
    }, 150); // Velocidade de digitação das linhas (150ms)
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll exclusivo da caixa do terminal
  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTo({
        top: terminalScrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [displayedLogs]);

  const technologies = [
    { name: "JavaScript & TypeScript", icon: Code2, desc: "Desenvolvimento full stack com tipagem estática, garantindo código seguro e escalável no frontend e backend." },
    { name: "C++", icon: Cpu, desc: "Otimização de performance, resolução de gargalos e desenvolvimento de lógicas de execução de baixa latência." },
    { name: "Node.js", icon: Server, desc: "Construção de backends escaláveis, automação de tarefas e integração de bots de alta performance." },
    { name: "Python", icon: TerminalSquare, desc: "Lógica algorítmica complexa, processamento de dados e scripts focados em automação de rotinas." },
    { name: "Bancos de Dados", icon: Database, desc: "Modelagem, otimização e gestão de dados relacionais (PostgreSQL, MySQL) e não-relacionais, garantindo segurança e performance." },
    { name: "Gateways de Pagamento", icon: CreditCard, desc: "Integração de APIs financeiras (Stripe, Mercado Pago, PIX) em SaaS e e-commerce." },
    { name: "AWS & Cloud", icon: Cloud, desc: "Infraestrutura em nuvem, deploy de aplicações escaláveis, servidores VPS e gerenciamento de banco de dados." },
    { name: "ESP32 & IoT", icon: Activity, desc: "Desenvolvimento de sistemas embarcados, automação de hardware e integração de componentes físicos via WiFi/Bluetooth." },
    { name: "Frontend & UI", icon: MonitorSmartphone, desc: "Criação de interfaces web dinâmicas e responsivas utilizando React, Next.js, HTML estruturado e Tailwind CSS." },
    { name: "Electron", icon: Layers, desc: "Criação de aplicações desktop robustas e multiplataforma para gestão interna e ferramentas de uso diário." },
    { name: "WebSockets", icon: Activity, desc: "Arquitetura de comunicação em tempo real, garantindo transmissão de dados com latência zero." },
    { name: "Code Auditing", icon: ShieldCheck, desc: "Revisão profunda de arquitetura de software, identificação e correção de bugs críticos em lógicas complexas." }
  ];

  const projects = [
    {
      title: "FZ Quant Terminal",
      statusKey: "proj1Status",
      descKey: "proj1Desc",
      archKey: "proj1ModalArch",
      tech: ["Lógica de Sistemas", "WebSockets", "Debugging Avançado"],
      image: "/preview-bot.jpg", 
      link: "", 
      isPrivate: true,
      btnKey: "projPrivateBtn",
      btnIcon: Github
    },
    {
      title: "Plataforma de Agendamento Automotivo",
      statusKey: "proj2Status",
      descKey: "proj2Desc",
      archKey: "proj2ModalArch",
      tech: ["SaaS", "Banco de Dados SQL", "Full Stack"],
      image: "/preview-agendamento.jpg", 
      link: "https://github.com/GAGUINz", 
      btnText: "Ver no GitHub",
      btnIcon: Github
    },
    {
      title: "Arquitetura Lógica: Zero Hora Delivery",
      statusKey: "proj3Status",
      descKey: "proj3Desc",
      archKey: "proj3ModalArch",
      tech: ["Regras de Negócio", "E-commerce", "Estratégia"],
      image: "/preview-zerohora.jpg", 
      link: "https://zerohora.vercel.app/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnXjNjFx9AN8siqsmkKaKzBFsOPwoROgLi4GoUbXt7FtEnhTkYM8GSmT_jfv8_aem_RPQN49xss9nKx3WZojAHWQ", 
      btnKey: "proj3Btn",
      btnIcon: ZeroHoraIcon
    }
  ];

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <main className="min-h-screen pb-16 bg-zinc-950 text-zinc-100 font-sans selection:bg-violet-500/30 overflow-hidden relative">
      <div className="relative z-10">
        <header className="flex items-center justify-between p-8 max-w-7xl mx-auto relative z-50">
        <div className="text-2xl font-bold tracking-tighter text-white">Luciano Friedrich</div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <a href="#sobre-mim" className="text-zinc-400 hover:text-white transition-colors">{t('navAbout')}</a>
          <a href="#projetos" className="text-zinc-400 hover:text-white transition-colors">{t('navProjects')}</a>
          <a href="#habilidades" className="text-zinc-400 hover:text-white transition-colors">{t('navSkills')}</a>
          <a href="#contato" className="text-zinc-400 hover:text-white transition-colors">{t('navContact')}</a>
          
          <div className="flex bg-white/10 p-1 rounded-full border border-white/10 ml-4">
            {['PT', 'EN', 'ES'].map((l) => (
              <button 
                key={l}
                onClick={() => { setLang(l as 'PT'|'EN'|'ES'); }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === l ? 'bg-violet-500 text-white' : 'text-zinc-400 hover:text-white'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* HERO SECTION - COM A ANIMAÇÃO CONTAINER SCROLL E TERMINAL DINÂMICO */}
      <section className="relative z-10 -mt-16">
        <ContainerScroll
          titleComponent={
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white leading-tight">
                {t('heroTitle1')}<br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">
                  {t('heroTitle2')}
                </span>
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                {t('heroDesc')}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="#projetos" className="px-6 py-3 bg-white text-zinc-950 rounded-full font-semibold hover:bg-zinc-200 hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                  {t('heroBtn1')}
                </a>
                <a href="/cv.pdf" download className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 w-full sm:w-auto shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                  <Download size={18} /> {t('heroBtn2')}
                </a>
                <a href="#contato" className="px-6 py-3 border border-zinc-700 rounded-full text-zinc-300 hover:border-violet-500 hover:text-white hover:bg-violet-500/10 transition-all duration-300 w-full sm:w-auto text-center">
                  {t('navContact')}
                </a>
              </div>
            </div>
          }
        >
          {/* TERMINAL ANIMADO DENTRO DO QUADRO CENTRAL COM LOGS DINÂMICOS */}
          <div className="h-full w-full bg-[#0D0D12] rounded-[1.8rem] overflow-hidden flex flex-col relative group">
            <div className="flex items-center px-4 py-4 bg-white/5 border-b border-white/5 shrink-0">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="ml-4 text-xs font-mono text-zinc-500">FZ Quant Terminal</div>
            </div>
            
            <div 
              ref={terminalScrollRef}
              className="p-4 md:p-6 text-left font-mono text-[10px] md:text-xs overflow-y-auto flex-1 h-full"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#8b5cf6 transparent' }}
            >
              <div className="text-zinc-300 mb-3">
                <span className="text-green-400">PS C:\bot-trade&gt;</span>
                <span className="text-white ml-2">node web_server.js</span>
              </div>

              {/* Renderização dinâmica dos logs (Typewriter) */}
              <div className="space-y-1 sm:space-y-1.5 font-mono">
                {displayedLogs.map((log, i) => {
                  if (!log) return null;
                  let colorClass = "text-zinc-400";
                  if (log.includes("[BINANCE]") || log.includes("[DEMO TRADING]") || log.includes("» TRADE ENGINE ACTIVE") || log.includes("QUANT TERMINAL") || log.startsWith("===")) {
                    colorClass = "text-violet-300 font-bold";
                  } else if (log.includes("[BOOT]") || log.includes("[MOTOR PRONTO]") || log.includes("[BOOT COMPLETO]") || log.includes("READY") || log.includes("OK!")) {
                    colorClass = "text-emerald-400";
                  } else if (log.includes("[NEWS RADAR]") || log.includes("[PUSHOVER]") || log.includes("Aviso:")) {
                    colorClass = "text-amber-400";
                  } else if (log.includes("[ORDER-BOOK]") || log.includes("[WS STREAM]") || log.includes("[WS SUBSCRIBE]")) {
                    colorClass = "text-sky-400";
                  } else if (log.includes("[BACKFILL]") || log.includes("◇ injected")) {
                    colorClass = "text-zinc-500";
                  }

                  return (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`mb-1 ${colorClass}`}
                    >
                      {log}
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Cursor piscando no final */}
              <div className="mt-2 flex animate-pulse">
                <span className="text-green-400">█</span>
              </div>
            </div>
          </div>
        </ContainerScroll>
      </section>

      {/* SEÇÃO SOBRE MIM */}
      <motion.section 
        id="sobre-mim" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
        className="py-24 max-w-7xl mx-auto px-6 border-t border-white/5"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">{t('aboutTitle')}</h2>
            <div className="space-y-4 text-lg text-zinc-400 leading-relaxed mb-10">
              <p>{t('aboutP1')}</p>
              <p>{t('aboutP2')}</p>
              <p>{t('aboutP3')}</p>
            </div>
            
            {/* MINI DASHBOARD DE ESTATÍSTICAS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:bg-white/10 hover:border-violet-500/30 transition-all group">
                <Bug className="text-violet-500 mb-2 group-hover:scale-110 transition-transform" size={28} />
                <span className="text-2xl font-black text-white">+17</span>
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mt-1">{t('statsBugs')}</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:bg-white/10 hover:border-violet-500/30 transition-all group">
                <Rocket className="text-fuchsia-500 mb-2 group-hover:scale-110 transition-transform" size={28} />
                <span className="text-2xl font-black text-white">+3</span>
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mt-1">{t('statsSystems')}</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:bg-white/10 hover:border-violet-500/30 transition-all group">
                <Layers className="text-emerald-500 mb-2 group-hover:scale-110 transition-transform" size={28} />
                <span className="text-2xl font-black text-white">Full</span>
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mt-1">{t('statsStack')}</span>
              </div>
            </div>
            
          </div>
          
          {/* FOTO DE PERFIL */}
          <div className="relative h-80 w-full md:w-80 mx-auto lg:ml-auto rounded-[2rem] overflow-hidden border-2 border-white/10 hover:border-violet-500/50 transition-all shadow-2xl">
            <img 
              src="/minha-foto.jpg" 
              alt="Luciano Friedrich" 
              className="absolute inset-0 w-full h-full object-cover z-10"
            />
          </div>
        </div>
      </motion.section>

      {/* SEÇÃO DE PROJETOS */}
      <motion.section 
        id="projetos" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
        className="py-24 max-w-7xl mx-auto px-6 border-t border-white/5"
      >
        <h2 className="text-4xl font-bold text-white mb-12 tracking-tight">{t('projectsTitle')}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const Icon = project.btnIcon;
            return (
              <div 
                key={index} 
                onClick={() => { setSelectedProject(project); }}
                className="bg-white/5 rounded-3xl border border-white/10 flex flex-col overflow-hidden hover:bg-white/10 transition-colors group cursor-pointer" 
              >
                
                {/* ÁREA DA IMAGEM DE PREVIEW */}
                <div className="h-48 bg-zinc-900 relative border-b border-white/5 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500 z-10 relative"
                  />
                </div>

                {/* CONTEÚDO DO PROJETO */}
                <div className="p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                      {project.title}
                    </h3>
                    
                    <span className="inline-block px-2 py-1 bg-white/10 text-zinc-300 text-[10px] uppercase tracking-wider rounded font-bold mb-4">
                      {t(project.statusKey)}
                    </span>
                    
                    <p className="text-zinc-400 leading-relaxed text-sm line-clamp-3">
                      {t(project.descKey)}
                    </p>
                  </div>
                  
                  {/* BOTÃO DE AÇÃO */}
                  <button 
                    className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-violet-600 border border-white/10 hover:border-violet-500 rounded-xl text-sm font-semibold text-white transition-all duration-300"
                  >
                    Ver Case Study
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </motion.section>

      {/* SEÇÃO DE HABILIDADES */}
      <motion.section 
        id="habilidades" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
        className="py-24 max-w-7xl mx-auto px-6 border-t border-white/5"
      >
        <h2 className="text-4xl font-bold text-white tracking-tight">{t('skillsTitle')}</h2>
        <p className="mt-4 text-lg text-zinc-400 mb-12">
          {t('skillsDesc')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div key={index} className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-violet-500/50 hover:bg-white/10 transition-colors flex flex-col group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-violet-500/20 text-violet-400 rounded-lg group-hover:scale-110 group-hover:text-violet-300 transition-all">
                    <Icon size={20} />
                  </div>
                  <span className="text-lg font-bold text-white block">
                    {tech.name}
                  </span>
                </div>
                <span className="text-sm text-zinc-400 leading-relaxed">
                  {tech.desc}
                </span>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* FOOTER & CONTACT FORM */}
      <footer id="contato" className="py-24 max-w-4xl mx-auto px-6 mt-12 relative overflow-hidden">
        <div className="text-center mb-12 relative z-20">
          <h2 className="text-4xl font-bold text-white tracking-tight">{t('footerTitle')}</h2>
        </div>
        
        <div className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm relative overflow-hidden z-20">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-600/10 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
          
          <form onSubmit={handleContactSubmit} className="relative z-10 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">{t('contactName')}</label>
                <input type="text" required value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} className="bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">{t('contactEmail')}</label>
                <input type="email" required value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} className="bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-400">{t('contactMsg')}</label>
              <textarea required rows={4} value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})} className="bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors resize-none"></textarea>
            </div>
            
            <button type="submit" disabled={isSending} className="mt-4 px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {isSending ? <Activity className="animate-spin" size={20} /> : <Send size={20} />}
              {isSending ? t('contactSending') : t('contactSend')}
            </button>
            
            {contactStatus === 'success' && <div className="text-center text-emerald-400 font-medium mt-4">{t('contactSuccess')}</div>}
            {contactStatus === 'error' && <div className="text-center text-red-400 font-medium mt-4">{t('contactError')}</div>}
          </form>
        </div>
        
        <div className="mt-16 text-center relative z-20">
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <a href="https://www.linkedin.com/in/lucianofriedrich-dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-zinc-300 hover:text-white transition-all">
              <Linkedin size={18} /> LinkedIn
            </a>
            <a href="https://github.com/GAGUINz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-zinc-300 hover:text-white transition-all">
              <Github size={18} /> GitHub
            </a>
          </div>
          <p className="text-sm text-zinc-600">© 2026 Luciano Friedrich. {t('footerRights')}</p>
        </div>
      </footer>
      </div>

      {/* CASE STUDY MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-3xl bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]">
              <div className="relative h-48 sm:h-64 flex-shrink-0">
                <img src={selectedProject.image} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent pointer-events-none"></div>
                <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-colors"><X size={20} /></button>
              </div>
              <div className="p-6 sm:p-10 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#8b5cf6 transparent' }}>
                <span className="inline-block px-3 py-1 bg-violet-500/20 text-violet-300 text-xs uppercase tracking-wider rounded font-bold mb-4">{t(selectedProject.statusKey)}</span>
                <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">{selectedProject.title}</h3>
                <div className="space-y-6 text-zinc-400 leading-relaxed">
                  <p>{t(selectedProject.descKey)}</p>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5 border-l-2 border-l-violet-500">
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2"><Cpu size={18} className="text-violet-500"/> Tech & Arquitetura</h4>
                    <p className="text-sm leading-relaxed">{t(selectedProject.archKey)}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-4">
                    {selectedProject.tech.map((tech: string) => <span key={tech} className="px-3 py-1 bg-black/50 border border-white/10 text-zinc-300 rounded-full text-xs font-semibold">{tech}</span>)}
                  </div>
                  <div className="pt-8 flex justify-end">
                    {selectedProject.isPrivate ? (
                      <span className="flex items-center gap-2 px-6 py-3 bg-zinc-800 text-zinc-500 rounded-xl font-bold cursor-not-allowed border border-white/5">
                        <selectedProject.btnIcon size={18} /> {t(selectedProject.btnKey || 'proj1Btn')}
                      </span>
                    ) : (
                      <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold transition-all">
                        <selectedProject.btnIcon size={18} /> {t(selectedProject.btnKey || 'proj1Btn')}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
