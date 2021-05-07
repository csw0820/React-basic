import { useEffect, useState } from 'react';
import styles from './app.module.css';
import SearchHeader from './components/search_header/search_header';
import Videodetail from './components/video_detail/video_detail';
import VideoList from './components/video_list/video_list';

function App({ youtube }) {
  const [videos, setVideos] = useState([]); //state(초기 목록)
  const [selectedVideo, setSelectiedVideo] = useState(null);

  const selectVideo = (video) => {
    setSelectiedVideo(video);
  };
  const search = (query) => {
    youtube //
      .search(query)
      .then((videos) => {
        setVideos(videos);
        setSelectiedVideo(null);
      });
  };

  useEffect(() => {
    youtube //
      .mostPopular()
      .then((videos) => setVideos(videos));
  }, [youtube]);
  return (
    <div className={styles.App}>
      <SearchHeader onSearch={search} />
      <section className={styles.content}>
        {selectedVideo && (
          <div className={styles.detail}>
            <Videodetail video={selectedVideo} />
          </div>
        )}
        <div className={styles.list}>
          <VideoList videos={videos} onVideoClick={selectVideo} display={selectedVideo ? 'list' : 'grid'} />
        </div>
      </section>
    </div>
  );
}

export default App;
