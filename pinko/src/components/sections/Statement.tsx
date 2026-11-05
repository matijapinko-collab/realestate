import { Section } from "@/components/ui/Section";
import { ScrollStatement } from "./ScrollStatement";

/**
 * The big claim, lit word by word as it scrolls past.
 *
 * The sentence is Matija's own, from the brief: it says what the work is
 * for without a single number anyone would have to verify.
 */
export function Statement() {
  return (
    <Section tight>
      <div className="measure-wide mx-auto">
        <ScrollStatement text="Tehnologija ima smisla kad riješi konkretan problem: kupac brže pronađe proizvod, narudžba se manje puta ručno prepisuje, a vlasnik napokon vidi što treba razvijati sljedeće." />
      </div>
    </Section>
  );
}
