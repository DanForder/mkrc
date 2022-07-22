const convertPascalToKebabCase = (str) => {
  return str
    .split(/\.?(?=[A-Z])/)
    .join("-")
    .toLowerCase();
};

module.exports.createFuncJsx = (name) => [
  `import "./${name}.scss";`,
  "",
  `const ${name} = () => {`,
  `  return (`,
  `    <div className="${convertPascalToKebabCase(name)}">`,
  `      <p>${name} works</p>`,
  `    </div>`,
  `  );`,
  `};`,
  "",
  `export default ${name};`,
];

module.exports.createTestJs = (name) => [
  `import { render } from "@testing-library/react";`,
  `import ${name} from "./${name}";`,
  "",
  `describe("${name} tests", () => {`,
  `  it("should render", () => {`,
  `    const { container } = render(<${name} />);`,
  `    expect(container).toMatchSnapshot();`,
  `  });`,
  `});`,
];

module.exports.createScss = (name) => [
  `.${convertPascalToKebabCase(name)} {`,
  `}`,
];
