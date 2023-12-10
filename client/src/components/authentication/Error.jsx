import React from "react";

export default function ErrorMessage(props) {
  return (
    <p className="px-[10px] text-[red] text-[11px] lg:text-[15px]">
      {props.message}
    </p>
  );
}
