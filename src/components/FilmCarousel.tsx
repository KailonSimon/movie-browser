import { Swiper, SwiperSlide } from "swiper/react";
import { Movie, Show } from "../shared/interfaces/film.interface";
import FilmCard from "./FilmCard";

type FilmCarouselProps = {
  title: string;
  films: (Movie | Show)[];
  withRatings?: boolean;
};

function FilmCarousel({ title, films, withRatings }: FilmCarouselProps) {
  return (
    <div>
      <h2 className="font-semibold text-2xl text-white text-left">{title}</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView="auto"
        className="!py-5"
        loop={true}
      >
        {films.map((film) => {
          if (!film.poster_path) {
            return null;
          }
          return (
            <SwiperSlide key={film.id} className="max-w-fit">
              <FilmCard film={film} withRating={withRatings} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default FilmCarousel;
