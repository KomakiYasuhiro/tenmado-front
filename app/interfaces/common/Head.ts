interface MetaMain {
    hid: string
    name: string
    content: string
}

interface MetaOg {
    hid: string
    property: string
    content: string
}

interface Link {
    hid: string
    rel: string
    href: string
}

export interface Head {
    title: string
    meta: Array<MetaMain | MetaOg>
    link: Array<Link>
}