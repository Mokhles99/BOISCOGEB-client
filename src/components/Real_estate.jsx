import React , { useEffect }from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Marquee from "react-fast-marquee";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarousels } from "../actions/carousel.actions";
const responsive = {
  module: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  },
};

const Real_estate = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCarousels());
    const timer = setTimeout(() => {
      const produitsSection = document.getElementById("produits");
      if (produitsSection) {
        produitsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 10000); // 4000 millisecondes = 4 secondes

    return () => clearTimeout(timer); // Nettoyage du timer lors du démontage
  }, [dispatch]);
  
  const images = useSelector((state) => state.carousel.carousels)
  
  const imagesTwo = [
    "/assets/carousel1.JPG",
    "/assets/carousel2.JPG",
    "/assets/carousel3.jpg",
    "/assets/carouselbois.JPG",
  ];

  const imagesToDisplay = images.length > 0 ? images : imagesTwo;

  const CustomDot = ({ onClick, active }) => {
    return (
      <li className={active ? "active" : ""} onClick={() => onClick()}>
        <span className="dot"></span>
      </li>
    );
  };

  return (
    <main className="mb-12" id="hero">
      <div className="relative w-full h-screen overflow-hidden">
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={false}
          showDots={true}
          customDot={<CustomDot />}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          keyBoardControl={true}
          transitionDuration={500}
          className="absolute inset-0 w-full h-full"
        >
          {/* {images.map((img, index) => (
            <div
              key={index}
              className="w-full h-screen bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
            ></div> */}
             {/* {images.map((img, index) => (
  <div
    key={index}
    className="w-full h-screen bg-cover bg-center"
    style={{ backgroundImage: `url(${img.files[0].url})` }}
  ></div>
))} */}

{imagesToDisplay.map((img, index) => (
    <div
      key={index}
      className="w-full h-screen bg-cover bg-center"
      style={{ 
        backgroundImage: `url(${
          img.files ? img.files[0].url : img
        })` 
      }}
    ></div>   ))}
        </Carousel>
        {/* <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className="text-white text-4xl md:text-6xl font-bold text-center"
            style={{
              fontFamily: "'Playfair Display', serif",
              letterSpacing: "0.1em",
            }}
          >
            L'excellence dans <br /> chaque goutte d'eau.
          </h1>
        </div> */}
      </div>
      <div className="container mx-auto px-3 py-16">
        <span className="lg:flex items-end gap-x-60 lg:text-left text-center">
          {/* <button className="lg:block hidden bg-gradient-to-r from-[#7992d76b] to-[#eff9f9] rounded-full h-24 w-24 cursor-auto"></button> */}
          <p
            className="text-[#a5a5a5]"
            style={{
              fontFamily: "'Playfair Display', serif",
              letterSpacing: "0.1em",
            }}
          >
            NOS PARTENAIRES
          </p>
        </span>

        <div className="py-24">
          <Marquee>
         
            <img src="/assets/four1boisblanc.png" alt="" className="h-24 mr-32" />
            <img src="/assets/four2boisblanc.png" alt="" className="w-40 h-40 mr-32" />
            <img src="/assets/four3boisblanc.png" alt="" className="h-24 mr-32" />
            <img src="/assets/fournisseur2.jpg" alt="" className="h-24 mr-32" />
            <img src="/assets/karlhedin 1.png" alt="" className="h-24 mr-32" />
            <img src="/assets/logocar/bakismdf.png" alt="" className=" w-20 h-20 mr-32" />
            <img src="/assets/logodur.jpg" alt="" className="h-24 mr-32" />
            <img src="/assets/logodur2.jpg" alt="" className="h-24 mr-32" />
            <img src="/assets/logodur3.jpg" alt="" className="h-24 mr-32" />
            <img src="/assets/LogoSharedwood.png" alt="" className="h-24 mr-32" />
            <img src="/assets/mdffournisseur.png" alt="" className="h-24 mr-32" />
            <img src="/assets/molven.png" alt="" className="h-24 mr-32" />
            <img src="/assets/vida.png" alt="" className="h-24 mr-32" />
          </Marquee>
        </div>
      </div>
    </main>
  );
};

export default Real_estate;
