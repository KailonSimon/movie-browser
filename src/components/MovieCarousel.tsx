import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";

function MovieCarousel({ title, movies, withRatings }: any) {
  return (
    <div>
      <h2 className="font-semibold text-3xl text-neutral-content text-left mb-4">
        {title}
      </h2>
      <Swiper spaceBetween={20} slidesPerView="auto" className="!py-5">
        {movies.map((movie: any) => {
          if (!movie.poster_path) {
            return null;
          }
          return (
            <SwiperSlide key={movie.id} className="max-w-min">
              <MovieCard movie={movie} withRating={withRatings} />
              <h3 className="mt-4 font-bold text-center px-2">{movie.title}</h3>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default MovieCarousel;
