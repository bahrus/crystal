const webComponentLibraryFeatures = {
    htmlTemplateDef:{},
    attributeSupport:{},
    propertiesSupport:{},
}
const wclf = webComponentLibraryFeatures;

enum MajorVersion{
    V0,
    V1
}

interface CDN {
    url?: string,
    version?: string,
    kbSize?: number,
    h2?: boolean,
    infoURL?: string,
}

interface WebComponentLibrary{
    CodeRepoUrl?: string,
    NumberOfStars?: number,
    MajorVersion?: MajorVersion,
    CDNs?: CDN[];
}

const libs = {
    webcomponents_lite:{
        MajorVersion: MajorVersion.V0,
        CDNs:[
            {
                url: 'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.24/webcomponents-lite.min.js',
                version: '0.7.24',
                kbSize: 12.4,
                infoURL: 'https://cdnjs.com/libraries/webcomponentsjs'
            }
        ]
    },
    HTMLImports:{
        MajorVersion: MajorVersion.V0,
        CDNs:[
            {
                url: 'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.24/HTMLImports.min.js',
                version: '0.7.24',
                kbSize: 6.4
            }
        ]
    },
    Sigil: {
        CodeRepoUrl: 'https://github.com/sigiljs/',
        cdn:{
            url: 'https://unpkg.com/sigiljs@0.0.20/sigil.min.js',
            kbSize: 5.4
        },
        features:[wclf.htmlTemplateDef, wclf.attributeSupport, wclf.propertiesSupport]
    } as WebComponentLibrary,
    SlimJS:{

    }
} as {[key: string] : WebComponentLibrary}