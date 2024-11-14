import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Importation de useTranslation
import {
  FaPhone,
  FaInstagram,
  FaFacebookF,
  FaRegEnvelope,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from '../Assets/logosanitaire.png';

const modalContentMapping = {
  Devis: {
    titleKey: 'Devis.title',
    descriptionKey: 'Devis.description'
  },
  Confidentialite: {
    titleKey: 'Confidentialite.title',
    descriptionKey: 'Confidentialite.description'
  },
  Support: {
    titleKey: 'Support.title',
    descriptionKey: 'Support.description'
  }
};

const Footer = () => {
  const { t } = useTranslation(); // Initialisation de la fonction de traduction
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleOpenModal = (type) => {
    // Récupération dynamique des clés pour le titre et la description
    const { titleKey, descriptionKey } = modalContentMapping[type];
    setModalData({
      title: t(titleKey),
      description: t(descriptionKey)
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleWhatsAppClick = () => {
    window.location.href = 'https://wa.me/21698751725'; 
  };

  const handleFacebookClick = () => {
    window.location.href = 'https://www.facebook.com/profile.php?id=100067771234549&mibextid=ZbWKwL';
  };

  const handleInstagramClick = () => {
    window.location.href = 'https://www.instagram.com/cogeb_immobiliere?igsh=MW9ub3kzbmE1ZXRoNw==';
  };
  
  return (
    <footer>
      <section className="flex flex-col bg-[#e6edeb] pt-8">
        <div className="container mx-auto lg:flex items-start justify-between pb-8">
          <div className="lg:flex justify-between px-3 w-full py-12 lg:text-left text-center">
            <div className="lg:block flex flex-col items-center justify-center">
              <span className="flex items-center gap-x-2">
                <img src={logo} alt="Logo" className="w-1/4 h-1/4 object-contain" />
              </span>
              <p className="xl:text-base text-sm py-4 w-4/5 lg:text-left text-center">
                {t('company_address')}
              </p>
              <span className="flex items-center gap-x-2 pt-4">
                <FaPhone />
                <p>+216 73 225 471</p>
              </span>
              <span className="flex items-center gap-x-2 pt-2">
                <FaRegEnvelope />
                <p>contact@cogebgroupe.com</p>
              </span>
            </div>

            <div>
              <p className="font-semibold lg:mb-4 lg:mt-0 mt-6 uppercase">
                {t('information')}
              </p>
              <ul>
                <li className="xl:text-base text-sm mt-2 cursor-pointer" onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById("hero");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}>{t('home')}</li>
                <li className="xl:text-base text-sm mt-2 cursor-pointer" onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById("propos");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}>{t('about')}</li>
                <li className="xl:text-base text-sm mt-2 cursor-pointer" onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById("produits");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}>{t('products')}</li>
                <li className="xl:text-base text-sm mt-2 cursor-pointer" onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById("service");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}>{t('services')}</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold lg:mb-4 lg:mt-0 mt-6 uppercase">
                {t('useful_links')}
              </p>
              <ul>
                <li className="xl:text-base text-sm mt-2 cursor-pointer" onClick={() => handleOpenModal('Devis')}>{t('quote')}</li>
                <li className="xl:text-base text-sm mt-2 cursor-pointer" onClick={() => handleOpenModal('Confidentialite')}>{t('privacy_policy')}</li>
                <li className="xl:text-base text-sm mt-2 cursor-pointer" onClick={() => handleOpenModal('Support')}>{t('support')}</li>
              </ul>
            </div>

            <div className="lg:w-1/3">
              <p className="font-semibold lg:mb-4 lg:mt-0 mt-6 uppercase lg:text-left text-center lg:pb-0 pb-2">
                {t('find_us')}
              </p>
              <span className="text-[#664532] flex items-center gap-4 text-2xl lg:justify-normal justify-center">
                <FaWhatsapp className="cursor-pointer" onClick={handleWhatsAppClick} />
                <FaFacebookF className="cursor-pointer" onClick={handleFacebookClick} />
                <FaInstagram className="cursor-pointer" onClick={handleInstagramClick} />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="lg:block hidden bg-[#664532] text-white xl:text-base text-sm">
        <div className="container mx-auto px-3 lg:flex justify-between items-center lg:h-14 lg:text-left text-center">
          <p>© 2024 COGEB - {t('all_rights_reserved')}</p>
          <ul className="flex lg:flex-row flex-wrap lg:justify-normal justify-center items-center gap-x-4">
            <li className="cursor-pointer">{t('terms_of_use')}</li>
            <li className="cursor-pointer">{t('privacy_policy')}</li>
            <li className="cursor-pointer">COGEB</li>
          </ul>
        </div>
      </section>

      {/* Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            backgroundColor: "white",
            p: 4,
            borderRadius: 20,
            maxWidth: '50%',
            mx: 'auto',
            mt: '20%',
            maxHeight: '90vh',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            overflowY: 'auto',
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: 'bold' }}
          >
            {modalData.title}
          </Typography>
          <Typography 
            variant="body1" 
            component="p"
            sx={{
              fontSize: {
                xs: '12px',
                sm: '13px',
                md: '14px',
                lg: '16px',
                xl: '18px',
              },
            }}
          >
            {modalData.description}
          </Typography>
        </Box>
      </Modal>
    </footer>
  );
};

export default Footer;
