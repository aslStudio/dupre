import * as React from "react";
import {useState} from "react";
import {Input} from "../../../../shared/ui/Input/Input";
import {OrderForm} from "../../../../feature";

const rootClass = 'form'

export const Form = () => {
    return <section className={`${rootClass} container`}>
        <div className={`${rootClass}__info`}>
            <h2 className={`${rootClass}__title`}>Оставьте заявку на консультацию</h2>
            <p className={`${rootClass}__description`}>Мы свяжемся с вами в ближайшее время для обсуждения деталей</p>
        </div>
        <OrderForm classes={`${rootClass}__form`} />
    </section>
}