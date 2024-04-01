import * as React from "react";

export type WebpImageProps = {
    imagePath: string
    exc: string
    classes: string
    alt: string
}

export const WebpImage = React.memo<WebpImageProps>(({ imagePath, exc, alt, classes }) => (
    <picture className={classes}>
        <source type={"image/webp"} width={"100px"} height={"100px"} srcSet={`./images/${imagePath}.webp`}/>
        <source type={`image/${exc}`} width={"100px"} height={"100px"} srcSet={`./images/${imagePath}.${exc}`}/>
        <img srcSet={`./images/${imagePath}.${exc}`} alt={alt} loading={"lazy"}/>
    </picture>
))