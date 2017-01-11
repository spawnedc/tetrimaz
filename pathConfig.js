import path from 'path';

const rootpath = path.resolve('./');
const srcPath = path.resolve(rootpath, 'src');
const distPath = path.resolve(rootpath, 'dist');
const pathConfig = {
  src: {
    root: srcPath,
    assets: path.join(srcPath, 'assets/**/*'),
    js: [
      path.join(srcPath, 'app/**/*.js'),
      path.join(srcPath, 'app/js')
    ]
  },
  dist: {
    root: distPath,
    js: path.join(distPath, 'js')
  }
};

export {pathConfig};
