export default {
  input: ".packaging/esm5/index.js",
  output: {
    file: "builds/esm5/use-form-group.js",
    format: "es",
  },
  external: ["react", "react-dom"],
};
