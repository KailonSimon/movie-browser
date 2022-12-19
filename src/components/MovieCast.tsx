import { Swiper, SwiperSlide } from "swiper/react";
import { sortArrayByPopularity } from "../services/API";
import PersonCard from "./PersonCard";

function MovieCast({ cast }: any) {
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-[20px]">Top Billed Cast</h2>
      <Swiper spaceBetween={16} slidesPerView="auto" className="w-full">
        {sortArrayByPopularity(cast)
          .splice(0, 10)
          .map((person: any) => (
            <SwiperSlide key={person.id} className="max-w-min">
              <PersonCard person={person} key={person.id} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default MovieCast;
