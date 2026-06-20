export const metadata = { title: "Uvjeti korištenja" };

export default function TermsHR() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-[#1A1A1A] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-playfair text-4xl font-bold text-white">Uvjeti korištenja</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose prose-lg">
        <p>Korištenjem ove web stranice prihvaćate uvjete navedene u ovom dokumentu.</p>
        <h2>Korištenje sadržaja</h2>
        <p>Sav sadržaj na ovoj stranici vlasništvo je Matija Pinko. Nije dopuštena reprodukcija bez dozvole.</p>
        <h2>Kontakt</h2>
        <p>Za pitanja: matija.pinko@gmail.com</p>
      </div>
    </div>
  );
}
