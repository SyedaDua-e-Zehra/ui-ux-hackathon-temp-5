import Image from "next/image";
import BlueHeader from "./components/blue-header";
import Navbar from "./components/navbar";
import Carousel from "./components/caraousel";
import Editors from "./components/editorspick";
import ProductCard from "./components/products-card";
import Front from "./components/front";
import GreenDiv from "./components/green-div";
import Winter from "./components/winter";
import Lastdiv from "./components/lastdiv";
import Footer from "./components/footer";
import { isPortableTextListBlock } from "sanity";

export default function Home() {
  return (
  <div>
    <BlueHeader />
    <Navbar />
    <Carousel />
    <Editors />
    <Front />
    {/* <ProductCard /> */}
    <GreenDiv />
    <Winter />
    <Lastdiv />
    <Footer />
  </div>
  );
}
