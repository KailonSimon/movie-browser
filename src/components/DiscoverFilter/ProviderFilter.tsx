import { Reducer, useReducer } from "react";
import { BsPlusLg } from "react-icons/bs";
import { Filter } from "../../services/Filter";
import { Provider } from "../../shared/interfaces/provider.interface";
import ProviderSelectionModal from "./ProviderSelectionModal";

type State = {
  modalOpened: boolean;
  visibleProviders: number[];
};

type Action =
  | { type: "SET_MODAL_OPENED"; payload: boolean }
  | { type: "SET_VISIBLE_PROVIDERS"; payload: number[] };

type ProviderFilterProps = {
  providers: Provider[];
  activeProviders: Filter["activeProviders"];
  setActiveProviders: Filter["setActiveProviders"];
};

const initialState: State = {
  modalOpened: false,
  visibleProviders: [],
};

const initializeState = (activeProviders: number[]) => {
  return {
    ...initialState,
    visibleProviders: activeProviders,
  };
};

const reducer: Reducer<State, Action> = (state, action): State => {
  switch (action.type) {
    case "SET_MODAL_OPENED":
      return {
        ...state,
        modalOpened: action.payload,
      };
    case "SET_VISIBLE_PROVIDERS":
      return {
        ...state,
        visibleProviders: action.payload,
      };
  }
};

function ProviderFilter({
  providers,
  activeProviders,
  setActiveProviders,
}: ProviderFilterProps) {
  const [state, dispatch] = useReducer(reducer, initialState, () =>
    initializeState(activeProviders)
  );

  const handleCloseModal = (providers: number[]) => {
    dispatch({ type: "SET_MODAL_OPENED", payload: false });
    dispatch({
      type: "SET_VISIBLE_PROVIDERS",
      payload: providers,
    });
    setActiveProviders(providers);
  };

  return (
    <>
      <div className="flex flex-wrap max-w-full gap-2 py-2">
        {state.visibleProviders &&
          providers
            .filter((provider: Provider) =>
              state.visibleProviders?.includes(provider.provider_id)
            )
            .map((provider: any) => (
              <button
                key={provider.provider_id}
                className="w-[48px] h-auto aspect-square"
                onClick={() =>
                  activeProviders.length > 1
                    ? setActiveProviders([provider.provider_id])
                    : setActiveProviders(state.visibleProviders)
                }
                style={{
                  opacity: activeProviders.includes(provider.provider_id)
                    ? "100%"
                    : "25%",
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w92/${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="rounded-xl"
                />
              </button>
            ))}
        <button
          className="rounded-xl border border-base-300 w-[48px] h-auto aspect-square"
          onClick={() => dispatch({ type: "SET_MODAL_OPENED", payload: true })}
        >
          <div className="flex justify-center items-center">
            <BsPlusLg />
          </div>
        </button>
      </div>
      <ProviderSelectionModal
        opened={state.modalOpened}
        handleClose={handleCloseModal}
        providers={providers}
        activeProviders={activeProviders}
      />
    </>
  );
}

export default ProviderFilter;
