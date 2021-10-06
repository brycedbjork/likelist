export const DEV =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export const DESKTOP_WIDE_BREAKPOINT = 1244;
export const DESKTOP_BREAKPOINT = 1024;
export const TABLET_BREAKPOINT = 800;
export const MOBILE_BREAKPOINT = 600;

export const IS_SAFARI =
  typeof navigator !== "undefined"
    ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    : false;
