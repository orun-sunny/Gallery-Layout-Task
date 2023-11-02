import React from "react";

function Header({ selectedImages, handleDelete }) {
  const isAnyImageSelected = selectedImages.length > 0;

  const labelStyle = "flex items-center";

  return (
    <nav className="border-b-2   z-30 bg-blue-50 ">
      <h1 className="my-8 ms-8 font-semibold text-xl">
        {isAnyImageSelected ? (
          <label className={labelStyle}>
            <input
              type="checkbox"
              checked={isAnyImageSelected}
              readOnly
              className="w-5 h-4 mr-2"
            />
            {selectedImages.length} Files Selected
          </label>
        ) : (
          "Gallery -task"
        )}
      </h1>
      {isAnyImageSelected && (
        <button
          className="md:absolute top-8 right-8 text-red-500 font-semibold text-xl ms-8 hover:underline "
          onClick={handleDelete}
        >
          Delete files
        </button>
      )}
    </nav>
  );
}

export default Header;
