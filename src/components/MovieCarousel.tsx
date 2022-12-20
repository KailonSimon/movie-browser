import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";

function MovieCarousel({ title, movies }: any) {
  return (
    <div>
      <h2 className="font-semibold text-3xl text-neutral-content text-left mb-4">
        {title}
      </h2>
      <Swiper spaceBetween={16} slidesPerView="auto" className="!py-4">
        {movies.map((movie: any) => {
          if (!movie.poster_path) {
            return null;
          }
          return (
            <SwiperSlide
              key={movie.id}
              className="max-w-min md:hover:scale-105"
            >
              <MovieCard movie={movie} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default MovieCarousel;
