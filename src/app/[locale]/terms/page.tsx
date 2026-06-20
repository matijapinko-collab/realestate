export const metadata = { title: "Terms of Use" };

export default function TermsEN() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-[#1A1A1A] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-playfair text-4xl font-bold text-white">Terms of Use</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose prose-lg">
        <p>By using this website, you accept the terms outlined in this document.</p>
        <h2>Content use</h2>
        <p>All content on this site is the property of Matija Pinko. Reproduction without permission is not allowed.</p>
        <h2>Contact</h2>
        <p>Questions: matija.pinko@gmail.com</p>
      </div>
    </div>
  );
}
