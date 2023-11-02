import React from "react";
import ImageItem from "./ImageItem";
import AddImage from "./AddImage";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function Gallery({
  images,
  selectedImages,
  handleImageSelect,
  setIsDeleteButtonVisible,
  setImages,
}) {
  // Function to handle image upload
  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImage = {
        id: images.length + 1,
        url: URL.createObjectURL(file),
        isFeatured: true,
      };
      setImages([...images, newImage]);
    }
  };

  // Function to handle image reorderd
  const handleImageReorder = (draggedImageId, targetImageId) => {
    const updatedImages = [...images];
    const draggedIndex = updatedImages.findIndex(
      (image) => image.id === +draggedImageId
    );
    const targetIndex = updatedImages.findIndex(
      (image) => image.id === +targetImageId
    );

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const [draggedImage] = updatedImages.splice(draggedIndex, 1);
      updatedImages.splice(targetIndex, 0, draggedImage);

      setImages(updatedImages);
    }
  };

  //auto animated hook
  const [parent] = useAutoAnimate();

  return (
    <div className="mx-auto p-4">
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        ref={parent}
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`${
              index === 0
                ? "row-start-1 col-start-1 col-end-3 lg:row-start-1 lg:col-start-1 lg:row-end-3 lg:col-end-3 md:row-start-1 md:col-start-1 md:row-end-3 md:col-end-3"
                : "md:col-span-1"
            }`}
          >
            <ImageItem
              image={image}
              isSelected={selectedImages.includes(image.id)}
              onImageSelect={handleImageSelect}
              onReorder={handleImageReorder}
              setIsDeleteButtonVisible={setIsDeleteButtonVisible}
              index={index}
            />
          </div>
        ))}
        <AddImage handleUploadImage={handleUploadImage} />
      </div>
    </div>
  );
}

export default Gallery;
