import { FaTwitter, FaInstagram, FaFacebookF, FaImdb } from "react-icons/fa";
import { SiWikidata } from "react-icons/si";

function PersonSocials({ externalIds }: any) {
  return (
    <div className="flex gap-2 mt-4">
      {externalIds.twitter_id ? (
        <a
          role="button"
          className="btn p-3 bg-[#1DA1F2] hover:bg-[#1DA1F2] hover:opacity-80 hover:scale-105"
          href={`https://twitter.com/${externalIds.twitter_id}`}
          target="_blank"
          rel="noreferrer"
        >
          <FaTwitter size="20" color="#fff" />
        </a>
      ) : null}
      {externalIds.facebook_id ? (
        <a
          role="button"
          className="btn p-3 bg-[#4267B2] hover:bg-[#4267B2] hover:opacity-80 hover:scale-105"
          href={`https://facebook.com/${externalIds.facebook_id}`}
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebookF size="20" color="#fff" />
        </a>
      ) : null}
      {externalIds.instagram_id ? (
        <a
          role="button"
          className="btn p-3 bg-black hover:bg-black hover:opacity-80 hover:scale-105"
          href={`https://instagram.com/${externalIds.instagram_id}`}
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram size="20" color="#fff" />
        </a>
      ) : null}
      {externalIds.imdb_id ? (
        <a
          role="button"
          className="btn p-0 border-none bg-black hover:opacity-80 hover:scale-105"
          href={`https://imdb.com/name/${externalIds.imdb_id}`}
          target="_blank"
          rel="noreferrer"
        >
          <FaImdb size="48" color="#f3ce13" />
        </a>
      ) : null}
      {externalIds.wikidata_id ? (
        <a
          role="button"
          className="btn p-3 border-none bg-white hover:bg-white hover:opacity-80 hover:scale-105"
          href={`https://wikidata.org/wiki/${externalIds.wikidata_id}`}
          target="_blank"
          rel="noreferrer"
        >
          <SiWikidata size="20" color="#000" />
        </a>
      ) : null}
    </div>
  );
}

export default PersonSocials;
