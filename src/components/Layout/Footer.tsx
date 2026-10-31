import { Link } from 'react-router-dom';
import SuggestCorrection from '../UI/SuggestCorrection';

const Footer = () => {
  return (
    <footer className="bg-paper text-ink-soft font-reading border-t border-rule print:hidden">
      <div className="max-w-[1120px] mx-auto px-5 pt-8 pb-10 lg:px-8 lg:pt-10 lg:pb-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="font-display font-semibold text-[22px] leading-tight text-ink mb-3">
              Lobola Hub
            </p>
            <p className="text-base leading-relaxed">
              A guide to lobola and South African marriage traditions.
            </p>
          </div>

          <div>
            <h2 className="text-[13px] font-medium uppercase tracking-[0.16em] mb-3">
              Quick links
            </h2>
            <ul className="space-y-1.5 text-base">
              <li>
                <Link to="/" className="text-ink hover:underline underline-offset-4">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/guide/zulu" className="text-ink hover:underline underline-offset-4">
                  Zulu Lobola Guide
                </Link>
              </li>
              <li>
                <Link to="/letter" className="text-ink hover:underline underline-offset-4">
                  Letter builder
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-ink hover:underline underline-offset-4">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-[13px] font-medium uppercase tracking-[0.16em] mb-3">
              Disclaimer
            </h2>
            <p className="text-base leading-relaxed">
              This app provides general information and does not replace guidance from elders or family. Practices vary between families and regions.
            </p>
            <SuggestCorrection compact />
          </div>
        </div>

        <p className="border-t border-rule pt-6 text-[15px]">
          © 2026 Lobola Hub. Preserving South African traditions.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
