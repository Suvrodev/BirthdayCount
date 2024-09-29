import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const images = [
  "https://i.ibb.co/Tt8g6tH/premium-photo-1663839412026-51a44cfadfb8.jpg",
  "https://i.ibb.co/0r8Yz0c/birthday-2611564-1280.jpg",
  "https://i.ibb.co/cLrpyXj/maxresdefault.jpg",
  "https://i.ibb.co/sq3nXnD/thumb-1920-1345708.png",
  "https://i.ibb.co/ZcnfMWk/birthday-celebration-pictures-nzdifqhivh56h19i.jpg",
  "https://i.ibb.co/qMHRKYD/happy-birthday-card-field-mice-2-11392-p.jpg",
  "https://i.ibb.co/NpyHZP2/postcard-text-happy-birthday-all-us-314262337.webp",
  "https://i.ibb.co.com/BNVdDS1/istockphoto-1353482791-612x612.jpg",
  //   "https://i.ibb.co.com/q0pw2N5/GMQCym-OWk-AEYr58.webp",
  //   "https://i.ibb.co.com/K7mxfGq/happy-birthday.jpg",
  "https://i.ibb.co.com/L9JtkYf/images.jpg",
];

const HomeGallery = () => {
  return (
    <div className="p-2 md:p-0">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry columnsCount={3} gutter="20px">
          {images.map((image, i) => (
            <img
              key={i}
              src={image}
              style={{ width: "100%", display: "block" }}
              alt=""
              className="rounded-md"
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default HomeGallery;
