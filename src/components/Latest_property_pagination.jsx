import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../actions/product.actions';
import { addToCarttwo } from '../actions/carttwo.actions';
import { MdOutlineShoppingCart } from "react-icons/md";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import "./latest_property.css";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useTranslation } from 'react-i18next';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: '600px',
  bgcolor: '#122023',
  color: 'rgb(201, 150, 26)',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

const LatestPropertyWithPagination = ({ products = [], activeFamille, activeTypes = [], onFilterByType }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [subChoix, setSubChoix] = useState([]);
  const [selectedType, setSelectedType] = useState('Tous');
  const itemsPerPage = 8;
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.product.product);
  const [open, setOpen] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products, activeFamille]);
  const confirmationModalStyle = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    bgcolor: 'white',
    color: 'black',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontSize: '1rem',
  };

  const handleFilterByType = (type) => {
    setSelectedType(type);
    if (type === 'Tous') {
      setFilteredProducts(products.filter(product => product.famille === activeFamille));
      setSubChoix([]);
    } else {
      onFilterByType(type);
      const filteredByFamilyAndType = products.filter(product => 
        product.famille === activeFamille && product.type === type
      );
      setFilteredProducts(filteredByFamilyAndType);
      setSubChoix(
        // Gérer les sous-choix en fonction de la famille et du type ici, selon les règles d'origine
      );
    }
    setCurrentPage(0);
  };

  const handleAddToCart = (productId) => {
    const cartIdFromStorage = localStorage.getItem('cartId');
    if (!cartIdFromStorage) {
      console.error("Cart ID is not found in localStorage");
      return;
    }
    dispatch(addToCarttwo(cartIdFromStorage, productId, 1));
    setShowConfirmationModal(true);
    setTimeout(() => setShowConfirmationModal(false), 2000);
  };

  const handleProductClick = (productId) => {
    dispatch(getProductById(productId));
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.floor(filteredProducts.length / itemsPerPage)));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const startIndex = currentPage * itemsPerPage;
  const selectedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="container mx-auto px-3">
      <div className="lg:flex justify-between items-center">
        <div className="lg:w-3/5">
          <h1 className="text-[#6f9789] lg:text-3xl uppercase" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "0.3em", marginTop:"10rem" }}>
            {t('products')}
          </h1>
          <h1 className="lg:text-4xl text-xl font-medium capitalize py-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('productSelection')}
          </h1>
          <p className="text-[#808080] lg:text-base text-sm lg:w-3/5" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('productDescription')}
          </p>
        </div>
      </div>

      {activeTypes.length > 0 && (
        <div className="grid grid-cols-3 gap-3 lg:w-2/5 lg:pt-0 pt-6 mx-auto justify-center customgrid-mobile">
          <button
            className={`text-[#664532] rounded-full border border-[#664532] px-1 py-2 text-sm ${selectedType === 'Tous' ? 'bg-[#664532] text-white' : 'hover:bg-[#664532] hover:text-white'}`}
            onClick={() => handleFilterByType('Tous')}
          >
            {t('all')}
          </button>
          {activeTypes.map((type, index) => (
            <button
              key={index}
              className={`text-[#664532] rounded-full border border-[#664532] px-1 py-2 text-base font-bold ${selectedType === type ? 'bg-[#664532] text-white' : 'hover:bg-[#664532] hover:text-white'}`}
              onClick={() => handleFilterByType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      )}

      <section className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {selectedProducts.map((product, index) => (
            <div key={index} className="shadow-lg rounded-3xl" onClick={() => handleProductClick(product._id)}>
              <div className="bg-gray-190 p-2 rounded-2xl">
                <span className="flex flex-col gap-y-1 py-2">
                  <p className="text-xl font-medium text-gray-700">{product.name}</p>
                  <p className="text-base font-medium text-gray-700">{product.description}</p>
                  <button 
                    onClick={() => handleAddToCart(product._id)} 
                    className="mt-1 py-1 bg-[#664532] text-white rounded-full hover:bg-blue-700"
                    style={{ display: 'flex', fontSize: '70%', alignItems: 'center', justifyContent: 'center', margin: '0 auto', width: '30%' }}
                  >
                    {t('addToCart')} <MdOutlineShoppingCart style={{ marginLeft: '1px' }} />
                  </button>
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center pt-12">
          <button
            onClick={handlePrevPage}
            className="text-[#664532] rounded-full border border-[#664532] px-3 py-2 focus:bg-[#664532] focus:text-white mr-2"
            disabled={currentPage === 0}
          >
            {t('previous')}
          </button>
          <span className="mx-2">{t('page')} {currentPage + 1} {t('of')} {totalPages}</span>
          <button
            onClick={handleNextPage}
            className="text-[#664532] rounded-full border border-[#664532] px-3 py-2 focus:bg-[#664532] focus:text-white"
            disabled={currentPage === totalPages - 1}
          >
            {t('next')}
          </button>
        </div>
      </section>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
        {selectedProduct && (
            <>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              
                <div style={{ textAlign: 'left' }}>
                  <h2 id="modal-modal-title">
                    <span style={{ color: 'gold', fontWeight: 'bold' }}>Produit:</span>
                    <span style={{ color: 'silver' }}>{selectedProduct.name}</span>
                  </h2>
                  <p id="modal-modal-description" style={{ color: 'silver', textAlign: 'justify' }}>
                    <span style={{ color: 'gold', fontWeight: 'bold' }}>Détails:</span>
                    <span>{selectedProduct.description}</span>
                  </p>
                </div>
              </div>
            </>
          )}
        </Box>
      </Modal>
      <Modal
        open={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        aria-labelledby="confirmation-modal-title"
      >     
  <Box sx={confirmationModalStyle}>
          <AiOutlineCheckCircle color="green" size={30} />
          <span>Produit ajouté au panier</span>
        </Box>
      </Modal>
    </div>
  );
};

export default LatestPropertyWithPagination;
