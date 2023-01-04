const providerItems = (title: string, providers: []) => (
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

function FilmProviders({ providers }: any) {
  return (
    <div className="flex flex-col mb-4">
      <h2 className="text-2xl text-white font-semibold mb-4">Watch Now</h2>
      {providers?.flatrate?.length > 0 &&
        providerItems("Stream", providers.flatrate)}
      {providers?.rent?.length > 0 && providerItems("Rent", providers.rent)}
      {providers?.buy?.length > 0 && providerItems("Buy", providers.buy)}
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
