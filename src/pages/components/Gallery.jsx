import React, { useState, useEffect, useRef } from "react";
import { BiSolidCheckboxChecked } from "react-icons/bi"; // Import the checkbox icon
import { images } from "../../utils/images";

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState(() => {
    const storedImages = localStorage.getItem("galleryImages");
    return storedImages ? JSON.parse(storedImages) : images;
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Load selected images from local storage when the component mounts
    const storedSelectedImages =
      JSON.parse(localStorage.getItem("selectedImages")) || [];
    setSelectedImages(storedSelectedImages);
  }, []);

  const saveImagesToLocalStorage = (images) => {
    localStorage.setItem("galleryImages", JSON.stringify(images));
  };

  const saveSelectedImagesToLocalStorage = (selectedImages) => {
    localStorage.setItem("selectedImages", JSON.stringify(selectedImages));
  };

  const handleDragStart = (e, src) => {
    e.dataTransfer.setData("text/plain", src);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, src) => {
    e.preventDefault();
    const draggedSrc = e.dataTransfer.getData("text/plain");
    const draggedIndex = galleryImages.findIndex(
      (img) => img.src === draggedSrc
    );
    const targetIndex = galleryImages.findIndex((img) => img.src === src);

    // Check the targetIndex's featured value
    const targetFeatured = galleryImages[targetIndex].featured;
    if (targetFeatured) {
      // If the target is featured, set the dragged element's featured value to true
      galleryImages[draggedIndex].featured = true;
      galleryImages[targetIndex].featured = false;
    }

    const newGalleryImages = [...galleryImages];
    const temp = newGalleryImages[draggedIndex];
    newGalleryImages[draggedIndex] = newGalleryImages[targetIndex];
    newGalleryImages[targetIndex] = temp;

    setGalleryImages(newGalleryImages);
    saveImagesToLocalStorage(newGalleryImages);
  };

  const handleImageClick = (image) => {
    if (selectedImages.includes(image.id)) {
      setSelectedImages(selectedImages.filter((id) => id !== image.id));
    } else {
      setSelectedImages([...selectedImages, image.id]);
    }
    saveSelectedImagesToLocalStorage(selectedImages);
  };

  const handleDeleteSelected = () => {
    const newGalleryImages = galleryImages.filter(
      (image) => !selectedImages.includes(image.id)
    );
    setGalleryImages(newGalleryImages);
    setSelectedImages([]);
    saveImagesToLocalStorage(newGalleryImages);
    saveSelectedImagesToLocalStorage([]);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImageSrc = e.target.result;
        const newImage = {
          id: galleryImages.length + 1, // Generate a unique ID
          src: newImageSrc,
          alt: "Uploaded Image",
          featured: false,
        };
        setNewImage(newImage);
        saveImagesToLocalStorage([...galleryImages, newImage]);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if (newImage) {
      setGalleryImages([...galleryImages, newImage]);
      setNewImage(null);
    }
  }, [newImage, galleryImages]);
  return (
    <div className="my-16 ">
      {selectedImages.length > 0 && (
        <div className="flex justify-around border-b-2 mb-5">
          {
            <h2 className="text-2xl font-semibold mb-3">
              {`${selectedImages.length} `} Files Selected
            </h2>
          }
          <div onClick={handleDeleteSelected}>
            <h2 className="text-xl font-bold text-red-600 cursor-pointer hover:underline">
              Delete Selected Files
            </h2>
          </div>
        </div>
      )}

      <div className="px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className={`
                cursor-grabbing
                w-full
                rounded-2xl
                border-2
                relative
                ${
                  image &&
                  image.featured &&
                  "row-start-1 col-start-1 col-end-3 lg:row-start-1 lg:col-start-1 lg:row-end-3 lg:col-end-3 md:row-start-1 md:col-start-1 md:row-end-3 md:col-end-3"
                }
                ${selectedImages.includes(image.id) ? "selected" : ""}
                `}
              draggable="true"
              onDragOver={handleDragOver}
              onDragStart={(e) => handleDragStart(e, image.src)}
              onDrop={(e) => handleDrop(e, image.src)}
              onClick={() => handleImageClick(image)}
            >
              {image && (
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full rounded-2xl"
                />
              )}
              {selectedImages.includes(image.id) && (
                <div className="absolute top-0 right-0 mt-1 mr-1">
                  <BiSolidCheckboxChecked className="text-blue-500 text-2xl" />
                </div>
              )}
            </div>
          ))}
          <div className="w-full h-full rounded-2xl border-2">
            <button
              className="w-full h-full p-6 text-xl text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              Upload Image
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
