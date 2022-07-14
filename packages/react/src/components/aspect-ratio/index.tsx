import React, { useMemo, HTMLProps, ReactNode } from "react";

export interface AspectRatioProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  ratio: number;
}

const AspectRatio = ({ children, ratio, style = {}, ...props }: AspectRatioProps) => {
  const paddingBottom = useMemo(() => `${(1 / ratio) * 100}%`, [ratio]);

  return (
    <div style={{ width: "100%", ...style, position: "relative", overflow: "hidden" }} {...props}>
      <div style={{ paddingBottom }}></div>
      <div style={{ position: "absolute", top: "50%", left: 0, transform: "translateY(-50%)" }}>{children}</div>
    </div>
  );
};

export default AspectRatio;
