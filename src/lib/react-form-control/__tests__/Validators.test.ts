import { Validators } from "../Validators";

describe("Validators", () => {
  describe("Validators.required", () => {
    it("returns null if valid string is given", () => {
      expect(Validators.required("abc")).toBeNull();
    });

    it("returns error object if null or undefined is given", () => {
      expect(Validators.required(null)).toEqual({ required: true });
      expect(Validators.required(undefined)).toEqual({ required: true });
    });

    it("returns error object if empty string is given", () => {
      expect(Validators.required("")).toEqual({ required: true });
    });
  });

  describe("Validators.maxLength", () => {
    it("returns null if given string length is shorter than threshold", () => {
      const validator = Validators.maxLength(5);
      expect(validator("abc")).toBeNull();
    });

    it("returns error object if given string length is longer than threshold", () => {
      const validator = Validators.maxLength(5);
      expect(validator("abcdefg")).toEqual({
        maxLength: { maxLength: 5, actualLength: 7 },
      });
    });
  });

  describe("Validators.minLength", () => {
    it("returns null if given string length is longer than threshold", () => {
      const validator = Validators.minLength(5);
      expect(validator("abcdefg")).toBeNull();
    });

    it("returns error object if given string length is shorter than threshold", () => {
      const validator = Validators.minLength(5);
      expect(validator("abc")).toEqual({
        minLength: { minLength: 5, actualLength: 3 },
      });
    });
  });

  describe("Validators.format", () => {
    it("returns null if given string is match to regexp", () => {
      const validator = Validators.format(/abc/);
      expect(validator("abcdefg")).toBeNull();
    });

    it("returns error object if given string is not match to regexp", () => {
      const validator = Validators.format(/abc/);
      expect(validator("xyz")).toEqual({ format: true });
    });
  });
});
