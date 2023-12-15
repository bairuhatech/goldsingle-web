const Imagesettings = {
  dots: false,
  infinite: false,
  autoplay: false,
  autoplaySpeed: 3000,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      },
    },
  ],
};

const Slidesettings = {
  className: "slider variable-width",
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 2,
  adaptiveHeight: true,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

export { Imagesettings, Slidesettings };
