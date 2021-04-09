declare const process: {
  env: {
    [key: string]: string;
  };
};

export const API_ENDPOINT = process.env.API_ENDPOINT;

export const IMAGES_ENDPOINT = process.env.IMAGES_ENDPOINT;
