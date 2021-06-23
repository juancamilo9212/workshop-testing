import React from 'react';

const POWERED_BY_THEMOVIEDB_LOGO = 'https://www.themoviedb.org/assets/2/v4/logos/powered-by-rectangle-green-dcada16968ed648d5eb3b36bbcfdd8cdf804f723dcca775c8f2bf4cea025aad6.svg';

// eslint-disable-next-line arrow-body-style
const AppFooter = () => {
  return (
    <footer className="w-full p-5 flex items-center text-white bg-black-fade-up">
      <p className="flex-1">&nbsp;</p>
      <a className="px-3" href="https://www.themoviedb.org">
        <img className="w-1/2 mx-auto" src={POWERED_BY_THEMOVIEDB_LOGO} alt="Powered by The Movie DB" />
      </a>
      <ul className="flex-1 text-right">
        <li>
          <a
            className="px-2"
            href="https://www.themoviedb.org/terms-of-use"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of use
          </a>
        </li>
        <li>
          <a
            className="px-2"
            href="https://www.themoviedb.org/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy policy
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default AppFooter;
