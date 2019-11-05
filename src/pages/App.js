import React from 'react';

import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

export default props => {
  return (
    <div className="d-f f-d-column jc-c ai-c">
      <Header />
      <div className="m-v-30">
        {props.children}
      </div>
      <Footer />
    </div>
  );
}