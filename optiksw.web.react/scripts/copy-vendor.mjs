// SmartAdmin vendor je vendorovaný adresář mimo public/ (viz CLAUDE.md), takže ho
// Vite při "vite build" do dist/ automaticky nezkopíruje jako obsah public/.
// Skript ho po buildu zkopíruje ručně, aby cesty typu "/vendor/..." v produkci fungovaly.
import { cpSync } from 'node:fs';

cpSync('vendor', 'dist/vendor', { recursive: true });
