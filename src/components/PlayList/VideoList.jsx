import Video from "./Video";

const videoIds = ["08PZUqHAYEw", "vLU6yrn0WO8", "T15a7NclsZw", "YK3bzsZhPwI"];

export default function VideoList() {
  return (
    <>
      {videoIds.map((item) => (
        <Video id={item}></Video>
      ))}
    </>
  );
}
