import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { sortArrayByPopularity } from "../services/API";
import { Credit } from "../shared/interfaces/credit.interface";
import { Person } from "../shared/interfaces/person.interface";
import PersonCard from "./PersonCard";
import "swiper/css/navigation";

function CastCarousel({ cast }: { cast: Credit[] }) {
  return (
    <div>
      <h2 className="text-2xl text-white font-semibold">Top Billed Cast</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView="auto"
        className="!py-5"
        modules={[Navigation]}
        navigation
      >
        {sortArrayByPopularity(cast)
          .splice(0, 10)
          .map((person: Credit | Person) => (
            <SwiperSlide key={person.id} className="max-w-min">
              <PersonCard person={person} key={person.id} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default CastCarousel;
