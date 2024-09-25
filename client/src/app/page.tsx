import Image from "next/image";
import CardSlider from "@/components/RestourantSlider";
import FoodSection from "@/components/FoodSection";

export default function Home() {
  return (
    <>
      <CardSlider />
      <FoodSection />
    </>
  );
}
