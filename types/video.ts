export type VideoItemType = {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      default: {
        url: string;
      }
    }
    description: string;
    channelTitle: string;
  };
};