import React from "react";
import "../css/VideoItem.css";

const VideoItem = ({ video, onVideoSelect, addClass }) => {
  return (
    <div
      className={`video-item item ${addClass ? addClass : ""}`}
      onClick={() => onVideoSelect(video)}
    >
      <img
        className="ui image"
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.title}
      />
      <div className="content">
        <div className="header">{video.snippet.title}</div>
      </div>
    </div>
  );
};

export default VideoItem;
