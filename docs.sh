rm -rf srcx
cp -R src srcx
find ./srcx -name "*.js" -print0 | xargs -0 sed -i ".back" "s/@typedef {typeof import/@xtypedef {typeof import/g"
npm run docs

montage test/images/*.png docs/images/montage.png