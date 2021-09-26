import React, { Component } from "react";
import youtube from "../components/api/youtube";
import SearchBar from "./SearchBar";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import "../css/App.css";
import dotenv from "dotenv";
dotenv.config();

class App extends Component {
  state = { videos: [], selectedVideo: null };

  componentDidMount() {
    this.onTermSubmit("vim");
  }

  onTermSubmit = async (term) => {
    const response = await youtube.get("/search", {
      params: { q: term },
    });

    console.log(response);

    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });
  };

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  render() {
    return (
      <div>
        <SearchBar onTermSubmit={this.onTermSubmit} />
        <div className="ui container">
          <div className="ui grid">
            <div className="ui row">
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
