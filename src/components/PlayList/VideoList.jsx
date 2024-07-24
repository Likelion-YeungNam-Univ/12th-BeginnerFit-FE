import Video from "./Video";

export default function VideoList({ videoIds }) {
  return (
    <>
      {videoIds.map((item) => (
        <Video id={item.videoYoutubeId} key={item.id} videoId={item.id}></Video>
      ))}
    </>
  );
}
