import React from 'react';

import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

export default props => {
  return (
    <div className="d-f f-d-column jc-sb ai-c h-100">
      <div className="d-f f-d-column jc-c ai-c w-100">
        <Header />
        <div className="d-f jc-c ai-c w-100">
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  );
}