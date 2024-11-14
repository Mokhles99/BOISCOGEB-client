import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHome } from "react-icons/fa";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { getAllAbouts } from "../actions/about.actions"; // Assurez-vous d'importer correctement votre action

const Who_are_we = () => {
  const { t } = useTranslation(); // Initialize translation function
  const dispatch = useDispatch();

  // Dispatch de l'action pour récupérer les données
  useEffect(() => {
    dispatch(getAllAbouts());
  }, [dispatch]);

  const abouts = useSelector((state) => state.about.abouts);
  const state = useSelector((state) => state);

  const firstImageUrl = abouts.length > 0 && abouts[0].files.length > 0
    ? abouts[0].files[0].url
    : '';
  const secondImageUrl = abouts.length > 1 && abouts[1].files.length > 0
    ? abouts[1].files[0].url
    : '';
  const thirdImageUrl = abouts.length > 2 && abouts[2].files.length > 0
    ? abouts[2].files[0].url
    : '';

  return (
    <main className="container mx-auto lg:flex px-3 mb-12 lg:pt-0 pt-8" id="propos">
      <div className="lg:w-2/5">
        <p
          className="text-[#0c4f37] md:text-3xl text-lg font-medium"
          style={{
            fontFamily: "'Playfair Display', serif",
            letterSpacing: "0.3em",
          }}
        >
          {t('Who_are_we.about')} {/* Translated key for 'A PROPOS' */}
        </p>
        <h1
          className="lg:text-4xl text-2xl font-medium py-3"
          style={{
            fontFamily: "'Playfair Display', serif",
          }}
        >
          {t('Who_are_we.title')} {/* Translated key for 'Qui Sommes-Nous ?' */}
        </h1>

        <p
          className="lg:w-4/5 text-[#a5a5a5] text-justify"
          style={{
            fontFamily: "'Playfair Display', serif ",
          }}
        >
          {t('Who_are_we.description')} {/* Translated text for description */}
        </p>

        <div className="lg:block hidden">
          <div className="bg-white shadow-2xl px-4 py-6 rounded-3xl flex items-center gap-x-3 lg:w-4/5 mt-6">
            <span className="">
              <p className="text-[#a5a5a5] w-5/5 text-justify">
                {t('Who_are_we.excellence1')} {/* Translated text for excellence1 */}
              </p>
            </span>
          </div>

          <div className="bg-white shadow-2xl px-4 py-6 rounded-3xl flex items-center gap-x-3 lg:w-4/5 mt-6">
            <span className="">
              <p className="text-[#a5a5a5] w-5/5 text-justify">
                {t('Who_are_we.excellence2')} {/* Translated text for excellence2 */}
              </p>
            </span>
          </div>
        </div>
      </div>

      <div className="lg:w-1/2 flex items-end gap-4 lg:mt-0 mt-12 lg:h-auto h-[40rem]">
        <img
          src={firstImageUrl || '/assets/proposbois1.png'}
          alt=""
          className="rounded-3xl w-1/2 h-4/5 shadow-md object-cover"
        />
        <div className="w-1/2 h-4/5 flex flex-col gap-4 relative -top-20">
          <img
            src={secondImageUrl || "/assets/nvlproposbois 1.png"}
            alt=""
            className="w-full h-3/5 rounded-3xl shadow-md object-cover"
          />
          <img
            src={thirdImageUrl || "/assets/nvlproposbois2 1.png"}
            alt=""
            className="w-full h-2/5 rounded-3xl shadow-md object-cover"
          />
        </div>
      </div>

      <div className="lg:hidden block pt-4 py-16">
        <div className="bg-white shadow-2xl px-4 py-6 rounded-3xl flex items-center gap-x-3 lg:w-4/5 mt-6">
          <span className="">
            <p className="text-[#a5a5a5] w-5/5 text-justify">
              {t('Who_are_we.excellence1')}
            </p>
          </span>
        </div>

        <div className="bg-white shadow-2xl px-4 py-6 rounded-3xl flex items-center gap-x-3 lg:w-4/5 mt-6">
          <span className="">
            <p className="text-[#a5a5a5] w-5/5 text-justify">
              {t('Who_are_we.excellence2')}
            </p>
          </span>
        </div>
      </div>
    </main>
  );
};

export default Who_are_we;
