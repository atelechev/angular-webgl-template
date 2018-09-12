# Angular/TypeScript + WebGL Project Template

This is a template project that may serve as a quick start for creation of WebGL applications using Angular and TypeScript.

The aim is to provide a simple, easy to understand, flexible and properly organized frame for this kind of applications.

---

## Recommended Environment

[Visual Studio Code](https://code.visualstudio.com/) is recommended.

The following VSC extensions are also recommended:

* EditorConfig for VS Code (v.0.12.4+), uses the `./.editorconfig` file.
* ESLint (v1.4.12+), with default configuration.
* TSLint (v1.0.30+), uses the `./tsconfig.json`, `./tslint.json` and `./src/tsconfig.*.json` files.

---

## NPM Commands and Tasks

### Pre-Requisites

[NodeJS](https://nodejs.org/en/download/) v5.6.0+ must be installed in order to lauch the application in development mode.

### Commands

The following commands runnable with `npm {command}` or `npm run {command}` are defined in `package.json`:

* `clean`: removes the contents of the current `dist` directory, supposed to contain last production build files.
* `start`: executes a build in _development_ mode and launches the server on `http://localhost:4200`.
* `build:dev`: executes a build in _development_ mode, without starting the server.
* `build:prod`: cleans the current distribution files and executes a build in _production_ mode. The resulting files are placed in the `./dist` folder.
* `lint`: executes linting checks.

_Quickstart after cloning the source repository:_

* `npm install` to retrieve all the necessary dependencies.
* `npm start` command should launch the application at `http://localhost:4200`.

The commands above should work equally from VSC integrated terminals or from any terminal/CLI tools.

---

## Implementation Details

All source files having names starting with `template-` or entities prefixed with `Template*` are examples of the implementation of rendering a simple animated cube. These files/entities should be removed in case this template is used for a more meaningful WebGL application.

Several parts of boilerplate code necessary for WebGL applications are wrapped into abstract entities of this template. To create a WebGL application with it, the following steps should be executed:

* put shaders code into entities extending `AbstractShader`.

* extend abstract `Program` class that wraps a WebGL program and contains its rendering logic.

* plug the program(s) into the application in `AppComponent`.


### Shaders

WebGL shaders code should be placed into classes extending `VertexShader` and `FragmentShader` from `app/renderers/program/shaders`. The source code of a shader should be returned by `getSource()` method implementation, for example:

```typescript
export class CustomVertexShader extends VertexShader {

  constructor(gl: WebGLRenderingContext) {
    super(gl);
  }

  public getSource(): string {
    return `
      attribute vec3 a_Vertex;

      void main() {
        gl_Position = vec4(a_Vertex, 1.0);
      }
    `;
  }
}
```

### WebGL Program

WebGL program instances are handled in descendants of `Program` class from `app/renderers/program`.

A WebGL program can be created as follows:

```typescript
export class CustomProgram extends Program {

  private transformMatrixLocation: WebGLUniformLocation;

  constructor(gl: WebGLRenderingContext) {
    // also instantiate the shaders for this program:
    super(gl, new CustomVertexShader(gl), new CustomFragmentShader(gl));
    this.use();
    this.transformMatrixLocation = this.getUniformLocation('u_Transform');
  }

  public setTransformMatrix(matrix: any): void {
    this.gl.uniformMatrix4fv(this.transformMatrixLocation, false, matrix);
  }
}
```

It is useful to put into the implementation the setters for uniforms and attributes of the shaders, like `u_Transform` in the example above.

### Application Component

One or more `Program` implementations may exist for a single application and they should be instantiated in `AppComponent` class:

```typescript
private initPrograms(): void {
  this.program = new CustomProgram(this.gl);
}
```

Once instantiated, its `render()` method should invoke `render()` methods on each existing program:

````typescript
private render(): void {
  const animate = () => {
    this.clearViewport();
    this.program.render(); // delegate the rendering to the program
    requestAnimationFrame(animate);
  };
  animate();
}
```

---

## Version Control

The most recent validated version of the project is available on the `master` branch.

---

## License

This software is distributed under MIT license conditions.

Please check more details in [`LICENSE`](./LICENSE) file.

--- 

(c) 2018 Anton Telechev
