import React from "react";

type PageHeaderProps = {
  text: string;
};
function PageHeader({ text }: PageHeaderProps) {
  return (
    <div className="my-4">
      <a className="text-muted" href="./">Online Shopping /{" "}</a>{text}
    </div>
  );
}
export default PageHeader;
