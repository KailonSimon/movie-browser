import { useRef, ChangeEvent, useState } from "react";
import { Checkbox, Modal, TextInput } from "@mantine/core";
import { AiOutlineSearch } from "react-icons/ai";
import { MdRemove } from "react-icons/md";
import { Provider } from "../../shared/interfaces/provider.interface";

type ProviderSelectionModalProps = {
  opened: boolean;
  handleClose: (providers: number[]) => void;
  providers: Provider[];
  activeProviders: number[];
};

function ProviderSelectionModal({
  opened,
  handleClose,
  providers,
  activeProviders,
}: ProviderSelectionModalProps) {
  const providersSearchContainer = useRef<HTMLDivElement>(null);
  const [searchInput, setSearchInput] = useState("");
  const [selectedProviders, setSelectedProviders] = useState(activeProviders);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    providersSearchContainer.current?.scrollTo(0, 0);
    setSearchInput(e.currentTarget.value);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => handleClose(selectedProviders)}
      centered
      classNames={{
        modal: "bg-base-100 rounded-xl",
      }}
      withCloseButton={false}
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl text-white font-bold">
          Your streaming services
        </h1>
        <div className="border border-base-300 min-h-[150px] flex flex-col gap-4 rounded-lg px-2 py-4">
          <TextInput
            classNames={{
              wrapper: "",
              input:
                "bg-transparent border-base-300 focus:border-neutral-content rounded-full text-white",
            }}
            value={searchInput}
            onChange={(e) => handleSearchInputChange(e)}
            placeholder="Search for your services"
            icon={
              <AiOutlineSearch size={16} className="fill-neutral-content" />
            }
          />

          <div className="w-full flex flex-wrap gap-3">
            {providers
              .filter((provider: Provider) =>
                selectedProviders?.includes(provider.provider_id)
              )
              .map((provider: Provider) => (
                <button
                  key={provider.provider_id}
                  className="w-[38px] relative"
                  onClick={() =>
                    setSelectedProviders(
                      selectedProviders.filter(
                        (providerID: number) =>
                          providerID !== provider.provider_id
                      )
                    )
                  }
                >
                  <img
                    src={`http://image.tmdb.org/t/p/w92/${provider.logo_path}`}
                    alt={provider.provider_name}
                    className="rounded-lg"
                  />
                  <div className="bg-primary-focus absolute -top-1 -right-1 rounded-full">
                    <MdRemove size={12} />
                  </div>
                </button>
              ))}
          </div>

          <div
            className="flex flex-col gap-2 h-[calc(100vh-25rem)] overflow-y-scroll pr-2"
            ref={providersSearchContainer}
          >
            {providers.filter((providers: Provider) =>
              providers.provider_name
                .toLowerCase()
                .includes(searchInput.toLocaleLowerCase())
            ).length ? (
              providers
                .filter((providers: Provider) =>
                  providers.provider_name
                    .toLowerCase()
                    .includes(searchInput.toLocaleLowerCase())
                )
                .map((provider: Provider) => (
                  <button
                    key={provider.provider_id}
                    className="flex items-center justify-between w-full rounded-xl p-4 bg-base-200 hover:bg-base-300"
                    onClick={() =>
                      selectedProviders?.includes(provider.provider_id)
                        ? setSelectedProviders(
                            selectedProviders.filter(
                              (providerID: number) =>
                                providerID !== provider.provider_id
                            )
                          )
                        : setSelectedProviders([
                            ...selectedProviders,
                            provider.provider_id,
                          ])
                    }
                  >
                    <div className="inline-flex items-center gap-4">
                      <img
                        src={`http://image.tmdb.org/t/p/w92/${provider.logo_path}`}
                        alt={provider.provider_name}
                        className="w-[38px] rounded-lg"
                      />
                      <span className="text-white text-left">
                        {provider.provider_name}
                      </span>
                    </div>
                    <Checkbox
                      radius="xl"
                      size="lg"
                      classNames={{
                        root: "pointer-events-none",
                        input:
                          "bg-base-100 border-base-300 checked:bg-neutral-content checked:border-neutral-content !text-red-700",
                        icon: "!text-base-100",
                      }}
                      checked={selectedProviders?.includes(
                        provider.provider_id
                      )}
                      readOnly
                    />
                  </button>
                ))
            ) : (
              <span className="text-white text-center">
                No matching services
              </span>
            )}
          </div>
        </div>
        <button
          className="bg-neutral-content px-2 py-2 rounded-lg font-bold"
          onClick={() => handleClose(selectedProviders)}
        >
          Done
        </button>
      </div>
    </Modal>
  );
}

export default ProviderSelectionModal;
