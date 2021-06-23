import React from 'react';
import PropTypes from 'prop-types';

const embeddedURL = (videoId) => {
  // eslint-disable-next-line no-param-reassign
  videoId = encodeURIComponent(videoId);
  return new URL(`https://www.youtube-nocookie.com/embed/${videoId}`);
};

const YoutubeFrame = ({
  allow,
  allowFullScreen,
  className,
  frameBorder,
  title,
  videoId,
}) => {
  if (!videoId) {
    return <p className="text-xl">Sorry, there is no video available.</p>;
  }
  return (
    <iframe
      className={className}
      title={title}
      src={embeddedURL(videoId)}
      frameBorder={frameBorder}
      allow={allow}
      allowFullScreen={allowFullScreen}
    />
  );
}; // YoutubeFrame

YoutubeFrame.propTypes = {
  videoId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  frameBorder: PropTypes.string,
  allow: PropTypes.string,
  allowFullScreen: PropTypes.bool,
};

YoutubeFrame.defaultProps = {
  className: 'youtube-embedded',
  frameBorder: '0',
  allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
  allowFullScreen: true,
};

export default YoutubeFrame;
