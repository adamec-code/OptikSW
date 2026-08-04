// vite.config.ts
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';

const baseFolder =
    process.env.APPDATA !== undefined && process.env.APPDATA !== ''
        ? `${process.env.APPDATA}/ASP.NET/https`
        : `${process.env.HOME}/.aspnet/https`;

const certificateArg = process.argv.map(arg => arg.match(/--name=(?<value>.+)/i)).filter(Boolean)[0];
const certificateName = certificateArg ? certificateArg.groups.value : "optiksw.web.react.client";

if (!certificateName) {
    console.error('Invalid certificate name. Run this script in the context of an npm/yarn script or pass --name=<<app>> explicitly.')
    process.exit(-1);
}

const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

// Novější dotnet dev-certs nevytvoří cílovou složku automaticky.
fs.mkdirSync(baseFolder, { recursive: true });

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    if (0 !== child_process.spawnSync('dotnet', [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
    ], { stdio: 'inherit', }).status) {
        throw new Error("Could not create certificate.");
    }
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        headers: {
            "access-control-allow-methods": "GET, PUT, POST, DELETE, HEAD"
        }
    },
    assetsInclude: ["**/*.mov"],
    css: {
        preprocessorOptions: {
            scss: {
                // Bootstrap 4.5 a SmartAdmin (vendorované, needitovat) používají starší
                // Sass syntaxi (dělení pomocí "/", abs() na procenta, darken()/lighten(),
                // @import, legacy JS API), kterou novější Dart Sass jen ohlašuje jako
                // deprecated - jde o vendorovaný kód, ne náš, proto tato varování ztišíme.
                quietDeps: true,
                silenceDeprecations: [
                    "slash-div",
                    "abs-percent",
                    "color-functions",
                    "global-builtin",
                    "import",
                    "legacy-js-api",
                ],
            }
        }
    }
})