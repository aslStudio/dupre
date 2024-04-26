import * as React from "react";
import {useCallback, useEffect, useRef, useState} from "react";

export type VideoBackgroundProps = {
    classes?: string
    video: string
    isBlur?: boolean
    preview: string
}

const rootClass = 'video-background'

export const VideoBackground = React.memo<VideoBackgroundProps>(({ video, preview, classes, isBlur }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [ isLoaded, setIsLoaded ] = useState(false)

    const onLoadStart = useCallback(() => {
        if (!isLoaded) {
            videoRef.current?.load()
            videoRef.current?.setAttribute('autoplay', 'true')
        }
    }, [isLoaded])

    useEffect(() => {
        window.addEventListener('load', () => onLoadStart())
    }, []);

    return <div className={`${rootClass} ${isBlur ? 'is-blur' : ''} ${classes ?? ''}`}>
        <div className={`${rootClass}__overlay`} />
        <img src={`./images/${preview}`} className={`${rootClass}__main mobile`} />
        <video ref={videoRef} className={`${rootClass}__main tablet`} preload={'none'}
               poster={`./images/${preview}`} loop={true} muted={true}>
            <source src={`./videos/${video}`} type={'video/mp4'}/>
        </video>
    </div>
})