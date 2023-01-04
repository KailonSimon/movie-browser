import { Video } from "../../shared/interfaces/video.interface";

function FilmVideos({
  videos,
  isLoading,
}: {
  videos?: Video[];
  isLoading?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl text-white font-semibold mb-4">Videos</h2>
      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 min-h-[8rem]">
        {!!videos && !isLoading
          ? videos.map((video, index) => (
              <div
                key={video.key}
                className="relative overflow-hidden w-full pt-[56.25%] rounded
            "
              >
                <iframe
                  className="absolute top-0 bottom-0 left-0 right-0 w-full h-full"
                  title={video.name}
                  src={`https://www.youtube.com/embed/${video.key}`}
                  allowFullScreen
                />
              </div>
            ))
          : [...Array(4)].map((item, index) => (
              <div
                className="aspect-video bg-base-300 rounded animate-pulse"
                key={index}
              />
            ))}
      </div>
    </div>
  );
}

export default FilmVideos;
