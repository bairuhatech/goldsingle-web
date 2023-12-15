import React from "react";
import { Helmet } from "react-helmet";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, image }) => {
  const titleElement = title ? <title>{title}</title> : null;
  const descriptionElement = description ? <meta name="description" content={description} /> : null;
  const imageElement = image ? <meta property="og:image" content={image} /> : null;

  return (
    <Helmet>
      {titleElement}
      {descriptionElement}
      {imageElement}
      {/* Add more meta tags as needed for SEO */}
    </Helmet>
  );
};

export default SEO;
