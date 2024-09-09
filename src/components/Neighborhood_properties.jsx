
import React, { useState, useRef, useEffect } from 'react';
import LatestPropertyWithPagination from './Latest_property_pagination';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';



const productTypeMapping = {
  'Bois_Blanc': ['Arkhangesk','StoraEnso & Khumo','Ilim'],
  'Bois_Rouge': ['Vida','Saters','Moelven','Rundvirke','StoraEnso & Khumo','Taiga','Arkhangesk'],
  'Bois_Dur': ['Hêtre','Frêne','Acajou_Sapolli','Chêne'],
  'Bois_MDF': ['Brutte','Mélaminé','Couvre_Chant','Hydrofuge']
};
const choixMapping = [
  '1ere', '2eme', '3eme', '6.5', 'Schalbord', 'Semi_avivé', 'Plots', 'Avivé', 'Avivé_étuvé choix A',
  'Plots_étuvé choix A', 'Plots_étuvé choix BC', 'Avivé_étuvé choix B', 'Avivé_étuvé choix AB', 
  'Semi_avivé', 'Plots', 'Avivé', 'Choix QB1A', 'Basse', 'Doméstique'
];


const modalContent = {
  Bois_Blanc: {
    backgroundColor: "#e6edeb",
    description:
      "Le bois Blanc est un bois tendre, fourni par les pays Scandinaves (Finlande, Suède ou Europe Autriche et Russie). Cette essence peut être utilisée en charpente, en menuiserie intérieure, en emballage et aussi dans la fabrication de lamellé.Cogeb répond alors à la demande du marché Tunisien en dédiant un volume important de ses importations au bois blanc.",
    
      buttons: [
        { id: 1, text: 'ARKHAN GESLK' },
        { id: 2, text: 'STORA ENZO' },
        { id: 3, text: 'ILIM' },
      
        
      ],
     suppliers: [
      "/public/assets/four1boisblanc.png",
      "/public/assets/ilim new.png",
      "/public/assets/four3boisblanc.png",
    ],
    supplierstwo: [
      "/public/assets/boisblanc.jpg",
      "/public/assets/boisblanc1.png",
      "/public/assets/boisblanc3.png",
    ],

    

  },
  Bois_Rouge: {
    backgroundColor: "#e6edeb",
    description:
      "Le bois Rouge est un bois tendre provenant principalement de Suède, Finlande, Russie et de ses forêts riches (côtières). Bois commercialisé dans le domaine de la charpente et du bardage. Grâce à cette essence, Cogeb est fière de vous offrir une qualité bien connue en Tunisie.Pour cela, Cogeb veille à mettre à votre disposition un stock toujours bien portant de bois rouge afin de répondre à tous vos besoins d'aménagement avec des fournisseurs de renommée mondiale.",
      buttons: [
        { id: 1, text: 'FORTUNA' },
        { id: 2, text: 'STORA ENZO' },
        { id: 3, text: 'KUHMO' },
        { id: 4, text: 'TAIGA' },
        { id: 5, text: 'ARKHAN GESLK' },
        { id: 6, text: 'VIDA' },
        { id: 6, text: 'SATERS' },
        { id: 6, text: 'MOELVEN' },
        { id: 6, text: 'RUDUIRKE' },
        
      ], suppliers: [
      "/public/assets/four1boisblanc.png",
      "/public/assets/ilim new 1.png",
      "/public/assets/four3boisblanc.png", 
      "/public/assets/fournisseur2.jpg", 
      "/public/assets/vida new.png", 
      "/public/assets/molven.png",
      "/public/assets/karlhedin 1.png"
    ],
    supplierstwo: [
      "/public/assets/boisrouge1.png",
      "/public/assets/boisrouge2.png",
      "/public/assets/boisrouge3.png",
    ],
  },
  Bois_MDF: {
    backgroundColor: "#e6edeb",
    description:
      "Connu pour être l'un des plus importants fournisseurs de matériaux de construction en Tunisie et des grands chantiers dans la zone du Sahel et sur tout le territoire tunisien, cogeb offre un large choix de Fer avec toutes les formes de barre (8, 10; 12 et 14) ainsi que son nouveau produit sur le marché le fer marchand.Des briques de qualité supérieure Du ciment en grande quantité nécessaire pour les chantiers et la même la construction individuelle Ainsi que le chou blanc .",
      buttons: [
        { id: 1, text: 'BRUTTE' },
        { id: 2, text: 'HYDROFUGE' },
        { id: 3, text: 'MELAMINE' },
        { id: 4, text: 'COUVRE CHANT' },
       
        
      ], suppliers: [
      "/assets/bakismdf.png",
      "/assets/mdffournisseur.png",
     
    ],
    
    supplierstwo: [
      "/public/assets/mdf2.jpg",
      "/public/assets/mdf.jpg",
      "/public/assets/mdf3.png",
    ],
  },
  Bois_Dur: {
    backgroundColor: "#e6edeb",
    description:
      "Le bois Dur provient d'arbres à feuilles caduques, tels que le chêne, le hêtre et le frêne. Il se distingue par sa densité et sa durabilité supérieures au bois tendre. Cogeb vous propose une large gamme de bois Dur, importée de Roumanie et de France, reconnue pour sa résistance exceptionnelle. Le hêtre, dense et durable, est prisé par les ébénistes et menuisiers. Le frêne, célèbre pour sa résistance mécanique et sa blancheur, est une des essences les plus belles. Le chêne blanc, stable et de qualité incomparable, est idéal pour la menuiserie d'intérieur. Cogeb met à votre disposition un large stock de ces essences pour répondre à vos besoins.",
      buttons: [
        { id: 1, text: 'HETRE' },
        { id: 2, text: 'FRENE' },
        { id: 3, text: 'ACAJOU SAPOLLI' },
        { id: 4, text: 'CHENE' },
       
        
      ], suppliers: [
      "/assets/LogoSharedwood.png",
      "/assets/LOGO-SITO.png",
      "/assets/logodur.jpg",
      "/assets/logodur2.jpg",
      "/assets/logodur3.jpg",
  
    ],

    supplierstwo: [
      "/public/assets/boisdur.jpg",
      // "/public/assets/proposbois3.jpg",
      "/public/assets/boisdur2222.jpg",
      // "/public/assets/modalboisdur.png",
      "/public/assets/boisdur3333.jpg",
    ],
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

  const isSmallScreen = useIsSmallScreen();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeFamille, setActiveFamille] = useState('Tous');
  const [activeTypes, setActiveTypes] = useState([]);
  const [activeChoix, setActiveChoix] = useState([]);
  const productsRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    handleFilter('Tous'); // Sélectionne 'Tous' par défaut au chargement
  }, [products]);

  const handleFilter = (famille) => {
    setActiveFamille(famille);
    setActiveChoix([]);
    if (famille === 'Tous') {
      setFilteredProducts(products);
      setActiveTypes([]);
    } else {
      setFilteredProducts(products.filter(product => product.famille === famille));
      setActiveTypes(productTypeMapping[famille] || []);
    }
    productsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFilterByType = (type) => {
    setFilteredProducts(products.filter(product => product.type === type));
    setActiveChoix(choixMapping); 
  };

  const handleFilterByChoix = (choix) => {
    setFilteredProducts(products.filter(product => product.choix === choix));
  };

  const getActiveClass = (famille) => {
    return activeFamille === famille ? 'shadow-blue-500 shadow-lg cursor-pointer' : 'cursor-pointer';
  };
  const handleOpenModal = (famille) => {
    setModalData(modalContent[famille]);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <main className="container mx-auto px-3 lg:pt-24" id="produits">
      <p className="text-[#0c4f37] uppercase md:text-3xl text-lg" style={{
        fontFamily: "'Playfair Display', serif",
        letterSpacing: "0.2em",
        marginTop: "2rem"
      }}>
        NOS CATALOGUES
      </p>
      <h1 className="lg:text-4xl text-xl font-medium capitalize pt-3 pb-12" style={{
        fontFamily: "'Playfair Display', serif",
      }}>
        Choisir vos désirs 
      </h1>

      <section className="grid md:grid-cols-7 grid-cols-2 md:gap-12 gap-4 pb-12">
        <div className={`relative md:col-span-2 rounded-3xl ${getActiveClass('Bois_Blanc')}`} onClick={() =>  {
  handleFilter('Bois_Blanc');
  handleOpenModal('Bois_Blanc');
}} >
          <img
            src="/assets/boisblanc.jpg"
            alt="Bois Blanc"
            className="rounded-3xl object-cover md:h-80 h-40 w-full"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent rounded-3xl"></span>
          <span className="absolute md:bottom-8 bottom-4 md:left-8 left-4">
            <p className="text-white lg:text-3xl md:text-base text-sm" style={{
              fontFamily: "'CinzelDecorative', serif",
              fontWeight: "bold",
              letterSpacing: "0.2em",
            }}>
              BOIS BLANC
            </p>
          </span>
        </div>

        <div className={`relative md:col-span-2 rounded-3xl ${getActiveClass('Bois_Rouge')}`} onClick={() =>  {
  handleFilter('Bois_Rouge');
  handleOpenModal('Bois_Rouge');
}} >
          <img
            src="/assets/boisrouge.jpg"
            alt="Bois Rouge"
            className="rounded-3xl object-cover md:h-80 h-40 w-full"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent rounded-3xl"></span>
          <span className="absolute md:bottom-8 bottom-4 md:left-8 left-4">
            <p className="text-white lg:text-3xl md:text-base text-sm" style={{
              fontFamily: "'CinzelDecorative', serif",
              fontWeight: "bold",
              letterSpacing: "0.2em",
            }}>
              BOIS ROUGE
            </p>
          </span>
        </div>

        <div className={`relative md:col-span-3 rounded-3xl ${getActiveClass('Bois_MDF')}`} onClick={() =>  {
              handleFilter('Bois_MDF');
              handleOpenModal('Bois_MDF');
            }} >
          <img
            src="/assets/mdf.jpg"
            alt="Bois MDF"
            className="rounded-3xl object-cover md:h-80 h-40 w-full"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent rounded-3xl"></span>
          <span className="absolute md:bottom-8 bottom-4 md:left-8 left-4">
            <p className="text-white lg:text-3xl md:text-base text-sm" style={{
              fontFamily: "'CinzelDecorative', serif",
              fontWeight: "bold",
              letterSpacing: "0.2em",
            }}>
              BOIS MDF
            </p>
          </span>
        </div>

        <div className={`relative md:col-span-4 rounded-3xl ${getActiveClass('Bois_Dur')}`} onClick={() =>  {
  handleFilter('Bois_Dur');
  handleOpenModal('Bois_Dur');
}} >
          <img
            // src="/assets/boisdur.jpg"
            src="/assets/doisdur4444 1.png"
            alt="Bois Dur"
            className="rounded-3xl object-cover md:h-80 h-40 w-full"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent rounded-3xl"></span>
          <span className="absolute md:bottom-8 bottom-4 md:left-8 left-4">
            <p className="text-white lg:text-3xl md:text-base text-sm" style={{
              fontFamily: "'CinzelDecorative', serif",
              fontWeight: "bold",
              letterSpacing: "0.2em",
            }}>
              BOIS DUR
            </p>
          </span>
        </div>

        <div className={`relative md:col-span-3 rounded-3xl ${getActiveClass('Tous')}`} onClick={() => handleFilter('Tous')}>
          <img
            src="/assets/tousbois.png"
            alt="Tous les produits"
            className="rounded-3xl object-cover md:h-80 h-40 w-full"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent rounded-3xl"></span>
          <span className="absolute md:bottom-8 bottom-4 md:left-8 left-4">
            <p className="text-white lg:text-3xl md:text-base text-sm" style={{
              fontFamily: "'CinzelDecorative', serif",
              fontWeight: "bold",
              letterSpacing: "0.2em",
            }}>
              TOUS LES PRODUITS
            </p>
          </span>
        </div>
      </section>

      <div ref={productsRef}>
        <LatestPropertyWithPagination 
          products={filteredProducts} 
          activeFamille={activeFamille} // Passez la famille sélectionnée comme prop
          activeTypes={activeTypes} 
          onFilterByType={handleFilterByType}  // Passez le gestionnaire de filtrage par type
          onFilterByChoix={handleFilterByChoix} // Passez le gestionnaire de filtrage par choix
        />
      </div>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box 
          sx={{
            // backgroundColor: modalData.backgroundColor,
            backgroundColor:"white",
            p: 2,
            borderRadius: 5,
            maxWidth: '80%',
            mx: 'auto',
            mt: '4%',
            maxHeight: '95vh',     // Limite la hauteur du modal
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'  // Ajoute une ombre pour le modal
          }}
        >
                            <Typography
                      variant="h6"
                      component="h2"
                      sx={{ fontWeight: 'bold' }}
                    >
  A Propos ce bois :
</Typography>
<Typography 
  variant="body1" 
  component="p"
  sx={{
    fontSize: {
      xs: '12px',  // Small screens
      sm: '12px',  // Small to medium screens
      md: '12px',  // Medium screens
      lg: '12px',  // Large screens
      xl: '12px',  // Extra large screens
    },
  }}
>
  {modalData.description}
</Typography>
          <Typography
  variant="h6"
  component="h2"
  sx={{ fontWeight: 'bold'}}
>
<Box
  mt={0.3}
  display="grid"
  gridTemplateColumns="repeat(auto-fit, minmax(50px, 1fr))"  // Adjusted minmax values for smaller buttons
 
>
  {modalData.buttons?.map((button) => (
    <button
      key={button.id}
      style={{
        padding: "4px 8px",   // Smaller padding for minimized buttons
        border: "1px solid #ccc",
        backgroundColor: "#9d7153",
        color:"white",
        cursor: "pointer",
        textAlign: "center",
        borderRadius: "16px",  // Reduced border radius
        fontSize: isSmallScreen ? "35%" : "50%", // Reduced font size for button text
        width: "100%",  // Make the button take full width of its grid cell
      }}
    >
      {button.text}
    </button>
  ))}
</Box>

<Box mt={0.3} mb={0.5} display="grid" gridTemplateColumns="repeat(auto-fit, minmax(50px, 1fr))" >
  {modalData.supplierstwo?.map((suppliertwo, index) => (
    <img
      key={index}
      src={suppliertwo}
      alt={`Supplier ${index + 1}`}
      className="rounded-lg"
      style={{ width: "100%", maxWidth:"400px", height: "260px", objectFit: "contain"  }} 
     
    />
  ))}
</Box>


  Nos Fournisseurs :
</Typography>
<Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(50px, 1fr))">
  {modalData.suppliers?.map((supplier, index) => (
    <img 
      key={index} 
      src={supplier} 
      alt={`Supplier ${index + 1}`} 
      style={{
        width: "100%",
        height: "60px",  // Height of each logo
        objectFit: "contain",
        margin: "5px",  // Adds some spacing between logos
        maxWidth: "100%",
        flexShrink: 0,  // Ensures the images do not shrink too much
        borderRadius: "5px"  // Optional: Add rounded corners
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
