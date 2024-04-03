import * as React from "react";
import {ImageSvg, WebpImage} from "../../../../shared/ui";

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
            <p className={`${rootClass}__address`}>广州市番禺区南村镇万博四路68号1楼1024</p>
        </div>
        <div className={`${rootClass}__smoke ${rootClass}__smoke--top`}/>
        <div className={`${rootClass}__overlay`}/>
        <WebpImage classes={`${rootClass}__background`} alt={'background'} imagePath={"footer_image"} exc={"png"} />
    </footer>
}