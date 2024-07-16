import React, { useState } from "react";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { getOrientation } from "get-orientation/browser";
import ImgDialog from "./ImgDialog";
import { getCroppedImg, getRotatedImage } from "../utils/canvasUtils";
import Toolbar from "../components/Toolbar";
import { Button } from "@material-ui/core";

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90,
};

const App = ({ classes }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState(4 / 4);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation,
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const onClose = () => {
    setCroppedImage(null);
  };

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      try {
        // apply rotation if needed
        const orientation = await getOrientation(file);
        const rotation = ORIENTATION_TO_ANGLE[orientation];
        if (rotation) {
          imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
        }
      } catch (e) {
        console.warn("failed to detect the orientation");
      }

      setImageSrc(imageDataUrl);
    }
  };

  const clearImage = () => {
    setImageSrc(null);
    setCroppedImage(null);
  };

  return (
    <div>
      {imageSrc ? (
        <React.Fragment>
          <div className={{}}>
            <Cropper
              image={imageSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          
          <div className="absolute bottom-0 w-full p-5 text-center bg-black text-white toolbarWrap">
          <Toolbar
            setRotation={setRotation}
            rotation={rotation}
            setZoom={setZoom}
            zoom={zoom}
            setAspect={setAspect}
            showCroppedImage={showCroppedImage}
            clearImage={clearImage}
          />
            <Typography
              variant="overline"
              classes={{ root: "" }}
            >
              Resize
            </Typography>
            <Slider
              value={aspect}
              min={0.1}
              max={10.10}
              step={0.1}
              aria-labelledby="Resize"
              classes={{ root: "" }}
              onChange={(e, aspect) => setAspect(aspect)}
            />
          </div>
          <ImgDialog img={croppedImage} onClose={onClose} />
        </React.Fragment>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Button
            variant="contained"
            color="primary"
            onClick={() => document.getElementById("fileInput").click()}
          >
            Upload Image
          </Button>
          <input
            type="file"
            id="fileInput"
            onChange={onFileChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>
      )}
    </div>
  );
};

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export default App
