import React, { useState } from 'react';
import { ZoomIn, Eye, Image as ImageIcon } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const currentImage = images[selectedIndex] || images[0];

  return (
    <div className="space-y-3.5">
      {/* Main Image Container */}
      <div 
        className="relative aspect-[4/3] rounded-brutal-xl border-3 border-ink-near bg-surface-canvas overflow-hidden shadow-brutal group cursor-crosshair"
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <img
          src={currentImage}
          alt={`${title} - Photo ${selectedIndex + 1}`}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isZoomed ? 'scale-150' : 'group-hover:scale-105'
          }`}
        />

        {/* Zoom Hint Badge */}
        <div className="absolute bottom-3 right-3 bg-ink-near/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-brutal border border-white/20 text-xs font-mono flex items-center gap-1.5 shadow-brutal-xs">
          <ZoomIn className="w-3.5 h-3.5" />
          <span>{isZoomed ? 'Click to normal' : 'Click to inspect / zoom'}</span>
        </div>

        {/* Watermark Tag */}
        <div className="absolute top-3 left-3 bg-surface-pure/90 backdrop-blur-sm border-2 border-ink-near px-2.5 py-1 rounded-brutal text-[10px] font-mono font-bold text-ink-near uppercase shadow-brutal-xs">
          Physical Lot Inspection Photo
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedIndex(idx);
                setIsZoomed(false);
              }}
              className={`w-20 h-20 rounded-brutal-lg overflow-hidden border-2 shrink-0 transition-all ${
                selectedIndex === idx
                  ? 'border-stormy-teal ring-2 ring-stormy-teal shadow-brutal-sm scale-95'
                  : 'border-ink-near opacity-75 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
