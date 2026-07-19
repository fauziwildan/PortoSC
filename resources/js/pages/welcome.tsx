import { Head, Link } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import {
    Terminal,
    ExternalLink,
    ArrowRight,
    Play,
    Pause,
    RotateCcw,
    Smartphone,
    Monitor,
    Send,
} from 'lucide-react';

interface Project {
    id: string;
    title: string;
    category: 'event-tech' | 'corporate';
    categoryLabel: string;
    description: string;
    image?: string;
    tags: string[];
    demoUrl: string;
    wireframeType:
        'erp' | 'timer' | 'profile' | 'spinwheel' | 'rsvp' | 'danmaku';
}

export default function Welcome() {
    // Terminal typing simulator state
    const [typedTitle, setTypedTitle] = useState('');
    const [typedSub, setTypedSub] = useState('');
    const [showSystemLog, setShowSystemLog] = useState(true);
    const [cursorVisible, setCursorVisible] = useState(true);

    const fullTitle = '> INITIALIZING SUDDENLY CREATIVE...';
    const fullSub =
        'We engineer high-performance web systems and event technologies.';

    useEffect(() => {
        // Cursor blinking timer
        const cursorTimer = setInterval(() => {
            setCursorVisible((v) => !v);
        }, 450);

        let titleIndex = 0;
        let subIndex = 0;

        const startTypingTitle = () => {
            const titleTimer = setInterval(() => {
                setTypedTitle(fullTitle.substring(0, titleIndex));
                titleIndex++;
                if (titleIndex > fullTitle.length) {
                    clearInterval(titleTimer);
                    startTypingSub();
                }
            }, 40);
        };

        const startTypingSub = () => {
            const subTimer = setInterval(() => {
                setTypedSub(fullSub.substring(0, subIndex));
                subIndex++;
                if (subIndex > fullSub.length) {
                    clearInterval(subTimer);
                }
            }, 20);
        };

        const logTimer = setTimeout(() => {
            setShowSystemLog(false);
            startTypingTitle();
        }, 1500);

        return () => {
            clearInterval(cursorTimer);
            clearTimeout(logTimer);
        };
    }, []);

    // Filter state
    const [activeFilter, setActiveFilter] = useState<string>('all');

    // Contact form submission via FormSubmit
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        scope: 'EVENT_TECH',
        message: '',
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isTransmitting, setIsTransmitting] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors((prev) => {
                const copy = { ...prev };
                delete copy[name];
                return copy;
            });
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errors: Record<string, string> = {};
        if (!formData.name.trim()) errors.name = 'FATAL: NAME_REQUIRED';
        if (!formData.email.trim()) {
            errors.email = 'FATAL: EMAIL_REQUIRED';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'FATAL: MALFORMED_EMAIL_ADDRESS';
        }
        if (!formData.message.trim())
            errors.message = 'FATAL: SPECIFICATION_PAYLOAD_EMPTY';

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setIsTransmitting(true);

        // FormSubmit AJAX integration
        fetch('https://formsubmit.co/ajax/fauziwildan.widyatama@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                scope: formData.scope,
                message: formData.message,
                _subject: 'New Inquiry from Suddenly Creative Portfolio',
            }),
        })
            .then((res) => res.json())
            .then(() => {
                setIsTransmitting(false);
                setFormSubmitted(true);
                setFormData({
                    name: '',
                    email: '',
                    scope: 'EVENT_TECH',
                    message: '',
                });
            })
            .catch(() => {
                setIsTransmitting(false);
                alert(
                    'ERROR: TRANSMISSION_FAILED. Please verify internet connection.',
                );
            });
    };

    // Exact 6 Projects Requested
    const projects: Project[] = [
        {
            id: 'Project_01',
            title: 'Web ERP',
            category: 'corporate',
            categoryLabel: 'CORPORATE',
            description:
                'Comprehensive resource planning architecture for corporate efficiency.',
            image: '/assets/horizon_saas.jpg',
            tags: ['Laravel', 'PostgreSQL', 'Inertia.js', 'React'],
            demoUrl: '#',
            wireframeType: 'erp',
        },
        {
            id: 'Project_02',
            title: 'Stage Timer',
            category: 'event-tech',
            categoryLabel: 'EVENT TECH',
            description:
                'Precision time-management system for live events and broadcast run-of-shows.',
            image: '/assets/vortex_landing.jpg',
            tags: ['WebSockets', 'React', 'Tailwind', 'Node.js'],
            demoUrl: '#',
            wireframeType: 'timer',
        },
        {
            id: 'Project_03',
            title: 'Omni-Platform Company Profile',
            category: 'corporate',
            categoryLabel: 'CORPORATE',
            description:
                'Unified corporate identity application built for Web and Android.',
            image: '/assets/logo.jpg',
            tags: ['React Native', 'Laravel', 'REST API', 'Vite'],
            demoUrl: '#',
            wireframeType: 'profile',
        },
        {
            id: 'Project_04',
            title: 'Interactive Spinwheel',
            category: 'event-tech',
            categoryLabel: 'EVENT TECH',
            description:
                'Gamified digital activation tool for door prizes and event engagement.',
            image: '/assets/apex_ecommerce.jpg',
            tags: ['HTML5 Canvas', 'React', 'Tailwind', 'AudioContext'],
            demoUrl: '#',
            wireframeType: 'spinwheel',
        },
        {
            id: 'Project_05',
            title: 'Digital Invitation & RSVP',
            category: 'event-tech',
            categoryLabel: 'EVENT TECH',
            description:
                'Automated guest management and interactive digital dispatch for exclusive events.',
            image: '/assets/horizon_saas.jpg',
            tags: ['Next.js', 'React', 'Tailwind', 'Node.js'],
            demoUrl: '#',
            wireframeType: 'rsvp',
        },
        {
            id: 'Project_06',
            title: 'Danmaku Live-Comment Engine',
            category: 'event-tech',
            categoryLabel: 'EVENT TECH',
            description:
                'Real-time bullet-screen messaging architecture for high-engagement live broadcasts.',
            image: '/assets/apex_ecommerce.jpg',
            tags: ['WebSockets', 'React', 'Go', 'Tailwind'],
            demoUrl: '#',
            wireframeType: 'danmaku',
        },
    ];

    const filteredProjects =
        activeFilter === 'all'
            ? projects
            : projects.filter((p) => p.category === activeFilter);

    // Modal active state
    const [activeDemo, setActiveDemo] = useState<string | null>(null);

    // INTERACTIVE MINI-APP STATES

    // 1. Stage Timer
    const [timeLeft, setTimeLeft] = useState(900); // 15 mins
    const [timerRunning, setTimerRunning] = useState(false);
    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (timerRunning) {
            timerIntervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setTimerRunning(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
            }
        }
        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
            }
        };
    }, [timerRunning]);

    const formatTimer = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return [
            hrs.toString().padStart(2, '0'),
            mins.toString().padStart(2, '0'),
            secs.toString().padStart(2, '0'),
        ].join(':');
    };

    // 2. Omni-Platform Profile
    const [isMobileView, setIsMobileView] = useState(false);

    // 3. Interactive Spinwheel
    const [spinDegrees, setSpinDegrees] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [spinPrize, setSpinPrize] = useState<string | null>(null);
    const prizes = [
        'FREE_CONSULTATION',
        '50%_OFF_LANDING',
        'SORRY_NO_PRIZE',
        'SUDDEN_SWAG_BOX',
        'DEV_AUDIT_KEY',
        'TRY_AGAIN_SH',
    ];

    const triggerSpin = () => {
        if (isSpinning) return;
        setIsSpinning(true);
        setSpinPrize(null);
        const randomPrizeIndex = Math.floor(Math.random() * prizes.length);
        const additionalDegrees =
            1440 + randomPrizeIndex * (360 / prizes.length);
        const targetDegrees = spinDegrees + additionalDegrees;
        setSpinDegrees(targetDegrees);

        setTimeout(() => {
            setIsSpinning(false);
            setSpinPrize(prizes[randomPrizeIndex]);
        }, 3000);
    };

    // 4. RSVP Ticket
    const [rsvpName, setRsvpName] = useState('');
    const [rsvpAttending, setRsvpAttending] = useState('YES');
    const [rsvpDone, setRsvpDone] = useState(false);

    // 5. Danmaku Live-Comments
    const [danmakus, setDanmakus] = useState<
        { id: number; text: string; top: number }[]
    >([]);
    const [danmakuInput, setDanmakuInput] = useState('');
    const danmakuIdRef = useRef(0);

    const sendDanmaku = (e: React.FormEvent) => {
        e.preventDefault();
        if (!danmakuInput.trim()) return;
        const newDanmaku = {
            id: danmakuIdRef.current++,
            text: danmakuInput,
            top: Math.floor(Math.random() * 70) + 10, // Random top between 10% and 80%
        };
        setDanmakus((prev) => [...prev, newDanmaku]);
        setDanmakuInput('');
    };

    const closeDemoModal = () => {
        setActiveDemo(null);
        setTimerRunning(false);
        setTimeLeft(900);
        setRsvpDone(false);
        setRsvpName('');
        setDanmakus([]);
        setSpinPrize(null);
        setSpinDegrees(0);
    };

    return (
        <>
            <Head>
                <title>Suddenly Creative | root@suddenly-creative:~#</title>
                <meta
                    name="description"
                    content="Brutalist terminal gateway for Suddenly Creative web development agency."
                />
            </Head>

            {/* Embedded programmers fonts override */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&display=swap');
        .hacker-terminal {
          font-family: 'Fira Code', 'Courier New', Courier, monospace !important;
        }
        .hacker-terminal ::selection {
          background-color: #FFFFFF !important;
          color: #000000 !important;
        }
        @keyframes danmaku-marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100vw); }
        }
        .danmaku-item {
          animation: danmaku-marquee 7s linear forwards;
          white-space: nowrap;
        }
      `}</style>

            <div className="hacker-terminal relative m-0 min-h-screen overflow-x-hidden bg-[#000000] p-0 text-sm text-[#FFFFFF] select-text selection:bg-white selection:text-black">
                {/* Analog screen CRT scanline effect */}
                <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.015)_50%,rgba(0,0,0,0.12)_50%)] bg-[size:100%_4px]"></div>

                {/* 1. Navbar (Strictly Public - No Auth) */}
                <header className="sticky top-0 z-40 border-b border-[#FFFFFF] bg-[#000000]">
                    <div className="mx-auto flex max-w-7xl items-center justify-between p-4 md:px-8">
                        {/* Left Header Logo */}
                        <Link href="/" className="flex items-center">
                            <img
                                src="/logo-putih.png"
                                className="h-10 w-auto rounded-none bg-transparent object-contain"
                                alt="Suddenly Creative"
                            />
                        </Link>

                        {/* Menu */}
                        <nav className="flex items-center gap-6">
                            <a
                                href="#services"
                                className="border border-transparent p-1 transition-none hover:bg-white hover:text-black"
                            >
                                [ capabilities.sh ]
                            </a>
                            <a
                                href="#projects"
                                className="border border-transparent p-1 transition-none hover:bg-white hover:text-black"
                            >
                                [ /var/www/portfolio ]
                            </a>
                            <a
                                href="#contact"
                                className="border border-transparent p-1 transition-none hover:bg-white hover:text-black"
                            >
                                [ contact_gateway ]
                            </a>
                        </nav>
                    </div>
                </header>

                {/* 2. Hero Section */}
                <section className="border-b border-[#FFFFFF] py-16 md:py-24">
                    <div className="mx-auto max-w-7xl px-4 md:px-8">
                        {/* Terminal Window Header */}
                        <div className="mb-10 flex items-center justify-between border border-[#FFFFFF] bg-[#000000] p-2">
                            <div className="flex items-center gap-2">
                                <span className="inline-block h-3 w-3 border border-white bg-white"></span>
                                <span className="inline-block h-3 w-3 border border-white"></span>
                                <span className="inline-block h-3 w-3 border border-white"></span>
                                <span className="ml-2 text-xs font-semibold">
                                    suddenly_creative_core.sh
                                </span>
                            </div>
                            <span className="text-xs">LOG_LVL: STABLE</span>
                        </div>

                        {/* Startup Logs / Shell Sequence */}
                        {showSystemLog ? (
                            <div className="flex min-h-[250px] flex-col justify-start gap-1 font-mono">
                                <p>&gt; MOUNTING DEV_DRIVE_01 ... OK</p>
                                <p>&gt; ESTABLISHING COMPILER ENGINES ... OK</p>
                                <p>
                                    &gt; CONNECTING SYSTEM CORE BINDINGS ...
                                    SUCCESS
                                </p>
                                <p>
                                    &gt; REACT V19 ACTIVE // TAILWIND V4
                                    EMULATOR ONLINE
                                </p>
                                <p>&gt; load suddenly_creative.exe ... OK</p>
                                <span className="animate-pulse">█</span>
                            </div>
                        ) : (
                            <div className="flex min-h-[250px] flex-col justify-between">
                                <div>
                                    {/* Console prompt title reveal */}
                                    <h1 className="mb-6 max-w-4xl text-3xl font-bold tracking-tighter uppercase sm:text-5xl md:text-6xl">
                                        {typedTitle}
                                        <span
                                            className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} ml-1`}
                                        >
                                            █
                                        </span>
                                    </h1>

                                    {/* Subheadline */}
                                    <p className="mb-10 max-w-2xl text-base leading-relaxed font-light text-gray-300 md:text-lg">
                                        {typedSub}
                                    </p>
                                </div>

                                {/* Hero CTAs */}
                                <div className="flex flex-wrap gap-4">
                                    <a
                                        href="#projects"
                                        className="flex items-center gap-2 border border-[#FFFFFF] px-6 py-3 font-bold transition-none hover:border-black hover:bg-white hover:text-black"
                                    >
                                        <span>[ RUN PORTFOLIO_QUERY ]</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </a>
                                    <a
                                        href="#contact"
                                        className="border border-[#FFFFFF] px-6 py-3 transition-none hover:border-black hover:bg-white hover:text-black"
                                    >
                                        [ EXECUTE CONTACT_DIAL ]
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* 3. Capabilities / "Capabilities.sh" */}
                <section
                    id="services"
                    className="border-b border-[#FFFFFF] bg-[#000000] py-20"
                >
                    <div className="mx-auto max-w-7xl px-4 md:px-8">
                        {/* Section Header */}
                        <div className="mb-12">
                            <span className="border border-[#FFFFFF] px-3 py-1 text-xs font-bold">
                                SYSTEM_CAPABILITIES
                            </span>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight uppercase">
                                01 // Capabilities.sh
                            </h2>
                        </div>

                        {/* List grid with 1px border lines */}
                        <div className="grid grid-cols-1 border-t border-l border-[#FFFFFF] md:grid-cols-2">
                            {/* Service 1 */}
                            <div className="group border-r border-b border-[#FFFFFF] p-8 transition-none hover:bg-white hover:text-black">
                                <span className="mb-2 block text-lg font-bold text-purple-400 transition-none group-hover:text-black">
                                    &gt; [ EVENT TECH ]
                                </span>
                                <h3 className="mb-3 text-base font-bold">
                                    QR Code Registration, Quick Check-in &
                                    Digital Invitations
                                </h3>
                                <p className="text-xs leading-relaxed font-light text-gray-400 transition-none group-hover:text-black">
                                    Custom high-speed check-in systems
                                    engineered with instant camera scanner
                                    engines and automated digital dispatch for
                                    RSVP invitations.
                                </p>
                            </div>

                            {/* Service 2 */}
                            <div className="group border-r border-b border-[#FFFFFF] p-8 transition-none hover:bg-white hover:text-black">
                                <span className="mb-2 block text-lg font-bold text-cyan-400 transition-none group-hover:text-black">
                                    &gt; [ EVENT TECH ]
                                </span>
                                <h3 className="mb-3 text-base font-bold">
                                    Live Polling, Danmaku Displays & Interactive
                                    Dashboards
                                </h3>
                                <p className="text-xs leading-relaxed font-light text-gray-400 transition-none group-hover:text-black">
                                    Real-time broadcast dashboards streaming
                                    live polling parameters, live-comment
                                    Danmaku bullet screens, and customized
                                    analytics viewports.
                                </p>
                            </div>

                            {/* Service 3 */}
                            <div className="group border-r border-b border-[#FFFFFF] p-8 transition-none hover:bg-white hover:text-black">
                                <span className="mb-2 block text-lg font-bold text-pink-400 transition-none group-hover:text-black">
                                    &gt; [ EVENT TECH ]
                                </span>
                                <h3 className="mb-3 text-base font-bold">
                                    Event Gamification & Digital Photobooths
                                </h3>
                                <p className="text-xs leading-relaxed font-light text-gray-400 transition-none group-hover:text-black">
                                    Interactive browser scripts executing web
                                    photobooths, prize-wheel modules, and custom
                                    digital outputs.
                                </p>
                            </div>

                            {/* Service 4 */}
                            <div className="group border-r border-b border-[#FFFFFF] p-8 transition-none hover:bg-white hover:text-black">
                                <span className="mb-2 block text-lg font-bold text-yellow-400 transition-none group-hover:text-black">
                                    &gt; [ CORPORATE ]
                                </span>
                                <h3 className="mb-3 text-base font-bold">
                                    Custom ERP (Enterprise Resource Planning)
                                </h3>
                                <p className="text-xs leading-relaxed font-light text-gray-400 transition-none group-hover:text-black">
                                    Bespoke resource management databases
                                    optimizing logistics operations, real-time
                                    tracking, and administrative pipelines.
                                </p>
                            </div>

                            {/* Service 5 */}
                            <div className="group border-r border-b border-[#FFFFFF] p-8 transition-none hover:bg-white hover:text-black">
                                <span className="mb-2 block text-lg font-bold text-emerald-400 transition-none group-hover:text-black">
                                    &gt; [ CORPORATE ]
                                </span>
                                <h3 className="mb-3 text-base font-bold">
                                    HRIS, CRM, & Inventory Management Systems
                                </h3>
                                <p className="text-xs leading-relaxed font-light text-gray-400 transition-none group-hover:text-black">
                                    Highly secure client portals storing company
                                    metrics, inventory flows, and human resource
                                    statistics securely.
                                </p>
                            </div>

                            {/* Service 6 */}
                            <div className="group border-r border-b border-[#FFFFFF] p-8 transition-none hover:bg-white hover:text-black">
                                <span className="mb-2 block text-lg font-bold text-indigo-400 transition-none group-hover:text-black">
                                    &gt; [ CORPORATE ]
                                </span>
                                <h3 className="mb-3 text-base font-bold">
                                    Cross-platform Company Profiles (Web &
                                    Android)
                                </h3>
                                <p className="text-xs leading-relaxed font-light text-gray-400 transition-none group-hover:text-black">
                                    Unified enterprise branding panels
                                    engineered for high-performance mobile views
                                    and multi-browser targets.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Projects / "/var/www/portfolio" */}
                <section
                    id="projects"
                    className="border-b border-[#FFFFFF] bg-[#000000] py-20"
                >
                    <div className="mx-auto max-w-7xl px-4 md:px-8">
                        {/* Header and filters */}
                        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                            <div>
                                <span className="border border-[#FFFFFF] px-3 py-1 text-xs font-bold">
                                    var/www/portfolio
                                </span>
                                <h2 className="mt-4 text-3xl font-bold tracking-tight uppercase">
                                    02 // Executed Files
                                </h2>
                            </div>

                            {/* Category Filter Controls */}
                            <div className="flex flex-wrap gap-2 border border-[#FFFFFF] bg-black p-1">
                                {[
                                    { key: 'all', label: 'ALL_METRICS' },
                                    {
                                        key: 'event-tech',
                                        label: 'EVENT_TECH.EXE',
                                    },
                                    {
                                        key: 'corporate',
                                        label: 'CORPORATE.SYS',
                                    },
                                ].map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveFilter(tab.key)}
                                        className={`px-3 py-1 text-xs font-bold transition-none ${
                                            activeFilter === tab.key
                                                ? 'bg-white text-black'
                                                : 'text-white hover:bg-white hover:text-black'
                                        }`}
                                    >
                                        [{tab.label}]
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Brutalist Grid showing all 6 projects */}
                        <div className="grid grid-cols-1 border-t border-l border-[#FFFFFF] md:grid-cols-3">
                            {filteredProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="group flex flex-col justify-between border-r border-b border-[#FFFFFF] bg-black transition-none hover:border-[#FFFFFF]"
                                >
                                    {/* Card metadata bar */}
                                    <div className="flex items-center justify-between border-b border-[#FFFFFF] p-3 text-xs">
                                        <span>NAME: {project.id}</span>
                                        <span className="text-gray-400">
                                            CLASS: {project.categoryLabel}
                                        </span>
                                    </div>

                                    {/* Wireframe Thumbnails */}
                                    <div className="relative flex aspect-video w-full items-center justify-center border-b border-[#FFFFFF] bg-black p-4 select-none">
                                        {/* Project 1: Web ERP Wireframe */}
                                        {project.wireframeType === 'erp' && (
                                            <div className="flex h-full w-full border border-white">
                                                <div className="flex w-1/4 flex-col gap-2 border-r border-white p-2">
                                                    <div className="h-2 border border-white"></div>
                                                    <div className="h-2 border border-white"></div>
                                                    <div className="h-2 border border-white"></div>
                                                </div>
                                                <div className="grid flex-1 grid-cols-2 gap-2 p-2">
                                                    <div className="flex h-10 flex-col justify-between border border-white p-1 text-[8px]">
                                                        <span>$__</span>
                                                        <span className="w-full border-t border-dashed border-white"></span>
                                                    </div>
                                                    <div className="flex h-10 flex-col justify-between border border-white p-1 text-[8px]">
                                                        <span>U__</span>
                                                        <span className="w-full border-t border-dashed border-white"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Project 2: Stage Timer Wireframe */}
                                        {project.wireframeType === 'timer' && (
                                            <div className="flex h-full w-full flex-col items-center justify-center gap-2 border border-white p-3">
                                                <span className="font-mono text-xl font-bold tracking-widest">
                                                    00:15:00
                                                </span>
                                                <div className="flex gap-2">
                                                    <span className="border border-white px-1 text-[9px]">
                                                        [RUN]
                                                    </span>
                                                    <span className="border border-white px-1 text-[9px]">
                                                        [PAUS]
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Project 3: Omni-Platform profile Wireframe */}
                                        {project.wireframeType ===
                                            'profile' && (
                                            <div className="flex h-full w-full items-center justify-center gap-4">
                                                <div className="flex h-16 w-24 flex-col gap-1 border border-white p-1">
                                                    <div className="flex h-2 items-center gap-1 border-b border-white px-1">
                                                        <span className="block h-1 w-1 rounded-full bg-white"></span>
                                                        <span className="block h-1 w-1 rounded-full bg-white"></span>
                                                    </div>
                                                    <div className="flex flex-1 flex-col justify-between border border-white p-1">
                                                        <span className="h-1 w-full bg-white"></span>
                                                        <div className="grid grid-cols-3 gap-1">
                                                            <span className="h-2 border border-white"></span>
                                                            <span className="h-2 border border-white"></span>
                                                            <span className="h-2 border border-white"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex h-16 w-10 flex-col gap-1 border border-white p-1">
                                                    <span className="h-1 w-2 self-center border border-white"></span>
                                                    <div className="flex flex-1 flex-col gap-1 border border-white p-1">
                                                        <span className="h-1 w-full bg-white"></span>
                                                        <span className="h-1 w-full bg-white"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Project 4: Interactive Spinwheel Wireframe */}
                                        {project.wireframeType ===
                                            'spinwheel' && (
                                            <div className="relative flex h-full w-full items-center justify-center">
                                                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-white">
                                                    <div className="absolute h-[1px] w-full rotate-0 bg-white"></div>
                                                    <div className="absolute h-[1px] w-full rotate-45 bg-white"></div>
                                                    <div className="absolute h-[1px] w-full -rotate-45 bg-white"></div>
                                                    <div className="absolute h-[1px] w-full rotate-90 bg-white"></div>
                                                    <div className="absolute flex h-4 w-4 items-center justify-center border border-white bg-black text-[8px] font-bold">
                                                        X
                                                    </div>
                                                </div>
                                                <div className="absolute top-2 right-12 font-mono text-xs font-bold">
                                                    ◀ pointer
                                                </div>
                                            </div>
                                        )}

                                        {/* Project 5: RSVP Envelope Wireframe */}
                                        {project.wireframeType === 'rsvp' && (
                                            <div className="flex h-full w-full flex-col justify-between border border-white p-2">
                                                <div className="flex items-center justify-between text-[8px]">
                                                    <span>
                                                        TICKET_ID: SC-992
                                                    </span>
                                                    <span>RSVP_GATE</span>
                                                </div>
                                                <div className="my-2 flex flex-1 flex-col items-center justify-center gap-1 border border-dashed border-white">
                                                    <span className="text-xs font-bold">
                                                        [ GUEST CARD ]
                                                    </span>
                                                    <span className="text-[7px]">
                                                        SCAN_ACCESSIBILITY
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Project 6: Danmaku Video Wireframe */}
                                        {project.wireframeType ===
                                            'danmaku' && (
                                            <div className="flex h-full w-full flex-col justify-between border border-white p-2">
                                                <div className="relative flex flex-1 flex-col gap-2 overflow-hidden border border-white pt-2">
                                                    <div className="absolute right-2 border border-white bg-black px-1 text-right text-[9px]">
                                                        TEXT_FLYING_L &lt;&lt;
                                                    </div>
                                                    <div className="absolute top-6 left-4 border border-white bg-black px-1 text-[9px]">
                                                        DANMAKU_TEXT
                                                    </div>
                                                    <div className="mt-4 h-4 w-4 self-center border border-white"></div>
                                                </div>
                                                <div className="mt-1 flex h-4 items-center justify-between border border-white px-1">
                                                    <span className="text-[7px]">
                                                        [SEND_STREAM]
                                                    </span>
                                                    <span className="w-12 border-b border-white"></span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Body description */}
                                    <div className="flex flex-1 flex-col justify-between p-6">
                                        <div>
                                            <h3 className="mb-3 text-lg font-bold">
                                                &gt; "{project.title}"
                                            </h3>
                                            <p className="mb-6 text-xs leading-relaxed font-light text-gray-400 transition-none group-hover:text-white">
                                                METRICS: {project.description}
                                            </p>

                                            <div className="mb-6 text-xs">
                                                <span className="mb-1 block font-bold text-gray-500">
                                                    COMPILER_PARAMETERS:
                                                </span>
                                                <p className="font-mono text-gray-300">
                                                    {project.tags.join(' // ')}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Run demo button */}
                                        <div className="border-t border-dashed border-[#FFFFFF] pt-4">
                                            <button
                                                onClick={() =>
                                                    setActiveDemo(project.id)
                                                }
                                                className="w-full cursor-pointer border border-[#FFFFFF] bg-black py-2.5 text-center font-bold text-white transition-none hover:border-black hover:bg-white hover:text-black"
                                            >
                                                [ RUN DEMO ]
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. Transmit Inquiry (Contact Form with FormSubmit action) */}
                <section
                    id="contact"
                    className="border-b border-[#FFFFFF] bg-[#000000] py-20"
                >
                    <div className="mx-auto max-w-7xl px-4 md:px-8">
                        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
                            {/* Left detail Column (Official data) */}
                            <div className="lg:col-span-5">
                                <span className="border border-[#FFFFFF] px-3 py-1 text-xs font-bold">
                                    COMMUNICATION PORTAL
                                </span>
                                <h2 className="mt-4 mb-6 text-3xl font-bold tracking-tight text-white uppercase">
                                    03 // Gateway Inquiry
                                </h2>
                                <p className="mb-8 leading-relaxed font-light text-gray-400">
                                    Input system specifications below.
                                    Submissions will be logged and analyzed by
                                    Suddenly Creative project curators.
                                </p>

                                <div className="space-y-4 font-mono text-xs">
                                    <div className="border border-dashed border-[#FFFFFF] p-4">
                                        <p className="font-bold text-gray-500 uppercase">
                                            SYS_ADMIN_EMAIL:
                                        </p>
                                        <a
                                            href="mailto:suddenlycreative@gmail.com"
                                            className="inline-block p-1 transition-none hover:bg-white hover:text-black"
                                        >
                                            suddenlycreative@gmail.com
                                        </a>
                                    </div>
                                    <div className="border border-dashed border-[#FFFFFF] p-4">
                                        <p className="font-bold text-gray-500 uppercase">
                                            TELEPHONY_GATEWAY:
                                        </p>
                                        <a
                                            href="tel:+6281223145443"
                                            className="inline-block p-1 transition-none hover:bg-white hover:text-black"
                                        >
                                            +62 812-2314-5443
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Input Form with direct FormSubmit attributes */}
                            <div className="border border-[#FFFFFF] bg-black p-8 lg:col-span-7">
                                {formSubmitted ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="mb-6 border border-[#FFFFFF] p-2">
                                            <span className="font-bold tracking-widest text-white uppercase">
                                                SUBMISSION_LOGGED
                                            </span>
                                        </div>
                                        <h3 className="mb-4 text-lg font-bold">
                                            TRANSMISSION ENQUEUED
                                        </h3>
                                        <p className="mb-8 max-w-sm text-xs leading-relaxed text-gray-400">
                                            Your query parameters have been
                                            appended to the project queue.
                                            Callback sequence activated.
                                        </p>
                                        <button
                                            onClick={() =>
                                                setFormSubmitted(false)
                                            }
                                            className="border border-[#FFFFFF] px-4 py-2 text-xs font-bold transition-none hover:border-black hover:bg-white hover:text-black"
                                        >
                                            [ SEND_ANOTHER_PAYLOAD ]
                                        </button>
                                    </div>
                                ) : (
                                    <form
                                        action="https://formsubmit.co/fauziwildan.widyatama@gmail.com"
                                        method="POST"
                                        onSubmit={handleFormSubmit}
                                        className="space-y-6"
                                    >
                                        {/* Hidden inputs to disable captchas and customize subject line in FormSubmit */}
                                        <input
                                            type="hidden"
                                            name="_captcha"
                                            value="false"
                                        />
                                        <input
                                            type="hidden"
                                            name="_subject"
                                            value="New Inquiry from Suddenly Creative Portfolio"
                                        />
                                        <input
                                            type="hidden"
                                            name="_template"
                                            value="table"
                                        />

                                        <div className="mb-6 flex items-center gap-2 border-b border-[#FFFFFF] pb-3 text-xs text-gray-500">
                                            <Terminal className="h-4 w-4" />
                                            <span>cat &gt; payload.config</span>
                                        </div>

                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="mb-2 block text-xs font-bold text-gray-400 uppercase"
                                                >
                                                    NAME:
                                                </label>
                                                <div className="flex items-center">
                                                    <span className="mr-2 text-gray-500">
                                                        &gt;&gt;
                                                    </span>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="w-full border-b border-[#FFFFFF] bg-black px-2 py-1 font-mono text-sm text-white transition-none placeholder:text-gray-800 focus:border-black focus:bg-white focus:text-black focus:outline-none"
                                                        placeholder="[INPUT_NAME]"
                                                        required
                                                    />
                                                </div>
                                                {formErrors.name && (
                                                    <p className="mt-2 text-xs font-bold text-red-500">
                                                        {formErrors.name}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="mb-2 block text-xs font-bold text-gray-400 uppercase"
                                                >
                                                    EMAIL:
                                                </label>
                                                <div className="flex items-center">
                                                    <span className="mr-2 text-gray-500">
                                                        &gt;&gt;
                                                    </span>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="w-full border-b border-[#FFFFFF] bg-black px-2 py-1 font-mono text-sm text-white transition-none placeholder:text-gray-800 focus:border-black focus:bg-white focus:text-black focus:outline-none"
                                                        placeholder="[INPUT_EMAIL]"
                                                        required
                                                    />
                                                </div>
                                                {formErrors.email && (
                                                    <p className="mt-2 text-xs font-bold text-red-500">
                                                        {formErrors.email}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="scope"
                                                className="mb-2 block text-xs font-bold text-gray-400 uppercase"
                                            >
                                                PROJECT_SCOPE:
                                            </label>
                                            <div className="flex items-center">
                                                <span className="mr-2 text-gray-500">
                                                    &gt;&gt;
                                                </span>
                                                <select
                                                    id="scope"
                                                    name="scope"
                                                    value={formData.scope}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-[#FFFFFF] bg-black px-3 py-2 font-mono text-sm text-white transition-none focus:border-black focus:bg-white focus:text-black focus:outline-none"
                                                >
                                                    <option value="EVENT_TECH">
                                                        EVENT_TECH.EXE
                                                    </option>
                                                    <option value="CORPORATE">
                                                        CORPORATE.SYS
                                                    </option>
                                                    <option value="CONSULTATION">
                                                        CONSULTATION.SH
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="message"
                                                className="mb-2 block text-xs font-bold text-gray-400 uppercase"
                                            >
                                                SPECIFICATIONS:
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                rows={4}
                                                className="w-full border border-[#FFFFFF] bg-black p-3 font-mono text-sm text-white transition-none placeholder:text-gray-800 focus:border-black focus:bg-white focus:text-black focus:outline-none"
                                                placeholder="[ENTER SPECIFICATION PARAMETERS]"
                                                required
                                            />
                                            {formErrors.message && (
                                                <p className="mt-2 text-xs font-bold text-red-500">
                                                    {formErrors.message}
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isTransmitting}
                                            className="w-full border border-[#FFFFFF] bg-black py-4 text-center font-bold tracking-widest text-white uppercase transition-none hover:border-black hover:bg-white hover:text-black disabled:pointer-events-none disabled:opacity-50"
                                        >
                                            {isTransmitting
                                                ? 'TRANSMITTING INQUIRY ...'
                                                : '[ EXECUTE TRANSMISSION ]'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. Footer (Strictly Public - No Auth) */}
                <footer className="bg-black py-16">
                    <div className="mx-auto max-w-7xl px-4 md:px-8">
                        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
                            <div className="md:col-span-5">
                                <Link
                                    href="/"
                                    className="mb-4 inline-block border border-transparent p-1 font-bold text-white transition-none hover:border-black hover:bg-white hover:text-black"
                                >
                                    root@suddenly-creative:~#
                                </Link>
                                <p className="mb-6 max-w-sm font-mono text-xs leading-relaxed text-gray-500">
                                    Operational software agency compiling event
                                    check-ins and corporate systems. strictly
                                    functional layouts.
                                    <br />
                                    SYS_EMAIL: suddenlycreative@gmail.com
                                    <br />
                                    TEL: +62 812-2314-5443
                                </p>
                                <div className="font-mono text-xs text-gray-600">
                                    &gt; sudo shutdown -contact
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 md:col-span-4">
                                <div>
                                    <h4 className="mb-4 text-xs font-bold text-gray-400 uppercase">
                                        &gt;_ DIRECTORIES
                                    </h4>
                                    <ul className="space-y-2 font-mono text-xs">
                                        <li>
                                            <a
                                                href="#services"
                                                className="inline-block p-0.5 text-gray-500 transition-none hover:bg-white hover:text-black"
                                            >
                                                ./capabilities.sh
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#projects"
                                                className="inline-block p-0.5 text-gray-500 transition-none hover:bg-white hover:text-black"
                                            >
                                                ./portfolio
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#contact"
                                                className="inline-block p-0.5 text-gray-500 transition-none hover:bg-white hover:text-black"
                                            >
                                                ./contact_gateway
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="mb-4 text-xs font-bold text-gray-400 uppercase">
                                        &gt;_ OPERATIONS
                                    </h4>
                                    <ul className="space-y-2 font-mono text-xs">
                                        <li>
                                            <span className="inline-block p-0.5 text-gray-500">
                                                STATUS: PUBLIC_PROT
                                            </span>
                                        </li>
                                        <li>
                                            <span className="inline-block p-0.5 text-gray-500">
                                                SECURE_SHELL: OFF
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="md:col-span-3">
                                <h4 className="mb-4 text-xs font-bold text-gray-400 uppercase">
                                    &gt;_ OUTLETS
                                </h4>
                                <div className="flex flex-col items-start gap-2 font-mono text-xs">
                                    <a
                                        href="https://instagram.com/suddenlycreative.id"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="border border-[#FFFFFF] px-3 py-1.5 text-white transition-none hover:bg-white hover:text-black"
                                    >
                                        [ Instagram ]
                                    </a>
                                    <a
                                        href="https://suddenlycreativestudio.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="border border-[#FFFFFF] px-3 py-1.5 text-white transition-none hover:bg-white hover:text-black"
                                    >
                                        [ Website ]
                                    </a>
                                </div>
                                <p className="mt-6 font-mono text-xs text-gray-600">
                                    SUDDENLY_CREATIVE_STABLE_V1.1
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>

                {/* ====================================================================
            FULL-SCREEN MODAL FOR INTERACTIVE DEMO MINI-APPS
            ==================================================================== */}
                {activeDemo && (
                    <div className="fixed inset-0 z-50 flex flex-col justify-between border-4 border-double border-white bg-[#000000] p-6 select-text">
                        {/* Modal header */}
                        <div className="mb-6 flex items-center justify-between border-b border-[#FFFFFF] pb-3 text-xs">
                            <span className="font-bold tracking-widest uppercase">
                                &gt; TERMINAL_SIMULATION: {activeDemo} //
                                STABLE_ENV
                            </span>
                            <button
                                onClick={closeDemoModal}
                                className="cursor-pointer border border-white px-3 py-1 font-bold transition-none hover:bg-white hover:text-black"
                            >
                                [ X ] CLOSE_SIMULATION
                            </button>
                        </div>

                        {/* Mini-App Renders */}
                        <div className="flex flex-1 items-center justify-center p-4">
                            {/* 1. Project_01: Web ERP Dashboard Mini-App */}
                            {activeDemo === 'Project_01' && (
                                <div className="flex w-full max-w-4xl flex-col gap-6 border border-white bg-black p-6">
                                    <div className="flex items-center justify-between border-b border-white pb-3">
                                        <span className="text-base font-bold tracking-wider uppercase">
                                            &gt; ERP_ENTERPRISE_SYSTEM_DASHBOARD
                                        </span>
                                        <span className="bg-white px-2 py-0.5 text-xs font-bold text-black">
                                            MODE: SIMULATOR
                                        </span>
                                    </div>

                                    {/* Stats cards */}
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <div className="border border-white p-4">
                                            <span className="block text-xs font-bold text-gray-400 uppercase">
                                                REVENUE_FLOW
                                            </span>
                                            <span className="font-mono text-2xl font-bold">
                                                $1,894,204.00
                                            </span>
                                        </div>
                                        <div className="border border-white p-4">
                                            <span className="block text-xs font-bold text-gray-400 uppercase">
                                                ACTIVE_SYS_USERS
                                            </span>
                                            <span className="font-mono text-2xl font-bold">
                                                14,295
                                            </span>
                                        </div>
                                        <div className="animate-pulse border border-white p-4">
                                            <span className="block text-xs font-bold text-gray-400 uppercase">
                                                SERVER_COMPUTE_LOAD
                                            </span>
                                            <span className="font-mono text-2xl font-bold">
                                                42.8%
                                            </span>
                                        </div>
                                    </div>

                                    {/* Table with mock user details */}
                                    <div className="overflow-hidden border border-white">
                                        <table className="w-full text-left font-mono text-xs">
                                            <thead>
                                                <tr className="border-b border-white bg-white/5 font-bold">
                                                    <th className="p-3">
                                                        USER_ID
                                                    </th>
                                                    <th className="p-3">
                                                        GUEST_IDENTIFIER
                                                    </th>
                                                    <th className="p-3">
                                                        IP_ENDPOINT
                                                    </th>
                                                    <th className="p-3">
                                                        STATUS_METRIC
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b border-white/10">
                                                    <td className="p-3">
                                                        USR_992
                                                    </td>
                                                    <td className="p-3">
                                                        administrator_node
                                                    </td>
                                                    <td className="p-3">
                                                        192.168.1.99
                                                    </td>
                                                    <td className="p-3 text-emerald-400">
                                                        [ ONLINE ]
                                                    </td>
                                                </tr>
                                                <tr className="border-b border-white/10">
                                                    <td className="p-3">
                                                        USR_428
                                                    </td>
                                                    <td className="p-3">
                                                        checkout_terminal_03
                                                    </td>
                                                    <td className="p-3">
                                                        10.0.4.118
                                                    </td>
                                                    <td className="p-3 text-emerald-400">
                                                        [ ONLINE ]
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-3">
                                                        USR_015
                                                    </td>
                                                    <td className="p-3">
                                                        local_guest_agent
                                                    </td>
                                                    <td className="p-3">
                                                        127.0.0.1
                                                    </td>
                                                    <td className="p-3 text-red-500">
                                                        [ OFFLINE ]
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Export button */}
                                    <button
                                        onClick={() =>
                                            alert('Data exported successfully.')
                                        }
                                        className="cursor-pointer self-end border border-white bg-black px-6 py-3 font-bold tracking-wider uppercase transition-none hover:bg-white hover:text-black"
                                    >
                                        [ EXPORT_CSV_PAYLOAD ]
                                    </button>
                                </div>
                            )}

                            {/* 2. Project_02: Stage Timer Countdown Mini-App */}
                            {activeDemo === 'Project_02' && (
                                <div className="flex w-full max-w-xl flex-col items-center gap-8 border border-white bg-black p-8">
                                    <div className="flex w-full items-center justify-between border-b border-white pb-3 text-xs">
                                        <span>STAGE TIMER MONITOR</span>
                                        <span>RUN: ACTIVE</span>
                                    </div>

                                    {/* Giant digital clock */}
                                    <div className="border border-dashed border-white bg-white/5 px-10 py-6 font-mono text-5xl font-bold tracking-widest select-none md:text-7xl">
                                        {formatTimer(timeLeft)}
                                    </div>

                                    {/* Working controls */}
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() =>
                                                setTimerRunning(true)
                                            }
                                            disabled={timerRunning}
                                            className="flex cursor-pointer items-center gap-2 border border-white bg-black px-6 py-2.5 font-bold hover:bg-white hover:text-black disabled:pointer-events-none disabled:opacity-30"
                                        >
                                            <Play className="h-4 w-4" />
                                            <span>START</span>
                                        </button>
                                        <button
                                            onClick={() =>
                                                setTimerRunning(false)
                                            }
                                            disabled={!timerRunning}
                                            className="flex cursor-pointer items-center gap-2 border border-white bg-black px-6 py-2.5 font-bold hover:bg-white hover:text-black disabled:pointer-events-none disabled:opacity-30"
                                        >
                                            <Pause className="h-4 w-4" />
                                            <span>PAUSE</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setTimerRunning(false);
                                                setTimeLeft(900);
                                            }}
                                            className="flex cursor-pointer items-center gap-2 border border-white bg-black px-6 py-2.5 font-bold hover:bg-white hover:text-black"
                                        >
                                            <RotateCcw className="h-4 w-4" />
                                            <span>RESET</span>
                                        </button>
                                    </div>

                                    {/* Fast adjust settings helper */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() =>
                                                setTimeLeft((prev) => prev + 60)
                                            }
                                            className="border border-white px-2 py-0.5 text-[10px] font-semibold hover:bg-white hover:text-black"
                                        >
                                            +1m
                                        </button>
                                        <button
                                            onClick={() =>
                                                setTimeLeft((prev) =>
                                                    Math.max(0, prev - 60),
                                                )
                                            }
                                            className="border border-white px-2 py-0.5 text-[10px] font-semibold hover:bg-white hover:text-black"
                                        >
                                            -1m
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* 3. Project_03: Website Viewport Switcher Simulator Mini-App */}
                            {activeDemo === 'Project_03' && (
                                <div className="flex h-[550px] w-full flex-col items-center justify-between gap-4">
                                    {/* Switch button */}
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() =>
                                                setIsMobileView(!isMobileView)
                                            }
                                            className="flex cursor-pointer items-center gap-2 border border-white bg-black px-6 py-2 font-bold transition-none hover:bg-white hover:text-black"
                                        >
                                            {isMobileView ? (
                                                <Monitor className="h-4 w-4" />
                                            ) : (
                                                <Smartphone className="h-4 w-4" />
                                            )}
                                            <span>
                                                {isMobileView
                                                    ? '[ SWITCH TO DESKTOP VIEW ]'
                                                    : '[ SWITCH TO MOBILE VIEW ]'}
                                            </span>
                                        </button>
                                        <span className="text-xs font-bold text-gray-500 uppercase">
                                            CURRENT_WIDTH:{' '}
                                            {isMobileView ? '375px' : '100%'}
                                        </span>
                                    </div>

                                    {/* Scrollable corporate profile web-app container */}
                                    <div
                                        style={{
                                            width: isMobileView
                                                ? '375px'
                                                : '100%',
                                        }}
                                        className="relative flex max-w-4xl flex-1 flex-col overflow-y-auto border border-white bg-[#0a0a0c] text-xs transition-all duration-300"
                                    >
                                        {/* Dummy web page header */}
                                        <div className="flex items-center justify-between border-b border-white bg-black p-3">
                                            <span className="font-bold">
                                                AETHER_CORP.SH
                                            </span>
                                            <div className="flex gap-4 text-[10px]">
                                                <span>[ABOUT]</span>
                                                <span>[METRICS]</span>
                                            </div>
                                        </div>

                                        {/* Dummy web page hero banner */}
                                        <div className="flex flex-col items-center gap-2 border-b border-white bg-black/60 p-8 text-center">
                                            <span className="animate-pulse border border-white bg-white px-2 py-0.5 text-[9px] font-bold text-black">
                                                SYSTEMS_ACTIVE
                                            </span>
                                            <h4 className="text-xl font-bold tracking-wider uppercase">
                                                Aether Global Cores
                                            </h4>
                                            <p className="max-w-md text-[10px] font-light text-gray-400">
                                                We deploy localized server
                                                configurations to compute
                                                database logic at maximum
                                                bandwidth efficiency rates.
                                            </p>
                                        </div>

                                        {/* Dummy corporate details section */}
                                        <div className="flex flex-col gap-4 p-6 font-mono leading-relaxed text-gray-400">
                                            <h5 className="text-xs font-bold text-white uppercase">
                                                &gt; 01 // OVERVIEW
                                            </h5>
                                            <p className="text-[11px] font-light">
                                                Aether Corp manages
                                                computational assets globally.
                                                Our headless systems distribute
                                                local query processing pipelines
                                                to reduce central latency bounds
                                                by up to 48.2% on standard
                                                client endpoints.
                                            </p>
                                            <h5 className="text-xs font-bold text-white uppercase">
                                                &gt; 02 // HARDWARE STATS
                                            </h5>
                                            <p className="text-[11px] font-light">
                                                We configure server-grade nodes
                                                locally with hardware firewall
                                                metrics to enforce active threat
                                                screening continuously.
                                            </p>
                                        </div>

                                        {/* Dummy page footer */}
                                        <div className="mt-auto flex items-center justify-between border-t border-white bg-black p-4 text-[10px] text-gray-600">
                                            <span>
                                                &copy; AETHER CORP GLOBAL INC.
                                            </span>
                                            <span>SECURE_SHELL</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 4. Project_04: Interactive Spinwheel Mini-App */}
                            {activeDemo === 'Project_04' && (
                                <div className="flex w-full max-w-md flex-col items-center gap-8 border border-white bg-black p-8">
                                    <div className="flex w-full items-center justify-between border-b border-white pb-3 text-xs">
                                        <span>
                                            INTERACTIVE GATEWAY SPINWHEEL
                                        </span>
                                        <span>CORES: CALIBRATED</span>
                                    </div>

                                    {/* Wheel Container */}
                                    <div className="relative flex h-48 w-48 items-center justify-center">
                                        <div
                                            style={{
                                                transform: `rotate(${spinDegrees}deg)`,
                                                transition: isSpinning
                                                    ? 'transform 3s cubic-bezier(0.16, 1, 0.3, 1)'
                                                    : 'none',
                                            }}
                                            className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-white select-none"
                                        >
                                            <div className="absolute h-[1px] w-full rotate-0 bg-white"></div>
                                            <div className="absolute h-[1px] w-full rotate-30 bg-white"></div>
                                            <div className="absolute h-[1px] w-full rotate-60 bg-white"></div>
                                            <div className="absolute h-[1px] w-full rotate-90 bg-white"></div>
                                            <div className="absolute h-[1px] w-full rotate-120 bg-white"></div>
                                            <div className="absolute h-[1px] w-full rotate-150 bg-white"></div>

                                            <span className="absolute top-2 bg-black px-0.5 text-[7px] font-bold">
                                                50%_OFF
                                            </span>
                                            <span className="absolute bottom-2 bg-black px-0.5 text-[7px] font-bold">
                                                TRY_AGAIN
                                            </span>
                                            <span className="absolute right-2 rotate-90 bg-black px-0.5 text-[7px] font-bold">
                                                SWAG_BOX
                                            </span>
                                            <span className="absolute left-2 -rotate-90 bg-black px-0.5 text-[7px] font-bold">
                                                DEV_AUDIT
                                            </span>
                                        </div>

                                        <div className="absolute top-1/2 -right-4 -translate-y-1/2 text-lg font-bold text-white select-none">
                                            ◀
                                        </div>
                                    </div>

                                    <button
                                        onClick={triggerSpin}
                                        disabled={isSpinning}
                                        className="cursor-pointer border border-white bg-black px-8 py-3 font-bold uppercase transition-none hover:bg-white hover:text-black disabled:pointer-events-none disabled:opacity-40"
                                    >
                                        {isSpinning
                                            ? 'SPINNING GEARS...'
                                            : '[ SPIN WHEEL ]'}
                                    </button>

                                    <div className="flex h-10 items-center justify-center text-center text-base font-bold">
                                        {spinPrize && (
                                            <span className="animate-bounce border border-dashed border-white px-4 py-1.5">
                                                RESULT: {spinPrize}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* 5. Project_05: RSVP Ticket Mini-App */}
                            {activeDemo === 'Project_05' && (
                                <div className="w-full max-w-md border border-white bg-black p-8">
                                    {rsvpDone ? (
                                        <div className="flex flex-col items-center justify-center gap-6 text-center">
                                            <div className="flex items-center gap-2 border border-white px-4 py-2">
                                                <span className="block h-3 w-3 bg-white"></span>
                                                <span className="text-sm font-bold tracking-wider uppercase">
                                                    TICKET ISSUED SUCCESS
                                                </span>
                                            </div>

                                            <div className="font-mono text-xs leading-tight text-gray-300">
                                                <p>
                                                    NAME:{' '}
                                                    {rsvpName.toUpperCase()}
                                                </p>
                                                <p>
                                                    STATUS:{' '}
                                                    {rsvpAttending === 'YES'
                                                        ? 'CONFIRMED'
                                                        : 'DECLINED'}
                                                </p>
                                                <p>
                                                    INVITATION_ACCESS_KEY:
                                                    SC-rsvp-0092
                                                </p>
                                            </div>

                                            {/* ASCII QR Code placeholder */}
                                            <div className="border border-white bg-white/5 p-4 font-mono text-[9px] leading-[8px] tracking-widest select-all">
                                                <pre>
                                                    {`█▀▀▀▀▀█ ▄ █▄█ █▀▀▀▀▀█
█ ███ █ ▄▀  ▄ █ ███ █
█ ▀▀▀ █  ██▀█ █ ▀▀▀ █
▀▀▀▀▀▀▀ ▀ █ ▀ ▀▀▀▀▀▀▀
██▀█▀▀█▀█  ▀▄█▀▄ █▀▄█
  ▄ ▄▀▀▀█▀▄ ▀ █ ▄▀█  
▀▀▀▀▀ ▀▀ ▀ ▀▀▀▀▀▀ ▀ ▀`}
                                                </pre>
                                            </div>

                                            <p className="max-w-xs text-[10px] leading-relaxed font-light text-gray-500">
                                                Copy terminal ticket block
                                                parameters or scan the code
                                                payload at check-in gateway.
                                            </p>

                                            <button
                                                onClick={() =>
                                                    setRsvpDone(false)
                                                }
                                                className="cursor-pointer border border-white px-4 py-2 text-xs font-bold transition-none hover:bg-white hover:text-black"
                                            >
                                                [ INITIALIZE NEW RSVP ]
                                            </button>
                                        </div>
                                    ) : (
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                if (!rsvpName.trim()) {
                                                    alert(
                                                        'ERROR: GUEST NAME REQUIRED',
                                                    );
                                                    return;
                                                }
                                                setRsvpDone(true);
                                            }}
                                            className="space-y-6"
                                        >
                                            <div className="flex items-center justify-between border-b border-white pb-3 text-xs">
                                                <span>
                                                    RSVP GATEWAY DISPATCH
                                                </span>
                                                <span>FORM_ENV</span>
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-xs font-bold text-gray-400 uppercase">
                                                    GUEST NAME:
                                                </label>
                                                <input
                                                    type="text"
                                                    value={rsvpName}
                                                    onChange={(e) =>
                                                        setRsvpName(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full border border-white bg-black p-3 font-mono text-white transition-none focus:bg-white focus:text-black focus:outline-none"
                                                    placeholder="[GUEST_FULL_NAME]"
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-xs font-bold text-gray-400 uppercase">
                                                    ATTENDANCE STATUS:
                                                </label>
                                                <select
                                                    value={rsvpAttending}
                                                    onChange={(e) =>
                                                        setRsvpAttending(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full border border-white bg-black p-3 font-mono text-white transition-none focus:bg-white focus:text-black focus:outline-none"
                                                >
                                                    <option value="YES">
                                                        YES, I WILL ATTEND
                                                    </option>
                                                    <option value="NO">
                                                        NO, DECLINED
                                                    </option>
                                                </select>
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full cursor-pointer border border-white bg-black py-4 font-bold uppercase transition-none hover:bg-white hover:text-black"
                                            >
                                                [ CONFIRM TICKET ISSUANCE ]
                                            </button>
                                        </form>
                                    )}
                                </div>
                            )}

                            {/* 6. Project_06: Danmaku Comment screen Mini-App */}
                            {activeDemo === 'Project_06' && (
                                <div className="flex w-full max-w-3xl flex-col gap-4 border border-white bg-black p-6">
                                    <div className="flex items-center justify-between border-b border-white pb-2 text-xs">
                                        <span>
                                            DANMAKU BROADCAST PLAYER OUTLINE
                                        </span>
                                        <span>STREAM: LIVE</span>
                                    </div>

                                    <div className="relative flex h-64 items-center justify-center overflow-hidden border border-white bg-[#030303]">
                                        <div className="absolute h-12 w-12 animate-ping rounded-full border border-dashed border-white opacity-25"></div>
                                        <div className="text-[10px] font-bold text-gray-800 uppercase">
                                            simulated_video_stream
                                        </div>

                                        {danmakus.map((item) => (
                                            <span
                                                key={item.id}
                                                style={{ top: `${item.top}%` }}
                                                className="danmaku-item absolute z-10 border border-white bg-black px-2 py-0.5 text-sm font-bold text-white"
                                            >
                                                {item.text}
                                            </span>
                                        ))}
                                    </div>

                                    <form
                                        onSubmit={sendDanmaku}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="font-bold text-gray-400">
                                            &gt;&gt;
                                        </span>
                                        <input
                                            type="text"
                                            value={danmakuInput}
                                            onChange={(e) =>
                                                setDanmakuInput(e.target.value)
                                            }
                                            className="flex-1 border border-white bg-black px-4 py-2.5 font-mono text-white transition-none focus:bg-white focus:text-black focus:outline-none"
                                            placeholder="Type live bullet comment..."
                                        />
                                        <button
                                            type="submit"
                                            className="flex cursor-pointer items-center gap-2 border border-white bg-black px-6 py-2.5 font-bold transition-none hover:bg-white hover:text-black"
                                        >
                                            <Send className="h-4 w-4" />
                                            <span>SEND</span>
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>

                        {/* Modal footer */}
                        <div className="mt-6 flex items-center justify-between border-t border-[#FFFFFF] pt-4 text-xs text-gray-500">
                            <span>SYSTEM: OK</span>
                            <span>CONNECTION: SECURE</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
