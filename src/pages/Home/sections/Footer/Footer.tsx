import * as React from "react";
import {ImageSvg} from "../../../../shared/ui";

const rootClass = 'footer'

export const Footer = () => {
    return <footer className={rootClass}>

        <div className={`${rootClass}__container container`}>
            <div className={`${rootClass}__logo`}>
                <ImageSvg src={'small_logo'} alt={'logo'}/>
                <p>Guangzhou Dupre export and trading Co., Ltd</p>
            </div>
            <div className={`${rootClass}__contacts`}>
                <p>mf@dupre.cn</p>
                <p>(+86)18520504319</p>
            </div>
            <p className={`${rootClass}__address`}>1024, 1st Building, No. 68, Wanbo 4th Road, Nancun Town, Panyu Dc.,
                Guangzhou city, China</p>
        </div>
        <div className={`${rootClass}__smoke ${rootClass}__smoke--left`}/>
        <div className={`${rootClass}__smoke ${rootClass}__smoke--right`}/>
        <div className={`${rootClass}__smoke ${rootClass}__smoke--top`}/>
        <div className={`${rootClass}__overlay`}/>
        <img className={`${rootClass}__background`} alt={'background'} src={"./images/footer_image.png"} loading={"lazy"}/>
    </footer>
}