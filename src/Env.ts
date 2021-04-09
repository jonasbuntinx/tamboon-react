declare const process: {
  env: {
    [key: string]: string;
  };
};

export const API_ENDPOINT = process.env.API_ENDPOINT;
