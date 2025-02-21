// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   env : {
//      REACT_APP_AUTH_KEY: '544bf6c970bf592a97316bf56d223ea0f5130595',
//       REACT_APP_ID: '26924797836886aa',
//       REACT_APP_AGENT_ID: 1,
//       REACT_APP_REGION: 'in' ,
//       REACT_APP_W1: '76540d52-8b40-45ab-b083-cc3bd6f07d6b',
//       REACT_APP_W2:1 ,
//       API_PATH: 'http://127.0.1:8083'
//
//   }
// };
//
// module.exports = nextConfig;
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env : {
    API_PATH : "http://127.0.0.1:8084"
  }

}

module.exports = nextConfig