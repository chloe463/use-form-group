export default {
  input: ".packaging/esm5/index.js",
  output: {
    file: "builds/bundle/use-form-group.umd.js",
    format: "umd",
    name: "use-form-group",
    globals: {
      react: "react",
      "react-dom": "react-dom",
    },
  },
  external: ["react", "react-dom"],
};
