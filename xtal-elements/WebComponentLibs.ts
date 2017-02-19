const webComponentLibraryFeatures = {
    htmlTemplateDef:{},
    attributeSupport:{},
    propertiesSupport:{},
}
const wclf = webComponentLibraryFeatures;

interface WebComponentLibrary{
    CodeRepoUrl?: string,
    NumberOfStars?: number,
}

const libs = {
    PolymerWCPolyfill:{
https://cdnjs.com/libraries/webcomponentsjs
        webcomponents_lite: {
            url: 'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.23/webcomponents-lite.min.js',
            kbSize: 12.4
        }
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