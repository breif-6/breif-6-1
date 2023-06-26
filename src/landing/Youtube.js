import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';

const API = 'AIzaSyCSvv-KiRO2XiJGYpAKL5BtksBGvuxS0jg';
const channelId = 'UCSTBpjukawEv6ZUmH6l-ibw';
const fetchUrl = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelId}&part=snippet,id&order=date&maxResults=1`;
// https://www.googleapis.com/youtube/v3/search?key=AIzaSyCSvv-KiRO2XiJGYpAKL5BtksBGvuxS0jg&channelId=UCSTBpjukawEv6ZUmH6l-ibw&part=snippet,id&order=date&maxResults=1
const VideoContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  marginTop: '24px',
});

const VideoTitle = styled(Typography)({
  fontWeight: 'bold',
});

const Youtube = () => {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    axios
      .get(fetchUrl)
      .then((response) => {
        const resJson = response.data;
        if (resJson.items.length > 0) {
          const videoItem = resJson.items[0];
          const videoLink = `https://www.youtube.com/embed/${videoItem.id.videoId}`;
          const videoTitle = videoItem.snippet.title;
          setVideo({ videoLink, videoTitle });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <VideoContainer>
      {video && (
        <div>
          <iframe
            width="560"
            height="315"
            src={video.videoLink}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <VideoTitle variant="h6" component="p">{video.videoTitle}</VideoTitle>
        </div>
      )}
    </VideoContainer>
  );
};

export default Youtube;
