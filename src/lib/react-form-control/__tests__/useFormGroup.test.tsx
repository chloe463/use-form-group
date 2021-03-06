import { renderHook, act } from "@testing-library/react-hooks";
import { initMeta, initValidators, useFormGroup } from "../useFormGroup";
import { Validators } from "../Validators";

describe("initMeta", () => {
  it("initializes meta values", () => {
    const values = {
      num: 1,
      str: "string",
      bool: true,
    };
    const actual = initMeta(values);
    const expected = {
      num: { pristine: true, dirty: false, touched: false, untouched: true },
      str: { pristine: true, dirty: false, touched: false, untouched: true },
      bool: { pristine: true, dirty: false, touched: false, untouched: true },
    };
    expect(actual).toEqual(expected);
  });
});

describe("initValidators", () => {
  it("initializes validators", () => {
    const values = {
      num: [Validators.max(5)],
      str: [Validators.maxLength(3)],
      bool: [Validators.required],
    };
    const actual = initValidators(values);
    expect(actual.validators).toBeTruthy();
    expect(Object.keys(actual.validators).length).toBe(3);
    expect(Object.keys(actual.validators)).toEqual(["num", "str", "bool"]);
    expect(Object.values(actual.validators).length).toBe(3);
    Object.values(actual.validators).forEach(validator => {
      expect(validator).toBeInstanceOf(Function);
    });
  });
});

describe("useFormGroup", () => {
  it("can render initial values", () => {
    const { result } = renderHook(() =>
      useFormGroup({
        values: {
          num: 0,
        },
      })
    );
    expect(result.current.values).toEqual({ num: 0 });
    expect(result.current.errors).toEqual({ num: null });
    expect(typeof result.current.setValue).toBe("function");
    expect(typeof result.current.reset).toBe("function");
    expect(result.current.metaInfos).toEqual({
      num: {
        pristine: true,
        dirty: false,
        touched: false,
        untouched: true,
      },
    });
    expect(result.current.status).toBe("VALID");
  });

  it("can set value on change event", () => {
    const { result } = renderHook(() =>
      useFormGroup({
        values: {
          num: 0,
        },
      })
    );

    expect(result.current.values).toEqual({ num: 0 });
    expect(result.current.metaInfos).toEqual({
      num: {
        pristine: true,
        dirty: false,
        touched: false,
        untouched: true,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    act(() => {
      result.current.setValue({ num: 1 });
    });
    expect(result.current.values).toEqual({ num: 1 });
    expect(result.current.metaInfos).toEqual({
      num: {
        pristine: false,
        dirty: true,
        touched: true,
        untouched: false,
      },
    });
  });

  it("can handle validation errors", () => {
    const { result } = renderHook(() =>
      useFormGroup({
        values: {
          num: 0,
        },
        validators: {
          num: Validators.max(3),
        },
      })
    );
    expect(result.current.errors).toEqual({ num: null });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    act(() => {
      result.current.setValue({ num: 5 });
    });
    expect(result.current.errors).toEqual({
      num: { max: { max: 3, actualValue: 5 } },
    });
    expect(result.current.status).toBe("INVALID");

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    act(() => {
      result.current.setValue({ num: 2 });
    });
    expect(result.current.errors).toEqual({
      num: null,
    });
    expect(result.current.status).toBe("VALID");
  });

  it("can reset values", () => {
    const { result } = renderHook(() =>
      useFormGroup({
        values: {
          num: 0,
        },
      })
    );
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    act(() => {
      result.current.setValue({ num: 1 });
    });
    expect(result.current.values).toEqual({ num: 1 });
    expect(result.current.metaInfos).toEqual({
      num: {
        pristine: false,
        dirty: true,
        touched: true,
        untouched: false,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    act(() => {
      result.current.reset();
    });
    expect(result.current.values).toEqual({ num: 0 });
    expect(result.current.metaInfos).toEqual({
      num: {
        pristine: true,
        dirty: false,
        touched: false,
        untouched: true,
      },
    });
  });

  it("can update touched/untouched via setTouchedOnBlur", async () => {
    const { result } = renderHook(() =>
      useFormGroup({
        values: {
          num: 0,
        },
      })
    );

    expect(result.current.metaInfos).toEqual({
      num: {
        pristine: true,
        dirty: false,
        touched: false,
        untouched: true,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    act(() => {
      result.current.setTouchedOnBlur("num");
    });

    expect(result.current.metaInfos).toEqual({
      num: {
        pristine: true,
        dirty: false,
        touched: true,
        untouched: false,
      },
    });
  });
});
