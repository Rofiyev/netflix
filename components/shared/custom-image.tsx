"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  image: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

const CustomImage: FC<Props> = ({ image, alt, className, onClick }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <Image
      src={image}
      alt={alt}
      className={cn(
        "object-cover duration-700 ease-in-out",
        isLoading
          ? "scale-110 blur-2xl grayscale"
          : "scale-100 blur-0 grayscale-0",
        className
      )}
      fill
      onLoadingComplete={() => setIsLoading(false)}
      onClick={onClick}
    />
  );
};

export default CustomImage;
