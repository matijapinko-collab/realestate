import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Me",
  description: "Matija Pinko — personal real estate agent in Zagreb, Velika Gorica and Pag.",
};

export default function AboutPageEN() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-4">About me</p>
          <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            Matija Pinko<br />Your Personal Agent
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <Image
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
            alt="Matija Pinko"
            width={600}
            height={750}
            className="object-cover w-full"
          />
          <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
            <p>
              If you&apos;ve ever bought or sold property before, you&apos;ve probably realized that finding an agent isn&apos;t the hard part. Finding someone you genuinely trust is. That&apos;s especially true when you&apos;re making one of the biggest financial decisions of your life.
            </p>
            <p>
              Interestingly, I didn&apos;t start my career in real estate. Most of my professional background comes from sales, operations, digital products, project management, business development, and helping companies solve complex problems. For years, I worked with people making decisions worth tens or hundreds of thousands of euros, managing projects with multiple stakeholders, balancing competing priorities, and finding ways to move things forward when the obvious solution wasn&apos;t the right one.
            </p>
            <p>
              One thing I&apos;ve learned throughout my career is that most bad decisions aren&apos;t caused by a lack of information. They&apos;re caused by people not knowing which information they should trust. That&apos;s exactly what I see in real estate.
            </p>
            <p>
              That&apos;s why I&apos;ve never been interested in building a business around hype, pressure, or unrealistic promises. I won&apos;t tell you your property is worth more than the market is willing to pay simply to win your business. My job is not to validate assumptions. My job is to challenge them when necessary.
            </p>
            <p>
              I don&apos;t see a property listing. I see a project. I see objectives. I see opportunities, risks, positioning, negotiation, and strategy. Before we discuss photography, advertising, pricing, or portals, I want to understand your situation — why you&apos;re selling, why you&apos;re buying, what you&apos;re trying to achieve, and what a successful outcome looks like for you.
            </p>
            <p>
              Today my primary focus is Zagreb, Velika Gorica, Pag, and the surrounding markets. Not because they&apos;re simply locations on a map, but because local knowledge matters. Property markets don&apos;t move at a city level. They move at a street level. Understanding those differences often makes the difference between a good decision and an expensive one.
            </p>
            <p className="font-medium text-[#1A1A1A]">
              At the end of the day, I don&apos;t want to be remembered as the person who helped you buy or sell a property. I want to be remembered as the person you would call again when the next important decision comes along.
            </p>
            <div className="pt-4">
              <Link
                href="/en/contact"
                className="inline-flex items-center px-8 py-4 bg-[#D4AF37] text-white font-semibold hover:bg-[#B8972E] transition-colors"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-16">
          <h2 className="font-playfair text-3xl font-bold text-center mb-4">Why Clients Choose to Work With Me</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Not because I promise the most. Because I say what you need to hear.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Transparency", desc: "No inflated promises to win your business. No valuations that look great on paper but have no connection to reality." },
              { title: "Communication", desc: "You always know where we stand and what comes next. No surprises, no waiting on information you need." },
              { title: "Strategic Approach", desc: "Every property is treated as a project. Market analysis, positioning, negotiation — all with a clear plan and objective." },
            ].map((item, i) => (
              <div key={i} className="p-8 bg-[#F8F8F8]">
                <div className="w-10 h-0.5 bg-[#D4AF37] mb-4" />
                <h3 className="font-playfair text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
