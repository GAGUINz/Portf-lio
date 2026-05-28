"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'PT' | 'EN' | 'ES';

interface LanguageContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  PT: {
    navAbout: "Sobre Mim",
    navProjects: "Projetos",
    navSkills: "Habilidades",
    navContact: "Contato",
    heroTitle1: "Desenvolvedor Full Stack.",
    heroTitle2: "Engenharia & Automação.",
    heroDesc: "Foco em Node.js, Python e C++. Transformo lógicas complexas em bots de trading, plataformas SaaS e soluções IoT de ponta a ponta.",
    heroBtn1: "Ver Meus Projetos",
    heroBtn2: "Baixar CV",
    aboutTitle: "Sobre Mim",
    aboutP1: "Sou um desenvolvedor e empreendedor com foco na construção de sistemas robustos, de alta performance e totalmente integrados. Atualmente, estou no 4º período de Análise e Desenvolvimento de Sistemas (ADS) pela UCEFF e sou formado no curso de Programação Full Stack da Danki Code.",
    aboutP2: "Minha jornada técnica une uma forte base acadêmica à prática intensa de mercado. Aplico meus conhecimentos no desenvolvimento desde interfaces limpas com Next.js até lógicas complexas de backend (SQL/NoSQL) para bots de trading e automações em IoT.",
    aboutP3: "Além do desenvolvimento de software, vivencio a tecnologia no mundo dos negócios gerenciando minhas próprias operações, o que me proporciona uma visão afiada para criar soluções que realmente convertem e otimizam processos reais.",
    statsBugs: "Bugs Críticos Resolvidos",
    statsSystems: "Sistemas em Produção",
    statsStack: "Stack Developer",
    projectsTitle: "Projetos & Amostras",
    skillsTitle: "Stack Tecnológica & Domínio",
    skillsDesc: "Ferramentas e tecnologias que utilizo para construir soluções de ponta a ponta.",
    footerTitle: "Vamos construir algo incrível juntos?",
    footerContactBtn: "Enviar Mensagem",
    footerRights: "Todos os direitos reservados.",
    // Projetos
    proj1Status: "Localhost / Ferramenta Interna",
    proj1Desc: "Auditoria de código e resolução de 17 bugs críticos em um bot de trading. Otimização de conexões WebSocket, handlers de API e símbolos de moedas para latência zero.",
    proj1Btn: "Ver no GitHub",
    proj1ModalArch: "Arquitetura e Desafios: Refatoração completa de conexões WebSocket em tempo real, corrigindo vazamentos de memória (memory leaks) e problemas de dessincronização no Order Book da Binance. Implementação de Buffer Queue para prevenção de WAF.",
    proj2Status: "Em Desenvolvimento",
    proj2Desc: "Sistema web completo para agendamento de lavação e estética automotiva. Inclui gestão de horários em tempo real, painel administrativo e interface otimizada.",
    proj2ModalArch: "Arquitetura SaaS Serverless: Construído no ecossistema Next.js com banco PostgreSQL. Foco extremo na UX do cliente final para garantir conversão (agendamento em menos de 3 cliques). Lógica de fuso horário complexa no backend.",
    proj3Status: "Operação Temporariamente Pausada",
    proj3Desc: "Estruturação digital de um delivery de destilados. Implementação de regras de negócio dinâmicas, como ajuste automatizado de margens para viabilizar frete grátis na madrugada.",
    proj3ModalArch: "Engenharia de Negócios: Não apenas um e-commerce, mas um ecossistema com precificação dinâmica via API. Quando a madrugada avançava, o sistema aumentava as margens automaticamente para absorver custos logísticos mantendo frete grátis percebido.",
    proj3Btn: "Acessar Projeto",
    projPrivateBtn: "Repositório Privado",
    // Contact
    contactName: "Seu Nome",
    contactEmail: "Seu E-mail",
    contactMsg: "Como posso te ajudar?",
    contactSend: "Enviar Mensagem",
    contactSending: "Enviando...",
    contactSuccess: "Mensagem enviada com sucesso!",
    contactError: "Erro ao enviar mensagem."
  },
  EN: {
    navAbout: "About Me",
    navProjects: "Projects",
    navSkills: "Skills",
    navContact: "Contact",
    heroTitle1: "Full Stack Developer.",
    heroTitle2: "Engineering & Automation.",
    heroDesc: "Focused on Node.js, Python, and C++. I transform complex logics into trading bots, SaaS platforms, and end-to-end IoT solutions.",
    heroBtn1: "View My Projects",
    heroBtn2: "Download CV",
    aboutTitle: "About Me",
    aboutP1: "I'm a developer and entrepreneur focused on building robust, high-performance, and fully integrated systems. I'm currently in my 4th semester of Systems Analysis and Development (ADS) at UCEFF and graduated from the Full Stack Programming course at Danki Code.",
    aboutP2: "My technical journey combines a strong academic foundation with intense market practice. I apply my knowledge from clean interfaces with Next.js to complex backend logics (SQL/NoSQL) for trading bots and IoT automations.",
    aboutP3: "Beyond software development, I experience technology in the business world by managing my own operations, which gives me a sharp vision to create solutions that actually convert and optimize real processes.",
    statsBugs: "Critical Bugs Fixed",
    statsSystems: "Systems in Production",
    statsStack: "Stack Developer",
    projectsTitle: "Projects & Showcases",
    skillsTitle: "Tech Stack & Mastery",
    skillsDesc: "Tools and technologies I use to build end-to-end solutions.",
    footerTitle: "Let's build something amazing together?",
    footerContactBtn: "Send Message",
    footerRights: "All rights reserved.",
    proj1Status: "Localhost / Internal Tool",
    proj1Desc: "Code auditing and resolution of 17 critical bugs in a trading bot. Optimization of WebSocket connections, API handlers, and coin symbols for zero latency.",
    proj1Btn: "View on GitHub",
    proj1ModalArch: "Architecture & Challenges: Complete refactoring of real-time WebSocket connections, fixing memory leaks and desync issues in the Binance Order Book. Implemented a Buffer Queue for WAF prevention.",
    proj2Status: "In Development",
    proj2Desc: "Complete web system for automotive aesthetics and washing scheduling. Includes real-time time management, administrative panel, and optimized interface.",
    proj2ModalArch: "Serverless SaaS Architecture: Built in the Next.js ecosystem with PostgreSQL database. Extreme focus on the end-user UX to ensure conversion (booking in under 3 clicks). Complex timezone logic in the backend.",
    proj3Status: "Operation Temporarily Paused",
    proj3Desc: "Digital structuring of a spirits delivery. Implementation of dynamic business rules, such as automated margin adjustment to enable free shipping at night.",
    proj3ModalArch: "Business Engineering: Not just an e-commerce, but an ecosystem with dynamic pricing via API. As the night progressed, the system automatically increased margins to absorb logistical costs while maintaining perceived free shipping.",
    proj3Btn: "Access Project",
    projPrivateBtn: "Private Repository",
    contactName: "Your Name",
    contactEmail: "Your Email",
    contactMsg: "How can I help you?",
    contactSend: "Send Message",
    contactSending: "Sending...",
    contactSuccess: "Message sent successfully!",
    contactError: "Error sending message."
  },
  ES: {
    navAbout: "Sobre Mí",
    navProjects: "Proyectos",
    navSkills: "Habilidades",
    navContact: "Contacto",
    heroTitle1: "Desarrollador Full Stack.",
    heroTitle2: "Ingeniería y Automatización.",
    heroDesc: "Enfocado en Node.js, Python y C++. Transformo lógicas complejas en bots de trading, plataformas SaaS y soluciones IoT de principio a fin.",
    heroBtn1: "Ver Mis Proyectos",
    heroBtn2: "Descargar CV",
    aboutTitle: "Sobre Mí",
    aboutP1: "Soy un desarrollador y emprendedor centrado en la construcción de sistemas robustos, de alto rendimiento y totalmente integrados. Actualmente, curso el 4º semestre de Análisis y Desarrollo de Sistemas (ADS) en UCEFF y estoy graduado del curso de Programación Full Stack en Danki Code.",
    aboutP2: "Mi trayectoria técnica combina una sólida base académica con intensa práctica en el mercado. Aplico mis conocimientos desde interfaces limpias con Next.js hasta complejas lógicas de backend (SQL/NoSQL) para bots de trading y automatizaciones IoT.",
    aboutP3: "Más allá del desarrollo de software, vivo la tecnología en el mundo de los negocios gestionando mis propias operaciones, lo que me proporciona una visión aguda para crear soluciones que realmente convierten y optimizan procesos reales.",
    statsBugs: "Bugs Críticos Resueltos",
    statsSystems: "Sistemas en Producción",
    statsStack: "Stack Developer",
    projectsTitle: "Proyectos y Muestras",
    skillsTitle: "Stack Tecnológico y Dominio",
    skillsDesc: "Herramientas y tecnologías que utilizo para construir soluciones integrales.",
    footerTitle: "¿Construimos algo increíble juntos?",
    footerContactBtn: "Enviar Mensaje",
    footerRights: "Todos los derechos reservados.",
    proj1Status: "Localhost / Herramienta Interna",
    proj1Desc: "Auditoría de código y resolución de 17 bugs críticos en un bot de trading. Optimización de conexiones WebSocket, manejadores de API y símbolos de monedas para latencia cero.",
    proj1Btn: "Ver en GitHub",
    proj1ModalArch: "Arquitectura y Desafíos: Refactorización completa de conexiones WebSocket en tiempo real, corrigiendo fugas de memoria (memory leaks) y problemas de desincronización en el Order Book de Binance. Implementación de Buffer Queue para la prevención de WAF.",
    proj2Status: "En Desarrollo",
    proj2Desc: "Sistema web completo para programación de estética automotriz y lavado. Incluye gestión de tiempos en tiempo real, panel administrativo e interfaz optimizada.",
    proj2ModalArch: "Arquitectura SaaS Serverless: Construido en el ecosistema Next.js con base de datos PostgreSQL. Enfoque extremo en la UX del cliente final para asegurar la conversión (reserva en menos de 3 clics). Lógica de zona horaria compleja en el backend.",
    proj3Status: "Operación Pausada Temporalmente",
    proj3Desc: "Estructuración digital de un delivery de licores. Implementación de reglas de negocio dinámicas, como ajuste automatizado de márgenes para permitir envío gratuito de madrugada.",
    proj3ModalArch: "Ingeniería de Negocios: No solo un comercio electrónico, sino un ecosistema con precios dinámicos a través de API. A medida que avanzaba la noche, el sistema aumentaba automáticamente los márgenes para absorber costos logísticos manteniendo un envío gratuito percibido.",
    proj3Btn: "Acceder al Proyecto",
    projPrivateBtn: "Repositorio Privado",
    contactName: "Tu Nombre",
    contactEmail: "Tu Correo",
    contactMsg: "¿Cómo te puedo ayudar?",
    contactSend: "Enviar Mensaje",
    contactSending: "Enviando...",
    contactSuccess: "¡Mensaje enviado con éxito!",
    contactError: "Error al enviar el mensaje."
  }
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('PT');

  // Recupera idioma do localstorage se houver
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-lang');
    if (saved === 'EN' || saved === 'ES' || saved === 'PT') {
      setLang(saved);
    } else {
      // Auto-detect based on navigator
      const browserLang = navigator.language.slice(0, 2).toUpperCase();
      if (browserLang === 'EN' || browserLang === 'ES') {
        setLang(browserLang);
      }
    }
  }, []);

  const changeLang = (l: Language) => {
    setLang(l);
    localStorage.setItem('portfolio-lang', l);
  };

  const t = (key: string) => {
    // @ts-ignore
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
