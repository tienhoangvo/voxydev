// @mui/material
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";

// @react
import { useCallback } from "react";

// @src/lib/sanity/
import urlFor from "../../lib/sanity/urlFor";

const BlockImage = ({ source, caption, attribution, position }) => {
  const alignImage = useCallback(() => {
    switch (position) {
      case "left": {
        return "flex-start";
      }

      case "right": {
        return "flex-end";
      }

      case "stretch": {
        return "stretch";
      }
      default: {
        return "center";
      }
    }
  }, [position]);

  return (
    <Card
      elevation={0}
      sx={{ bgcolor: (theme) => theme.palette.background.primary }}
    >
      <CardMedia
        component="img"
        src={urlFor(source).width(700).fit("max").url()}
        alt={caption}
        title={caption}
        sx={{
          width: "100%",
        }}
      />
      <CardHeader
        title={caption}
        subheader={attribution}
        titleTypographyProps={{ sx: { fontSize: ".875rem" } }}
        subheaderTypographyProps={{ fontSize: ".7rem" }}
      />
    </Card>
  );
};

export default BlockImage;
