import PropertyForm from "@/components/admin/PropertyForm";
export const metadata = { title: "Nova nekretnina" };
export default function NewPropertyPage() {
  return (
    <div>
      <h1 className="font-playfair text-2xl font-bold mb-6">Nova nekretnina</h1>
      <PropertyForm />
    </div>
  );
}
