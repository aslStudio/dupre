import * as React from "react";
import {ButtonIcon, ImageSvg, VideoBackground} from "../../../../shared/ui";
import {providers} from "../../../../shared/utils";

const rootClass = 'home-main'

export const Main = () => {
    const { open } = providers.modalProvider.useModal()

    return <section className={`${rootClass}`}>
        <div className={`${rootClass}__smoke ${rootClass}__smoke--left`}/>
        <VideoBackground classes={`${rootClass}__background`} video={'main.mov'} preview={'main_preview.png'}/>
        <div className={`${rootClass}__smoke ${rootClass}__smoke--right`}/>
        <div className={`${rootClass}__smoke ${rootClass}__smoke--bottom`}/>
        <div className={`${rootClass}__content`}>
            <div className={`${rootClass}__header`}>
                <ButtonIcon tag={'a'} href={'/login'} className={`${rootClass}__button`} icon={'account'} />
                <ButtonIcon className={`${rootClass}__button`} icon={'download'} onClick={() => open('presentation')} />
            </div>
            <ImageSvg className={`${rootClass}__logo`} src={'logo-surface'} alt={'logo'} />
            <h1 className={`${rootClass}__title`}>Организация OEM и ODM под европейским контролем качества</h1>
        </div>
    </section>
}