import React from "react";
import RotateLeft from "@material-ui/icons/RotateLeft";
import RotateRight from "@material-ui/icons/RotateRight";
import FlipHorizontal from "@material-ui/icons/Flip";
import FlipVertical from "@material-ui/icons/Flip";
import ZoomIn from "@material-ui/icons/ZoomIn";
import ZoomOut from "@material-ui/icons/ZoomOut";
import Crop169 from "@material-ui/icons/Crop169";
import Crop75 from "@material-ui/icons/Crop75";
import Crop54 from "@material-ui/icons/Crop54";
import Crop32 from "@material-ui/icons/Crop32";
import CropPortrait from "@material-ui/icons/CropPortrait";
import CropLandscape from "@material-ui/icons/CropLandscape";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  toolbar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#333",
    padding: "10px",
  },
  button: {
    color: "white",
    margin: "0 5px",
  },
}));

const Toolbar = ({
  setRotation,
  rotation,
  setZoom,
  zoom,
  setFlipH,
  flipH,
  setFlipV,
  flipV,
  setAspect,
  showCroppedImage,
  clearImage,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.toolbar}>
      <Tooltip title="Zoom In">
        <IconButton className={classes.button} onClick={() => setZoom(zoom + 0.1)}>
          <ZoomIn />
        </IconButton>
      </Tooltip>
      <Tooltip title="Zoom Out">
        <IconButton className={classes.button} onClick={() => setZoom(zoom - 0.1)}>
          <ZoomOut />
        </IconButton>
      </Tooltip>
      <Tooltip title="Rotate Left">
        <IconButton className={classes.button} onClick={() => setRotation(rotation - 90)}>
          <RotateLeft />
        </IconButton>
      </Tooltip>
      <Tooltip title="Rotate Right">
        <IconButton className={classes.button} onClick={() => setRotation(rotation + 90)}>
          <RotateRight />
        </IconButton>
      </Tooltip>
      <Tooltip title="Crop 16:9">
        <IconButton className={classes.button} onClick={() => setAspect(16 / 9)}>
          <Crop169 />
        </IconButton>
      </Tooltip>
      <Tooltip title="Crop 5:2">
        <IconButton className={classes.button} onClick={() => setAspect(5 / 2)}>
          <Crop75 />
        </IconButton>
      </Tooltip>
      <Tooltip title="Crop 7:6">
        <IconButton className={classes.button} onClick={() => setAspect(7 / 6)}>
          <Crop32 />
        </IconButton>
      </Tooltip>
      <Tooltip title="Crop 7:5">
        <IconButton className={classes.button} onClick={() => setAspect(7 / 5)}>
          <Crop54 />
        </IconButton>
      </Tooltip>
      <Tooltip title="Crop Portrait">
        <IconButton className={classes.button} onClick={() => setAspect(4 / 7)}>
          <CropPortrait />
        </IconButton>
      </Tooltip>
      <Tooltip title="Crop Landscape">
        <IconButton className={classes.button} onClick={() => setAspect(3 / 2)}>
          <CropLandscape />
        </IconButton>
      </Tooltip>
      <Button className={classes.button} onClick={showCroppedImage}>
        Show Result
      </Button>
      <Button className={classes.button} onClick={clearImage}>
        Clear
      </Button>
    </div>
  );
};

export default Toolbar;
