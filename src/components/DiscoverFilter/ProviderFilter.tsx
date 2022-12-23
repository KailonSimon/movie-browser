import { Reducer, useReducer } from "react";
import { BsPlusLg } from "react-icons/bs";
import ProviderSelectionModal from "./ProviderSelectionModal";

export type Provider = {
  display_priorities: any;
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
};

type State = {
  modalOpened: boolean;
  visibleProviders: number[];
};

type Action =
  | { type: "SET_MODAL_OPENED"; payload: boolean }
  | { type: "SET_VISIBLE_PROVIDERS"; payload: number[] };

interface ProviderMultiSelectProps
  extends React.ComponentPropsWithoutRef<"div"> {
  providers: Provider[];
  activeProviders: number[];
  setActiveProviders: (value: number[]) => void;
}

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
}: ProviderMultiSelectProps) {
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
                  src={`http://image.tmdb.org/t/p/w92/${provider.logo_path}`}
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
