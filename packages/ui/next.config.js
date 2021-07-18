/* eslint-disable no-console, @typescript-eslint/no-var-requires */
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

const BASE_PATH = '/deno-playground';

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`);

  const env = {
    API_URL: (() => {
      if (isDev) {
        return 'http://localhost:3000/api';
      }
      return 'https://deno-playground-api.vercel.app/api';
    })(),
  };

  // next.config.js object
  return {
    basePath: isDev ? undefined : `${BASE_PATH}`,
    assetPrefix: isDev
      ? undefined
      : `https://deno-playground.peterbartha.com${BASE_PATH}`,
    env,

    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: { and: [/\.(js|ts|md)x?$/] },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: { plugins: [{ removeViewBox: false }] },
              titleProp: true,
            },
          },
        ],
      });

      return config;
    },
  };
};
