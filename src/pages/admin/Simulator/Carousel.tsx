import React, {useState} from "react";

const noImage = '/noimage.jpg';
const fr = new FileReader();

const Carousel = (props: any) => {
  const { event } = props;
  const [images, setImages] = useState([]);

  if (event.pictures.length > 0) {
    if (images.length === 0) {
      const p = event.pictures[0];
      fr.readAsDataURL(p);
      fr.onloadend = () => {
        // @ts-ignore
        setImages([fr.result]);
      }
    }
  } else {
    if (images.length > 0) setImages([]);
  }

  return (
    <div>
      <img key={'carrousel'} src={`${(images.length !== 0) ? images : noImage}`} width={"100%"} height={"170px"}  alt={"carousel"}/>
    </div>
  );
}

export default Carousel;