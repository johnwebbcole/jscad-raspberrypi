"use strict";
/* eslint-env node */
var fs = require("fs");
var gulp = require("gulp");
// var concat = require('gulp-concat');
var del = require("del");
// var gulpLoadPlugins = require('gulp-load-plugins');
// var plugins = gulpLoadPlugins();
// var runSequence = require('run-sequence');
var rollup = require("rollup");
var merge2 = require("merge2");
var debug = require("gulp-debug");
var inject = require("gulp-inject");
var plumber = require("gulp-plumber");
var terser = require("gulp-terser");
var rollupResolve = require("rollup-plugin-node-resolve");
var rollupBabel = require("rollup-plugin-babel");
var jscadFiles = require("gulp-jscad-files");
var pkg = require("./package.json");

gulp.task("build", async function () {
  const bundle = await rollup.rollup({
    input: "./src/index.js",
    external: ["@jscad/scad-api", "@jscad/csg", "@jwc/jscad-utils"],
    plugins: [
      rollupResolve({
        customResolveOptions: {
          moduleDirectory: "node_modules",
        },
        browser: true,
      }),
      rollupBabel({
        exclude: "node_modules/**", // only transpile our source code
      }),
    ],
  });

  await bundle.write({
    name: "jscadRPi",
    file: "dist/index.js",
    format: "iife",
    exports: "named",
    globals: {
      "@jscad/csg": "jsCadCSG",
      "@jscad/scad-api": "scadApi",
      "@jwc/jscad-utils": "jscadUtils",
    },
    banner: `/*
     * ${pkg.name} version ${pkg.version}
     * ${pkg.homepage}
     */`,
    footer: `/* ${pkg.name} follow me on Twitter! @johnwebbcole */`,
  });
});

gulp.task("v1compat", function () {
  return gulp
    .src("src/v1compat.js")
    .pipe(plumber())
    .pipe(
      inject(gulp.src("dist/index.js").pipe(debug({ title: "injecting:" })), {
        relative: true,
        starttag: "// include:compat",
        endtag: "// end:compat",
        transform: function (filepath, file) {
          return "// " + filepath + "\n" + file.contents.toString("utf8");
        },
      })
    )
    .pipe(gulp.dest("dist"));
});

gulp.task("examples", function () {
  return gulp
    .src("examples/*.jscad")
    .pipe(plumber())
    .pipe(
      inject(
        merge2(
          gulp.src("package.json").pipe(jscadFiles()),
          gulp.src(["dist/v1compat.js"])
        )
          .pipe(
            terser({
              ecma: 6,
              keep_fnames: true,
              mangle: false,
              compress: false,
              output: {
                beautify: true,
                max_line_len: 80,
              },
            })
          )
          .pipe(debug({ title: "injecting:" })),
        {
          //   relative: true,
          starttag: "// include:js",
          endtag: "// endinject",
          transform: function (filepath, file) {
            console.warn("file", file.base);
            var contents = file.contents.toString("utf8");
            console.warn("size", contents.length);
            return "// " + filepath + "\n" + contents;
          },
        }
      )
    )
    .pipe(gulp.dest("dist/examples"));
});

// gulp.task("examples", function () {
//   return gulp
//     .src("examples/*.jscad")
//     .pipe(plumber())
//     .pipe(
//       inject(
//         merge2(
//           gulp
//             .src("package.json")
//             .pipe(jscadFiles())
//             .pipe(
//               terser({
//                 ecma: 6,
//                 keep_fnames: true,
//                 mangle: false,
//                 compress: false,
//                 output: {
//                   beautify: true,
//                   max_line_len: 80,
//                 },
//               })
//             ),
//           gulp.src(["dist/v1compat.js"])
//         ).pipe(debug({ title: "injecting:" })),
//         {
//           relative: true,
//           starttag: "// include:js",
//           endtag: "// endinject",
//           transform: function (filepath, file) {
//             // return "// " + filepath + "\n" + file.contents.toString("utf8");
//             return file.contents.toString("utf8");
//           },
//         }
//       )
//     )
//     .pipe(gulp.dest("dist/examples"));
// });

gulp.task("all", gulp.series(["build", "v1compat", "examples"]));

gulp.task(
  "default",
  gulp.series(["build", "v1compat", "examples"], function () {
    gulp.watch(
      ["src/**/*.js", "examples/*.jscad"],
      {
        verbose: true,
        followSymlinks: true,
        delay: 500,
        queue: false,
        ignoreInitial: false,
        ignored: ["**/*.*~", "dist/*", ".vuepress/*"],
      },
      gulp.series(["build", "v1compat", "examples"])
    );
  })
);
