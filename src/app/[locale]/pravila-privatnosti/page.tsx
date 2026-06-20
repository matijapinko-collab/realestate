export const metadata = { title: "Pravila privatnosti" };

export default function PrivacyHR() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-[#1A1A1A] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-playfair text-4xl font-bold text-white">Pravila privatnosti</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose prose-lg">
        <p>Ova stranica opisuje kako prikupljamo i koristimo vaše osobne podatke.</p>
        <h2>Prikupljanje podataka</h2>
        <p>Prikupljamo samo podatke koje nam dobrovoljno pružate putem kontaktnih obrazaca.</p>
        <h2>Korištenje podataka</h2>
        <p>Vaši podaci koriste se isključivo za komunikaciju vezanu uz vaš upit.</p>
        <h2>Kontakt</h2>
        <p>Za sva pitanja o privatnosti: matija.pinko@gmail.com</p>
      </div>
    </div>
  );
}
