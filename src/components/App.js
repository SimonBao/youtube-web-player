import React, { Component } from "react";
import youtube from "../components/api/youtube";
import SearchBar from "./SearchBar";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import "../css/App.css";
import dotenv from "dotenv";
import VideoItem from "./VideoItem";
dotenv.config();

class App extends Component {
  state = { videos: [], selectedVideo: null, displayModeChange: true };

  componentDidMount() {
    this.onTermSubmit("radiohead");
  }

  onTermSubmit = async (term) => {
    const response = await youtube.get("/search", {
      params: { q: term },
    });

    this.setState({
      videos: response.data.items,
      selectedVideo: null,
    });
  };

  toggleDisplayMode = () => {
    if (this.state.displayModeChange) {
      document.querySelector("#root").classList.add("darkmode");
      document.querySelector(".search-bar").classList.add("darkmode");
      document.querySelector(".ui.action.input").classList.add("darkmode");
    } else {
      document.querySelector("#root").classList.remove("darkmode");
      document.querySelector(".search-bar").classList.remove("darkmode");
      document.querySelector(".ui.action.input").classList.remove("darkmode");
    }
    this.setState({ displayModeChange: !this.state.displayModeChange });
  };

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  render() {
    const videoGrid = () => {
      return this.state.videos.map((video) => {
        console.log(video);
        return (
          <VideoItem
            key={video.id.videoId}
            video={video}
            onVideoSelect={this.onVideoSelect}
            addClass={"video-item__homepage four wide column"}
          />
        );
      });
    };
    return (
      <div>
        <SearchBar
          onTermSubmit={this.onTermSubmit}
          toggleDisplayMode={this.toggleDisplayMode}
        />
        <div className="ui container">
          <div className="ui grid">
            <div className="ui row">
              {this.state.selectedVideo ? (
                <>
                  <div className="eleven wide column">
                    {this.state.selectedVideo && (
                      <VideoDetail video={this.state.selectedVideo} />
                    )}
                  </div>
                  <div className="five wide column related_videos__container">
                    <VideoList
                      videos={this.state.videos}
                      onVideoSelect={this.onVideoSelect}
                    />
                  </div>
                </>
              ) : (
                <div className="sixteen wide ui grid video-grid">
                  {videoGrid()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
