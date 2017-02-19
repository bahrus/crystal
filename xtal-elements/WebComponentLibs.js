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
    webcomponents_lite: {
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
    Sigil: {
        CodeRepoUrl: 'https://github.com/sigiljs/',
        cdn: {
            url: 'https://unpkg.com/sigiljs@0.0.20/sigil.min.js',
            kbSize: 5.4
        },
        features: [wclf.htmlTemplateDef, wclf.attributeSupport, wclf.propertiesSupport]
    },
    SlimJS: {}
};
//# sourceMappingURL=WebComponentLibs.js.map