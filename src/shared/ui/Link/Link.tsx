import * as React from "react";

export type LinkProps = React.PropsWithChildren<{
    href: string
}>

const rootClass = 'link'

export const Link = React.memo<LinkProps>(({ children, href }) => (
    <a className={rootClass} href={href} target={"_blank"} rel={"noopener noreferrer"}>{children}</a>
))