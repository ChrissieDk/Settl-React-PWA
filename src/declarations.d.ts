// The code is a declaration file that tells TypeScript
// that when it sees a file with a .png extension, it should
// treat it as a module of type any and export the value of that module.
// This allows you to import .png files in your TypeScript code
// and use them as values.

declare module "*.png" {
  const value: any;
  export = value;
}
