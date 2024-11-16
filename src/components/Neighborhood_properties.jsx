import React, { useState, useRef, useEffect } from "react";
import LatestPropertyWithPagination from "./Latest_property_pagination";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import * as Images from "../../public/index";
import { useTranslation } from "react-i18next"; // Import useTranslation

const productTypeMapping = {
  Bois_Blanc: ["Arkhangesk", "StoraEnso & Khumo", "Ilim"],
  Bois_Rouge: [
    "Vida",
    "Saters",
    "Moelven",
    "Rundvirke",
    "StoraEnso & Khumo",
    "Taiga",
    "Arkhangesk",
  ],
  Bois_Dur: ["Hêtre", "Frêne", "Acajou_Sapolli", "Chêne"],
  Bois_MDF: ["Brutte", "Mélaminé", "Couvre_Chant", "Hydrofuge"],
};
const choixMapping = [
  "1ere",
  "2eme",
  "3eme",
  "6.5",
  "Schalbord",
  "Semi_avivé",
  "Plots",
  "Avivé",
  "Avivé_étuvé choix A",
  "Plots_étuvé choix A",
  "Plots_étuvé choix BC",
  "Avivé_étuvé choix B",
  "Avivé_étuvé choix AB",
  "Semi_avivé",
  "Plots",
  "Avivé",
  "Choix QB1A",
  "Basse",
  "Doméstique",
];

const modalContent = {
  Bois_Blanc: {
    backgroundColor: "#e6edeb",
    description: "modals.Bois_Blanc.description", // Clé de traduction

    buttons: [
      { id: 1, text: "ARKHAN GESLK" },
      { id: 2, text: "STORA ENSO" },
      { id: 3, text: "ILIM" },
    ],
    suppliers: [Images.four1boisblanc, Images.ilimNew, Images.four3boisblanc],
    supplierstwo: [Images.boisblanc, Images.boisblanc1, Images.boisblanc3],
  },
  Bois_Rouge: {
    backgroundColor: "#e6edeb",
    description: "modals.Bois_Rouge.description", // Clé de traduction

      buttons: [
      { id: 1, text: "FORTUNA" },
      { id: 2, text: "STORA ENSO" },
      { id: 3, text: "KUHMO" },
      { id: 4, text: "TAIGA" },
      { id: 5, text: "ARKHAN GESLK" },
      { id: 6, text: "VIDA" },
      { id: 6, text: "SATERS" },
      { id: 6, text: "MOELVEN" },
      { id: 6, text: "RUNDVIRKE" },
    ],
    suppliers: [
      Images.four1boisblanc,
      Images.ilimNew,
      Images.four3boisblanc,
      Images.fournisseur2,
      Images.vidaNew,
      Images.molven,
      Images.karlhedin1,
    ],
    supplierstwo: [Images.boisrouge1, Images.boisrouge2, Images.boisrouge3],
  },
  Bois_MDF: {
    backgroundColor: "#e6edeb",
    description: "modals.Bois_MDF.description", // Clé de traduction

    buttons: [
      { id: 1, text: "BRUTTE" },
      { id: 2, text: "HYDROFUGE" },
      { id: 3, text: "MELAMINE" },
      { id: 4, text: "COUVRE CHANT" },
    ],
    suppliers: [Images.bakismdf, Images.mdffournisseur],

    supplierstwo: [Images.mdf2, Images.mdf, Images.mdf3],
  },
  Bois_Dur: {
    backgroundColor: "#e6edeb",
    description: "modals.Bois_Dur.description", // Clé de traduction

    buttons: [
      { id: 1, text: "HETRE" },
      { id: 2, text: "FRENE" },
      { id: 3, text: "ACAJOU SAPELLI" },
      { id: 4, text: "CHENE" },
    ],
    suppliers: [
      Images.logoSharedwood,
      Images.logoSito,
      Images.logodur,
      Images.logodur2,
      Images.logodur3,
    ],

    supplierstwo: [Images.boisdur, Images.boisdur2222, Images.boisdur3333],
  },
};

const useIsSmallScreen = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 425);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isSmallScreen;
};

