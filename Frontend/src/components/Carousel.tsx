import React from 'react';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  height: 600,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  background: '#364d79',
};

const imageStyle: React.CSSProperties = {
  height: 600,
  width: 1904,
  display: 'block',
  margin: 'auto',
};

const App: React.FC = () => (
  <Carousel autoplay >
    <div style={contentStyle}>
      <img
        src={"https://anniehaydesign.weebly.com/uploads/9/5/4/6/95469676/landscape-poster-2_orig.jpg"}
        style={imageStyle}
        alt="Image"
      />
    </div>
    <div style={contentStyle}>
      <img
        src={"https://lh6.googleusercontent.com/B0uQRPzgf2AX6EVvlqNWwV7ql2-TbAuWbJcnkHuC_uzEtG0viA6__4_v-bfdas4iM8MqIm8wcoDeaLRxugVFycbVvaelnagmzAsH9-ug-y0X2BxvEjFfhavM_fvWHDEnNKBFamG9=s0"}
        style={imageStyle}
        alt="Image"
      />
    </div>
    <div style={contentStyle}>
      <img
        src={"https://img.englishcinemakyiv.com/PGmsR25cpQmqcPzsg786xUtN82-aqDdjWzjxYeprAXE/resize:fill:800:450:1:0/gravity:sm/aHR0cHM6Ly9leHBhdGNpbmVtYXByb2QuYmxvYi5jb3JlLndpbmRvd3MubmV0L2ltYWdlcy85ZWNlOWY2OS0wYzJhLTQxNTMtYWE3Zi1lMjIxM2YzZTFjNzMuanBn.jpg"}
        style={imageStyle}
        alt="Image"
      />
    </div>
    <div style={contentStyle}>
      <img
        src={"https://w0.peakpx.com/wallpaper/963/910/HD-wallpaper-tenet-movie-2020-high-quality-poster.jpg"}
        style={imageStyle}
        alt="Image"
      />
    </div>
  </Carousel>
);

export default App;
