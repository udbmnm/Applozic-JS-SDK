import React, { SyntheticEvent } from 'react';
import { Grid } from '@giphy/react-components';
import { IGif, IImage } from '@giphy/js-types';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Image } from '@chakra-ui/react';
import { getFileBlobFromUrl } from '../../utils/file';
export interface GiphyGridOptions {
  giphyApiKey: string;
  searchText: string;
  onGifClick?: (gif: File) => void;
}

const getGifUrl = (gif: IGif): string => {
  let images = Object.keys(gif.images).map(
    key => JSON.parse(JSON.stringify((gif.images as any)[key])) as IImage
  );

  let gifImages: IImage[] = [];
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    if (image.url) {
      gifImages.push(image);
    }
  }

  gifImages = gifImages.sort((a, b) => b.height - a.height);
  if (gifImages.length > 0) {
    return gifImages[0].url;
  }

  const others = images
    .filter(image => !image.url.indexOf('.gif?'))
    .sort((a, b) => b.height - a.height);
  return others[0].url;
};

const getGiphyClient = (apiKey: string) => new GiphyFetch(apiKey);

const GriphySearchGrid = ({
  giphyApiKey,
  searchText,
  onGifClick
}: GiphyGridOptions) => {
  const fetchGifs = (offset: number) =>
    getGiphyClient(giphyApiKey).search(searchText, { offset, limit: 30 });

  const onClick = async (gif: IGif, e: SyntheticEvent<HTMLElement, Event>) => {
    e.preventDefault();
    const gifUrl = getGifUrl(gif);
    try {
      const file = await getFileBlobFromUrl(gifUrl);
      if (onGifClick) {
        onGifClick(file);
      }
    } catch (e) {}

    console.log('GIPHY Result', gif);
  };
  return (
    <div>
      <div
        style={{
          width: '100%',
          background: '#000',
          borderRadius: '4px',
          paddingLeft: '10px',
          marginBottom: '10px'
        }}
      >
        <Image
          src={
            'https://uploads.codesandbox.io/uploads/user/ce4856ba-2d28-467b-98d7-427cebc27616/ZZBX-logo.gif'
          }
        />
      </div>
      <div style={{ overflowY: 'auto', height: '242px', marginLeft: '10px' }}>
        <Grid
          width={275}
          hideAttribution={true}
          onGifClick={onClick}
          fetchGifs={fetchGifs}
          columns={3}
          gutter={6}
        />
      </div>
    </div>
  );
};

export default GriphySearchGrid;