const Neighborhood_properties = ({ products }) => {
  const { t } = useTranslation(); // Hook pour i18n

  const isSmallScreen = useIsSmallScreen();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeFamille, setActiveFamille] = useState("Tous");
  const [activeTypes, setActiveTypes] = useState([]);
  const [activeChoix, setActiveChoix] = useState([]);
  const productsRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    // handleFilter('Tous'); // Sélectionne 'Tous' par défaut au chargement
  }, [products]);

  const handleFilter = (famille) => {
    setActiveFamille(famille);
    setActiveChoix([]);
    if (famille === "Tous") {
      setFilteredProducts(products);
      setActiveTypes([]);
    } else {
      setFilteredProducts(
        products.filter((product) => product.famille === famille)
      );
      setActiveTypes(productTypeMapping[famille] || []);
    }
    productsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleFilterByType = (type) => {
    setFilteredProducts(products.filter((product) => product.type === type));
    setActiveChoix(choixMapping);
  };

  const handleFilterByChoix = (choix) => {
    setFilteredProducts(products.filter((product) => product.choix === choix));
  };

  const getActiveClass = (famille) => {
    return activeFamille === famille
      ? "shadow-[#8B4513] shadow-lg cursor-pointer"
      : "cursor-pointer";
  };
  const handleOpenModal = (famille) => {
    const data = modalContent[famille];
    setModalData({
      ...data,
      description: t(data.description), // Traduire la description au moment de l'affichage
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <main className="container mx-auto px-3 lg:pt-24" id="produits">
      <p
        className="text-[#0c4f37] uppercase md:text-3xl text-lg"
        style={{
          fontFamily: "'Playfair Display', serif",
          letterSpacing: "0.2em",
          marginTop: "2rem",
        }}
      >
        {t("catalogue.title")}
      </p>
      <h1
        className="lg:text-4xl text-xl font-medium capitalize pt-3 pb-12"
        style={{
          fontFamily: "'Playfair Display', serif",
        }}
      >
        {t("catalogue.subtitle")}
      </h1>

      <section className="grid md:grid-cols-7 grid-cols-2 md:gap-12 gap-4 pb-12">
        <div
          className={`relative md:col-span-2 rounded-3xl ${getActiveClass(
            "Bois_Blanc"
          )}`}
          onClick={() => {
            handleFilter("Bois_Blanc");
            handleOpenModal("Bois_Blanc");
          }}
        >
          <img
            src="/assets/boisblanc.jpg"
            alt="Bois Blanc"
            className="rounded-3xl object-cover md:h-80 h-40 w-full"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent rounded-3xl"></span>
          <span className="absolute md:bottom-8 bottom-4 md:left-8 left-4">
            <p
              className="text-white lg:text-3xl md:text-base text-sm"
              style={{
                fontFamily: "'CinzelDecorative', serif",
                fontWeight: "bold",
                letterSpacing: "0.2em",
              }}
            >
              {t("familles.Bois_Blanc")}
            </p>
          </span>
        </div>

        <div
          className={`relative md:col-span-2 rounded-3xl ${getActiveClass(
            "Bois_Rouge"
          )}`}
          onClick={() => {
            handleFilter("Bois_Rouge");
            handleOpenModal("Bois_Rouge");
          }}
        >
          <img
            src="/assets/boisrouge.jpg"
            alt="Bois Rouge"
            className="rounded-3xl object-cover md:h-80 h-40 w-full"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent rounded-3xl"></span>
          <span className="absolute md:bottom-8 bottom-4 md:left-8 left-4">
            <p
              className="text-white lg:text-3xl md:text-base text-sm"
              style={{
                fontFamily: "'CinzelDecorative', serif",
                fontWeight: "bold",
                letterSpacing: "0.2em",
              }}
            >
              {t("familles.Bois_Rouge")}
            </p>
          </span>
        </div>

        <div
          className={`relative md:col-span-3 rounded-3xl ${getActiveClass(
            "Bois_MDF"
          )}`}
          onClick={() => {
            handleFilter("Bois_MDF");
            handleOpenModal("Bois_MDF");
          }}
        >
          <img
            src="/assets/mdf.jpg"
            alt="Bois MDF"
            className="rounded-3xl object-cover md:h-80 h-40 w-full"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent rounded-3xl"></span>
          <span className="absolute md:bottom-8 bottom-4 md:left-8 left-4">
            <p
              className="text-white lg:text-3xl md:text-base text-sm"
              style={{
                fontFamily: "'CinzelDecorative', serif",
                fontWeight: "bold",
                letterSpacing: "0.2em",
              }}
            >
              {t("familles.Bois_MDF")}
            </p>
          </span>
        </div>

        <div
          className={`relative md:col-span-4 rounded-3xl ${getActiveClass(
            "Bois_Dur"
          )}`}
          onClick={() => {
            handleFilter("Bois_Dur");
            handleOpenModal("Bois_Dur");
          }}
        >
          <img
            // src="/assets/boisdur.jpg"
            src="/assets/doisdur4444 1.png"
            alt="Bois Dur"
            className="rounded-3xl object-cover md:h-80 h-40 w-full"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent rounded-3xl"></span>
          <span className="absolute md:bottom-8 bottom-4 md:left-8 left-4">
            <p
              className="text-white lg:text-3xl md:text-base text-sm"
              style={{
                fontFamily: "'CinzelDecorative', serif",
                fontWeight: "bold",
                letterSpacing: "0.2em",
              }}
            >
              {t("familles.Bois_Dur")}
            </p>
          </span>
        </div>

        <div
          className={`relative md:col-span-3 rounded-3xl ${getActiveClass(
            "Tous"
          )}`}
          onClick={() => handleFilter("Tous")}
        >
          <img
            src="/assets/tousbois.png"
            alt="Tous les produits"
            className="rounded-3xl object-cover md:h-80 h-40 w-full"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent rounded-3xl"></span>
          <span className="absolute md:bottom-8 bottom-4 md:left-8 left-4">
            <p
              className="text-white lg:text-3xl md:text-base text-sm"
              style={{
                fontFamily: "'CinzelDecorative', serif",
                fontWeight: "bold",
                letterSpacing: "0.2em",
              }}
            >
              {t("familles.Tous")}
            </p>
          </span>
        </div>
      </section>

      <div ref={productsRef}>
        <LatestPropertyWithPagination
          products={filteredProducts}
          activeFamille={activeFamille}
          activeTypes={activeTypes}
          onFilterByType={handleFilterByType}
          onFilterByChoix={handleFilterByChoix}
        />
      </div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            backgroundColor: "white",
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: { xs: 2, sm: 3, md: 5 },
            width: { xs: "90%", sm: "90%", md: "80%" },
            maxWidth: "1200px",
            mx: "auto",
            my: { xs: "2%", sm: "4%" },
            maxHeight: "95vh",
            overflowY: "auto",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            position: "relative",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
              mb: 2,
              pr: 4,
            }}
          >
            {t("modals.title")}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" },
              mb: 3,
            }}
          >
            {modalData.description}
          </Typography>
          <Box
            mt={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
            }}
            gap={1}
          >
            {modalData.buttons?.map((button) => (
              <button
                key={button.id}
                style={{
                  padding: "8px",
                  border: "1px solid #ccc",
                  backgroundColor: "#9d7153",
                  color: "white",
                  cursor: "pointer",
                  textAlign: "center",
                  borderRadius: "16px",
                  fontSize: "0.8rem",
                  width: "100%",
                }}
              >
                {button.text}
              </button>
            ))}
          </Box>
          <Box
            mt={3}
            mb={3}
            display="grid"
            gridTemplateColumns={{
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            }}
            gap={2}
          >
            {modalData.supplierstwo?.map((suppliertwo, index) => (
              <img
                key={index}
                src={suppliertwo}
                alt={`Supplier ${index + 1}`}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "260px",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            ))}
          </Box>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
              mb: 2,
            }}
          >
            {t("modals.Fournisseurs")}
          </Typography>
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(3, 1fr)",
              sm: "repeat(4, 1fr)",
              md: "repeat(5, 1fr)",
            }}
            gap={2}
          >
            {modalData.suppliers?.map((supplier, index) => (
              <img
                key={index}
                src={supplier}
                alt={`Supplier ${index + 1}`}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "60px",
                  objectFit: "contain",
                  borderRadius: "5px",
                }}
              />
            ))}
          </Box>
        </Box>
      </Modal>
    </main>
  );
};

export default Neighborhood_properties;
