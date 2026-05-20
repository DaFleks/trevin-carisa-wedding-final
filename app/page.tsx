import WeddingApp from "@/components/WeddingApp";
import WeddingProvider from "@/components/WeddingProvider";

export default function Home() {
  return (
    <WeddingProvider>
      <WeddingApp />
    </WeddingProvider>
  );
}
