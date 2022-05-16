import React from 'react';
import ReactDOM from 'react-dom/client';

import VerticalCarousel from './VerticalCarousel';

import data from './data.json';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VerticalCarousel data={data.slides} leadingText={data.leadingText} />
  </React.StrictMode>
);
