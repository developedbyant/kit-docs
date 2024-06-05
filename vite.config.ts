import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import kitDocsPlugin, { type Options as kitDocsPluginOptions } from "./src/lib/plugin/index.js"
const kitDocsOptions:kitDocsPluginOptions = {
	appName:"KitDocs",
	domainUrl:"https://kitdocs.dev",
	defaultImage:"https://kitdocs.dev/images/backdrop.png",
	devMode:true,
	localDev:true
}
export default defineConfig({
	plugins: [sveltekit(),kitDocsPlugin("docs",kitDocsOptions)]
});