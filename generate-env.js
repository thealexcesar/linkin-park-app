const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const envConfig = `export const environment = {
  production: false,
  spotifyClientId: '${process.env.SPOTIFY_CLIENT_ID}',
  spotifyRedirectUri: '${process.env.SPOTIFY_REDIRECT_URI}'
};`;

fs.writeFileSync('./src/environments/environment.ts', envConfig);
