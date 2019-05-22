import { Validators, Validator, mergeValidators } from "../Validators";

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

  describe("Validators.min", () => {
    it("returns null if given value is larger than threshold", () => {
      const validator = Validators.min(3);
      expect(validator(5)).toBeNull();
    });

    it("returns error object if given value is less than threshold", () => {
      const validator = Validators.min(3);
      expect(validator(2)).toEqual({ min: { min: 3, actualValue: 2 }});
    });
  });

  describe("Validators.max", () => {
    it("returns null if given value is less than threshold", () => {
      const validator = Validators.max(3);
      expect(validator(2)).toBeNull();
    });

    it("returns error object if given value is larger than threshold", () => {
      const validator = Validators.max(3);
      expect(validator(5)).toEqual({ max: { max: 3, actualValue: 5 }});
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

  describe("mergeValidators", () => {
    it("returns noop function if undefined is given", () => {
      const noop = mergeValidators(undefined);
      expect(noop).toBeInstanceOf(Function);
      expect(noop("abc")).toBeNull();
    });

    it("returns a validator if single validator is given", () => {
      const validator: Validator = (_value: any) => {
        return null;
      };
      const merged = mergeValidators(validator);
      const errors = merged(null);
      expect(errors).toBeNull();
    });

    it("can merge some validator functions", () => {
      const validator1: Validator = (_value: any) => {
        return null;
      };
      const validator2: Validator = (_value: any) => {
        return { foo: "foo" };
      };
      const validator3: Validator = (_value: any) => {
        return { bar: "bar" };
      };

      const merged = mergeValidators([validator1, validator2, validator3]);
      const errors = merged(null);
      expect(errors).toEqual({ foo: "foo", bar: "bar" });
    });
  });
});
