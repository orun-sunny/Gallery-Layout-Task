import React, { useState } from "react";
import Header from "../Header";
import Gallery from "../Gallery";

function Home() {
  const [images, setImages] = useState([
    { id: 1, url: "images/image-1.webp" },
    { id: 2, url: "images/image-2.webp" },
    { id: 3, url: "images/image-3.webp" },
    { id: 4, url: "images/image-4.webp" },
    { id: 5, url: "images/image-5.webp" },
    { id: 6, url: "images/image-6.webp" },
    { id: 7, url: "images/image-7.webp" },
    { id: 8, url: "images/image-8.webp" },
    { id: 9, url: "images/image-9.webp" },
    { id: 10, url: "images/image-10.jpeg" },
    { id: 11, url: "images/image-11.jpeg" },
  ]);

  const [selectedImages, setSelectedImages] = useState([]);
  const [, setIsDeleteButtonVisible] = useState(false);

  // Function to handle image selection
  const handleImageSelect = (image) => {
    if (selectedImages.includes(image.id)) {
      setSelectedImages(selectedImages.filter((id) => id !== image.id));
    } else {
      setSelectedImages([...selectedImages, image.id]);
    }
  };

  // Function to handle image deletion
  const handleDelete = () => {
    const updatedImages = images.filter(
      (image) => !selectedImages.includes(image.id)
    );
    setImages(updatedImages);
    setSelectedImages([]);
    setIsDeleteButtonVisible(false);
  };

  return (
    <div>
      {/* <Navbar></Navbar> */}
      <Header selectedImages={selectedImages} handleDelete={handleDelete} />
      <Gallery
        images={images}
        selectedImages={selectedImages}
        handleImageSelect={handleImageSelect}
        setIsDeleteButtonVisible={setIsDeleteButtonVisible}
        setImages={setImages}
      />
    </div>
  );
}

export default Home;
