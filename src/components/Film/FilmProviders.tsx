import { useEffect } from "react";
import {
  Provider,
  ProviderCountry,
} from "../../shared/interfaces/provider.interface";

const providerItems = (title: string, providers: Provider[]) => (
  <div className="flex flex-col">
    <h3 className="text-lg font-bold">{title}</h3>
    <div className="flex flex-wrap gap-2 py-4">
      {providers.map((provider: any) => (
        <div
          key={provider.provider_id}
          className="tooltip"
          data-tip={provider.provider_name}
        >
          <img
            src={`https://image.tmdb.org/t/p/w92/${provider.logo_path}`}
            alt={provider.provider_name}
            className="rounded-xl tooltip"
            data-tip={provider.provider_name}
            style={{ width: 50, height: 50 }}
          />
        </div>
      ))}
    </div>
  </div>
);

function FilmProviders({ providers }: { providers: ProviderCountry }) {
  useEffect(() => {
    console.log(providers);
  }, [providers]);
  return (
    <div className="flex flex-col mb-4 max-w-full overflow-hidden">
      <h2 className="text-2xl text-white font-semibold mb-4">Watch Now</h2>
      {providers?.flatrate?.length &&
        providerItems("Stream", providers["flatrate"])}
      {providers?.rent?.length && providerItems("Rent", providers.rent)}
      {providers?.buy?.length && providerItems("Buy", providers.buy)}
      <p className="text-sm text-right">
        Data provided by{" "}
        <a
          href="https://www.justwatch.com/"
          target="_blank"
          rel="noreferrer"
          className="text-neutral-content hover:opacity-80 hover:underline"
        >
          JustWatch
        </a>
      </p>
    </div>
  );
}

export default FilmProviders;
