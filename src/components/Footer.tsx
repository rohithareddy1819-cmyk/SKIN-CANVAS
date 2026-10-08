const footerLinks = {
  Product: ['Analyze', 'My Skin', 'Routine', 'Discover', 'Compare', 'AI Advisor'],
  Company: ['About', 'Privacy', 'Terms', 'Contact'],
  Trust: ['Data Security', 'No Medical Diagnosis', 'Explainable AI', 'Image Handling'],
};

export default function Footer() {
  return (
    <footer className="bg-charcoal-950 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <p className="font-serif text-2xl font-medium tracking-editorial text-ivory-50">SKIN CANVAS</p>
            <p className="mt-4 max-w-xs font-sans text-sm font-light leading-relaxed text-charcoal-400">
              AI-powered skin intelligence that helps you discover the right skincare — across every brand and at the best price.
            </p>
            <p className="mt-6 font-serif text-sm italic text-sage-400">Your skin. Your story. Your canvas.</p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="lg:col-span-2">
              <p className="mb-4 font-sans text-xs uppercase tracking-wide text-charcoal-500">{section}</p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-sans text-sm text-charcoal-400 transition-colors hover:text-ivory-100">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA */}
          <div className="lg:col-span-2">
            <p className="mb-4 font-sans text-xs uppercase tracking-wide text-charcoal-500">Get Started</p>
            <a href="#analysis" className="inline-flex items-center justify-center rounded-full bg-ivory-50 px-5 py-2.5 font-sans text-sm font-medium text-charcoal-900 transition-all hover:scale-105">
              Analyze My Skin
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-charcoal-800 pt-8 sm:flex-row">
          <p className="font-sans text-xs text-charcoal-500">© 2026 Skin Canvas. All rights reserved.</p>
          <p className="font-sans text-xs text-charcoal-500">AI-generated insights are not a medical diagnosis.</p>
        </div>
      </div>
    </footer>
  );
}
