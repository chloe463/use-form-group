import React from "react";

import "./FormItem.css";

interface Props {
  meta: {
    [key: string]: any;
  };
  errors: {
    [key: string]: any;
  };
}

export const MetaAndErrors: React.FC<Props> = ({ meta, errors }) => {
  return (
    <div className="meta-and-errors">
      meta: <pre>{JSON.stringify(meta)}</pre>
      errors: <pre>{JSON.stringify(errors)}</pre>
    </div>
  );
};
