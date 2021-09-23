import React from "react";
import { Box, Grid, Image } from "@chakra-ui/react";

export interface PhotoItem {
  id: string;
  src: string;
}

export interface PhotosProps {
  photosList?: PhotoItem[];
  onPhotoClick?: (photo: PhotoItem) => void;
}

const Photos = ({ photosList, onPhotoClick }: PhotosProps) => {
  const onClick = (photo: PhotoItem) => {
    if (onPhotoClick) {
      onPhotoClick(photo);
    }
  };
  const photoItems = (photosList || []).map((photo, key) => {
    return (
      <Box
        key={key}
        w="100%"
        h="88px"
        onClick={() => onClick(photo)}
        cursor={"pointer"}
      >
        <Image src={photo.src} borderRadius="6px" />
      </Box>
    );
  });
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={3} width="100%">
      {photoItems}
    </Grid>
  );
};
export default Photos;
