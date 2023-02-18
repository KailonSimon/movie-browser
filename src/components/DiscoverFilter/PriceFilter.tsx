import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { Filter, initialState } from "../../services/Filter";

type PriceFilterProps = Pick<
  Filter,
  "monetizationTypes" | "setMonetizationTypes"
>;

type PriceItem = {
  value: "flatrate" | "free" | "ads" | "rent" | "buy";
  label: string;
};

const priceItems: PriceItem[] = [
  { value: "free", label: "Free" },
  { value: "ads", label: "Ads" },
  { value: "flatrate", label: "Subscription" },
  { value: "buy", label: "Buy" },
  { value: "rent", label: "Rent" },
];

export default function PriceFilter({
  monetizationTypes,
  setMonetizationTypes,
}: PriceFilterProps) {
  const handleResetClick = () => {
    if (
      JSON.stringify(monetizationTypes) !==
      JSON.stringify(initialState.monetizationTypes)
    ) {
      setMonetizationTypes(initialState.monetizationTypes);
    }
  };
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h3 className="text-xl font-medium">Price</h3>
          <button
            className="p-2 hover:bg-base-300 rounded-lg text-lg md:text-xs text-primary-focus font-bold flex items-center justify-between gap-1"
            onClick={handleResetClick}
          >
            <AiOutlineClose />
            <span className="hidden md:flex">RESET</span>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {priceItems.map((priceItem: PriceItem) => (
          <button
            key={priceItem.label}
            className={`flex items-center gap-1 text-left rounded-lg p-2 hover:text-white ${
              monetizationTypes.includes(priceItem.value)
                ? "bg-base-300"
                : "text-primary-focus"
            }`}
            onClick={() =>
              monetizationTypes.includes(priceItem.value)
                ? setMonetizationTypes(
                    monetizationTypes.filter(
                      (monetizationType: string) =>
                        monetizationType !== priceItem.value
                    )
                  )
                : setMonetizationTypes([...monetizationTypes, priceItem.value])
            }
          >
            <AiOutlineCheck /> {priceItem.label}
          </button>
        ))}
      </div>
    </div>
  );
}
