function requireAll(r) {
  r.keys().forEach(r);
}

// code for webpack sprite-loader
requireAll(require.context('../../sprite/', true, /\.svg$/));
