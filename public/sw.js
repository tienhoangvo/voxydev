if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let r={};const o=e=>i(e,c),t={module:{uri:c},exports:r,require:o};s[c]=Promise.all(n.map((e=>t[e]||o(e)))).then((e=>(a(...e),r)))}}define(["./workbox-1846d813"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/server/pages/me/_middleware.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/chunks/1484b9de.b75188e8dfe73edc.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/chunks/183-a822a72d9bd45b93.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/chunks/214-b866121b14e438f4.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/chunks/228-15ccb2e7b4b41815.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/chunks/301-2c119bf4e69c3014.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/chunks/50-4bf61041cb901fa9.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/chunks/743.b12ed851f6dfe625.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/chunks/919-4eeff917c7161def.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/chunks/938-dde111d99933b309.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/chunks/994-5afc959b00071449.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/chunks/framework-dc33c0b5493501f0.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/chunks/main-f338cd784e58204b.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/chunks/pages/404-4c3e3b8d524aad32.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/chunks/pages/_app-a1df8fadb90b4146.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/chunks/pages/_error-a3f18418a2205cb8.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/chunks/pages/blog-cfee52415c96fb7a.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/chunks/pages/blog/%5Bslug%5D-11f98e2a1b10c21d.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/chunks/pages/contact-dce7b4f1620f1cf2.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/chunks/pages/courses-2be6c89332c94c71.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/chunks/pages/index-c4dca39e4c2f7dfc.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/chunks/pages/me/favorites-36c86d946084e6e6.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/chunks/pages/videos-1fc34791a4143e58.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/chunks/webpack-abdf18c62ceb2924.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/chunks/webpack-middleware-abdf18c62ceb2924.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/css/fce68b248359ed6c.css",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/hRr7HqwM6B_SvxVDe293u/_buildManifest.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/hRr7HqwM6B_SvxVDe293u/_middlewareManifest.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/_next/static/hRr7HqwM6B_SvxVDe293u/_ssgManifest.js",revision:"hRr7HqwM6B_SvxVDe293u"},{url:"/android-icon-144x144.png",revision:"61d2d884e8704772a7074217d369c752"},{url:"/android-icon-192x192.png",revision:"f7e230885dca21edc3fd5fe0082284aa"},{url:"/android-icon-36x36.png",revision:"74cccdedef93d0bb0c44438dd69b5e40"},{url:"/android-icon-48x48.png",revision:"43519aa69b690d06edb1a52b5f213d7b"},{url:"/android-icon-72x72.png",revision:"4548737837f5d1d3274a8bea44b2f99b"},{url:"/android-icon-96x96.png",revision:"4bed5c8ebacaa2aad465b4460bbfbf98"},{url:"/apple-icon-114x114.png",revision:"3450aa69ef56daf403d3ea0a8a6c3d8c"},{url:"/apple-icon-120x120.png",revision:"5324a71064541d0b69472ad6611f7770"},{url:"/apple-icon-144x144.png",revision:"61d2d884e8704772a7074217d369c752"},{url:"/apple-icon-152x152.png",revision:"b274292ddc385ea465907860c31a6fd7"},{url:"/apple-icon-180x180.png",revision:"002f64ee3381b5609b5417dd2dea5c5c"},{url:"/apple-icon-57x57.png",revision:"fb795606db1cf7ca70ce90b514d68fd1"},{url:"/apple-icon-60x60.png",revision:"9943bf08e4e37482c92c22ee2c9b9057"},{url:"/apple-icon-72x72.png",revision:"4548737837f5d1d3274a8bea44b2f99b"},{url:"/apple-icon-76x76.png",revision:"80e9d59327b1b5824114b94b0ebf4274"},{url:"/apple-icon-precomposed.png",revision:"1b24d7ef2b057d18fcd15df28d20ba6a"},{url:"/apple-icon.png",revision:"1b24d7ef2b057d18fcd15df28d20ba6a"},{url:"/browserconfig.xml",revision:"97775b1fd3b6e6c13fc719c2c7dd0ffe"},{url:"/favicon-16x16.png",revision:"eaa1ab308fba313eb5738e9cce76a01f"},{url:"/favicon-32x32.png",revision:"350ea270ab1211c2aa1cae0f057fb684"},{url:"/favicon-96x96.png",revision:"4bed5c8ebacaa2aad465b4460bbfbf98"},{url:"/favicon.ico",revision:"2b24ec41d578a7f80dde5eea056704f5"},{url:"/images/404_not_found.png",revision:"e5a82832dad37e869f809bcddb34739b"},{url:"/images/404_not_found.svg",revision:"1fdb6fbf13913fec02ced245beb41f64"},{url:"/images/Frame 1.png",revision:"c6be7b6501ff77b5c7bd8c4516935568"},{url:"/images/Frame 1.svg",revision:"be969a9f5e5d6d2900ed8435ab1b9025"},{url:"/images/Mask Group (1).png",revision:"4519e77cb29ab3887dabdd6c2651ed04"},{url:"/images/Mask Group.png",revision:"38fe7284e09de5d0de73ad5536fd3921"},{url:"/images/Mask Group.svg",revision:"0914693d7856520a50c569a018616c4c"},{url:"/images/Youtube-Thumbnail.png",revision:"13035234455576f82e9aab0de734bf34"},{url:"/images/blog_page.png",revision:"07882a2d94aac2bffc7ae4a36332308b"},{url:"/images/code_thinking.svg",revision:"fbc6c52c5f51d903732eea7b85603582"},{url:"/images/contact.png",revision:"641df51e77a891a8eec54598f57d7ed6"},{url:"/images/courses_page.png",revision:"6ce665d95e73077fcaf747a845e95fd8"},{url:"/images/home-screenshot.png",revision:"a898c7d1fd9ccd88c49a4e9785894130"},{url:"/images/home_page.png",revision:"2039bdc098105210bf5891e6e8304c48"},{url:"/images/online_articles.png",revision:"0d3d9efe7d7c3570efd08cb76267b104"},{url:"/images/online_articles.svg",revision:"4b3f06ca003f41f15fe956202db63667"},{url:"/images/online_learning.png",revision:"1db928a7c0e43eec564d6144fc7de94a"},{url:"/images/online_media.svg",revision:"5fffdb14fae5c5a9e1bfa97a860afcfc"},{url:"/images/personal_website.png",revision:"b1daa77172a35b3868ef1dc274cfa9bb"},{url:"/images/undraw_dark_mode_2xam (1).svg",revision:"cd0e162b95cd9b6130eed4338e665648"},{url:"/images/undraw_dark_mode_2xam.svg",revision:"cd0e162b95cd9b6130eed4338e665648"},{url:"/images/undraw_next_js_8g5m (1).svg",revision:"3e6a71df08abb2eb53042d5ce5e88b99"},{url:"/images/video_page.png",revision:"2321d2c5018f2e97b7270b5c517380c6"},{url:"/images/youtube_tutorial.png",revision:"94d39e0adf36dd240dc7e04ebc81f85c"},{url:"/images/youtube_tutorial.svg",revision:"470ae6cabfd8ed1df75f459b3273ffea"},{url:"/manifest.json",revision:"ab596a8c51e92fc3c48cc01579ddf4e8"},{url:"/ms-icon-144x144.png",revision:"61d2d884e8704772a7074217d369c752"},{url:"/ms-icon-150x150.png",revision:"016935a04287707ec7e187fdf951e8b0"},{url:"/ms-icon-310x310.png",revision:"baae1d9dc9cdca02abe6d50c30735ec4"},{url:"/ms-icon-70x70.png",revision:"a3c1308f2bc097f8e580c8b4415efc04"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
