import * as React from "react";
import { useMemo } from 'react'

const rootClass = 'loader'

export type LoaderProps = {
    classes?: string
    view?: 'surface' | 'brand'
}

export const Loader = React.memo<LoaderProps>(({view = 'surface', classes }) => {
    const color = useMemo(() => {
        switch (view) {
            case 'surface':
                return 'rgba(255, 255, 255, 1);'
            case 'brand':
                return 'rgba(14, 62, 139, 1);'
        }
    }, [view])

    const gradientsId = {
        a: 'spinner-base-a',
        b: 'spinner-base-b',
    }

    const svgAttrs = useMemo(() => ({
        color,
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: `0 0 200 200`,
        width: '200',
        height: '200'
    }), [color])

    return <div className={`${rootClass} ${classes ?? ''}`}>
        <svg {...svgAttrs}>
            <defs>
                <linearGradient id={gradientsId.a}>
                    <stop offset={'0%'} stopOpacity={0} stopColor={"currentColor"}/>
                    <stop offset={'100%'} stopOpacity={0.5} stopColor={"currentColor"}/>
                </linearGradient>
                <linearGradient id={gradientsId.b}>
                    <stop offset={'0%'} stopColor={"currentColor"}/>
                    <stop offset={'100%'} stopOpacity={0.5} stopColor={"currentColor"}/>
                </linearGradient>
            </defs>
            <g strokeWidth={15}>
                <path stroke={`url(#${gradientsId.a})`} d={"M15 100a85 85 0 0 1 170 0"}/>
                <path stroke={`url(#${gradientsId.b})`} d={"M185 100a85 85 0 0 1-170 0"}/>
            </g>
        </svg>
    </div>
})