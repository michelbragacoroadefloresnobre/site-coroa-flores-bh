import { LocationsHero } from "@/components/locations-hero";
import { LocationsGrid } from "@/components/locations-grid";
import { LocationsCta } from "@/components/locations-cta";

export default function LocationsPage() {
  return (
    <main>
      <LocationsHero />
      <LocationsGrid />
      <LocationsCta />
    </main>
  );
}
