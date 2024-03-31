import * as React from "react";
import {ImageSvg, VideoBackground} from "../../shared/ui";
import {LoginForm} from "../../feature";

const rootClass = 'login'

export const Login = () => <section className={rootClass}>
    <div className={`${rootClass}__left`}>
        <VideoBackground classes={`${rootClass}__background`} video={'login.mov'} preview={'login-preview.png'} />
        <ImageSvg className={`${rootClass}__desktop-logo`} src={'logo-surface'} alt={'logo'} />
    </div>
    <div className={`${rootClass}__right`}>
        <ImageSvg className={`${rootClass}__mobile-logo`} src={'logo-colors'} alt={'logo'} />
        <h1 className={`${rootClass}__title`}>Личный кабинет</h1>
        <LoginForm classes={`${rootClass}__form`} />
    </div>
</section>