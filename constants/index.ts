import { IMenuItem } from "@/types";

export const menuItems: IMenuItem[] = [
  {
    id: "home",
    name: "Home",
    route: "/browse",
  },
  {
    id: "tv",
    name: "TV Shows",
    route: "/tv",
  },
  {
    id: "movies",
    name: "Movies",
    route: "/movies",
  },
  {
    id: "my-list",
    name: "My List",
    route: "/my-list",
  },
];

export const settings = {
  dots: false,
  infinite: true,
  speed: 3000,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  // autoplaySpeed: 2000,
  cssEase: "linear",
  arrows: false,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
