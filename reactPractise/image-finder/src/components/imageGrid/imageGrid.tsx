import "./imageGrid.css";

interface ImageGridProps {
  readonly images: Array<string>;
}
export default function ImageGrid({ images }: ImageGridProps) {
  return (
    <>
      {images?.map((image: string) => (
        <img
          key={image}
          className="imageContainer"
          src={image}
          alt="search result"
          width="150"
          height="150"
        />
      ))}
    </>
  );
}
