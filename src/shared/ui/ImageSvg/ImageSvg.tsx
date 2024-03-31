import * as React from "react";

export type ImageSvgProps = {
    className?: string
    src: string
    alt: string
}

export const ImageSvg = React.memo<ImageSvgProps>(({ className, src, alt}) => (
    <img className={className} src={`./images/${src}.svg`} alt={alt} loading={"lazy"} />
))