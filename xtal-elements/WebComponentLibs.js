var webComponentLibraryFeatures = {
    htmlTemplateDef: {},
    attributeSupport: {},
    propertiesSupport: {},
};
var wclf = webComponentLibraryFeatures;
var MajorVersion;
(function (MajorVersion) {
    MajorVersion[MajorVersion["V0"] = 0] = "V0";
    MajorVersion[MajorVersion["V1"] = 1] = "V1";
})(MajorVersion || (MajorVersion = {}));
var libs = {
    webcomponents_lite_V0: {
        MajorVersion: MajorVersion.V0,
        CDNs: [
            {
                url: 'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.24/webcomponents-lite.min.js',
                version: '0.7.24',
                kbSize: 12.4,
                infoURL: 'https://cdnjs.com/libraries/webcomponentsjs'
            }
        ]
    },
    webcomponents_lite_V1: {
        MajorVersion: MajorVersion.V1,
        CodeRepoUrl: 'https://github.com/webcomponents'
    },
    HTMLImports: {
        MajorVersion: MajorVersion.V0,
        CDNs: [
            {
                url: 'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.24/HTMLImports.min.js',
                version: '0.7.24',
                kbSize: 6.4
            }
        ]
    },
    Polymer1: {
        documentationUrl: 'https://www.polymer-project.org/1.0/',
        CodeRepoUrl: 'https://github.com/Polymer/polymer',
        NumberOfStars: 16979
    },
    Sigil: {
        CodeRepoUrl: 'https://github.com/sigiljs/sigil',
        cdn: {
            url: 'https://unpkg.com/sigiljs@0.0.20/sigil.min.js',
            kbSize: 5.4
        },
        features: [wclf.htmlTemplateDef, wclf.attributeSupport, wclf.propertiesSupport],
        NumberOfStars: 15
    },
    SkateJS: {
        CodeRepoUrl: 'https://github.com/skatejs/skatejs',
        MajorVersion: MajorVersion.V1,
        NumberOfStars: 1953
    },
    SlimJS: {
        documentationUrl: 'http://slimjs.com/',
        CodeRepoUrl: 'https://github.com/eavichay/slim.js',
        NumberOfStars: 109
    },
    XTag1: {
        MajorVersion: MajorVersion.V0,
        CodeRepoUrl: 'https://github.com/x-tag/core',
        documentationUrl: 'http://x-tag.github.io/',
        NumberOfStars: 1095
    }
};
//# sourceMappingURL=WebComponentLibs.js.map