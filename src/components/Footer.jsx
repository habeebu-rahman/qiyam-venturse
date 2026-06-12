const NAV_COLS = [
    {
        heading: 'Ventures',
        links: ['Business Solutions', 'Qiyam Celebrate', 'Qiyam Mart'],
    },
    {
        heading: 'Company',
        links: ['About', 'Vision', 'Timeline', 'Contact'],
    },
    {
        heading: 'Connect',
        links: ['LinkedIn', 'Twitter', 'Instagram', 'Press'],
    },
    ]

    export default function Footer() {
    return (
        <footer
        className="relative bg-bg-primary border-t border-white/5 pt-20 pb-10 px-8 md:px-16"
        role="contentinfo"
        aria-label="Qiyam Ventures footer"
        >
        {/* Top gradient line */}
        <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.12), rgba(124,58,237,0.12), transparent)' }}
            aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

            {/* Brand column */}
            <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                <a href="#" className="h-8 flex items-center">
                <img 
                    src="/logo1.png" 
                    alt="QIYAM logo" 
                    loading='lazy'
                    className="h-full w-full object-contain"
                />
                </a>
                </div>

                <p className="text-text-muted text-sm leading-relaxed max-w-[34ch] mb-8">
                Building extraordinary business ecosystems across enterprise consulting,
                luxury events, and retail — one interconnected venture at a time.
                </p>

                {/* Accent divider */}
                <div
                className="w-12 h-px"
                style={{ background: 'linear-gradient(90deg, #00E5FF, #7C3AED)' }}
                aria-hidden="true"
                />
            </div>

            {/* Nav columns */}
            {NAV_COLS.map(col => (
                <div key={col.heading}>
                <h3
                    className="text-[10px] font-medium tracking-[0.22em] text-text-muted/50 uppercase mb-5"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                >
                    {col.heading}
                </h3>
                <ul className="flex flex-col gap-3.5" role="list">
                    {col.links.map(link => (
                    <li key={link}>
                        <a
                        href={`#${link.toLowerCase()}`}
                        className="text-sm text-text-muted hover:text-text-primary transition-colors duration-300"
                        data-cursor="hover"
                        >
                        {link}
                        </a>
                    </li>
                    ))}
                </ul>
                </div>
            ))}
            </div>

            {/* Bottom bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
            <p className="text-text-muted/40 text-[12px] tracking-wide">
                © {new Date().getFullYear()} Qiyam Ventures. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
                {['Privacy Policy', 'Terms of Service'].map(item => (
                <a
                    key={item}
                    href="#"
                    className="text-[12px] text-text-muted/40 hover:text-text-muted transition-colors duration-300 tracking-wide"
                    data-cursor="hover"
                >
                    {item}
                </a>
                ))}
            </div>
            </div>
        </div>
        </footer>
    )
}
