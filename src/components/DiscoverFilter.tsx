import { FilterFunctions, FilterState } from "../services/Filter";
import orderBy from "lodash/orderBy";
import ReleaseDateFilter from "./DiscoverFilter/ReleaseDateFilter";
import MediumFilter from "./DiscoverFilter/MediumFilter";
import GenreFilter from "./DiscoverFilter/GenreFilter";
import RatingFilter from "./DiscoverFilter/RatingFilter";
import RuntimeFilter from "./DiscoverFilter/RuntimeFilter";
import PriceFilter from "./DiscoverFilter/PriceFilter";
import FilterSort from "./DiscoverFilter/FilterSort";
import ProviderFilter from "./DiscoverFilter/ProviderFilter";
import { AiOutlineClose } from "react-icons/ai";
import FilterSelectContainer from "./DiscoverFilter/containers/FilterSelectContainer";
import FilterDrawer from "./DiscoverFilter/containers/FilterDrawer";

type FilterProps = {
  state: FilterState;
  functions: FilterFunctions;
  genres: any[];
  providers: any[];
  numberOfResults: number;
};

function Filter({
  state,
  functions,
  genres,
  providers,
  numberOfResults,
}: FilterProps) {
  const filterComponents = [
    {
      title: "Release year",
      element: (
        <ReleaseDateFilter
          key={"ReleaseDateFilter"}
          dateRange={state.dateRange}
          setDateRange={functions.setDateRange}
        />
      ),
    },
    {
      title: "Genres",
      element: (
        <GenreFilter
          key={"GenreFilter"}
          genres={genres}
          includedGenres={state.includedGenres}
          setIncludedGenres={functions.setIncludedGenres}
          excludedGenres={state.excludedGenres}
          setExcludedGenres={functions.setExcludedGenres}
        />
      ),
    },
    {
      title: "Rating",
      element: (
        <RatingFilter
          key={"RatingFilter"}
          ratingRange={state.ratingRange}
          setRatingRange={functions.setRatingRange}
          minimumRatingCount={state.minimumRatingCount}
          setMinimumRatingCount={functions.setMinimumRatingCount}
        />
      ),
    },
    {
      title: "Runtime",
      element: (
        <RuntimeFilter
          key={"RuntimeFilter"}
          runtimeRange={state.runtimeRange}
          setRuntimeRange={functions.setRuntimeRange}
        />
      ),
    },
    {
      title: "Price",
      element: (
        <PriceFilter
          key={"PriceFilter"}
          monetizationTypes={state.monetizationTypes}
          setMonetizationTypes={functions.setMonetizationTypes}
        />
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      <ProviderFilter
        providers={orderBy(providers, [
          (provider) => provider.display_priority,
        ])}
        activeProviders={state.activeProviders}
        setActiveProviders={functions.setActiveProviders}
      />
      <div className="flex justify-between items-center">
        <div className="grow flex gap-2 items-center">
          <MediumFilter medium={state.medium} setMedium={functions.setMedium} />
          <FilterDrawer>
            {filterComponents.map((component) => component.element)}
          </FilterDrawer>
          <div className="hidden md:flex">
            {filterComponents.map((component) => (
              <FilterSelectContainer
                title={component.title}
                key={component.title}
              >
                {component.element}
              </FilterSelectContainer>
            ))}
          </div>
        </div>
        <button
          className="bg-base-300 md:bg-transparent w-[32px] md:w-min h-[32px] p-2 hover:bg-base-300 rounded text-xl md:text-xs text-primary-focus font-bold flex items-center justify-center md:justify-between gap-1"
          onClick={functions.reset}
        >
          <AiOutlineClose />
          <span className="hidden md:block">RESET</span>
        </button>
      </div>
      <div className="flex">
        <span className="text-[14px] text-primary-focus flex items-center gap-1">
          {numberOfResults.toLocaleString("en")} titles sorted by{" "}
          <FilterSort
            sortType={state.sortType}
            setSortType={functions.setSortType}
          />
        </span>
      </div>
    </div>
  );
}

export default Filter;
