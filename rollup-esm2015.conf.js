export default {
  input: ".packaging/esm2015/index.js",
  output: {
    file: "builds/esm2015/use-form-group.js",
    format: "es",
    name: "use-form-group",
  },
  external: ["react", "react-dom"],
};
