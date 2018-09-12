import { FragmentShader } from './fragment-shader';

/**
 * Example of a basic fragment shader.
 */
export class TemplateFragmentShader extends FragmentShader {

  constructor(gl: WebGLRenderingContext) {
    super(gl);
  }

  public getSource(): string {
    return `
    // sample shader code borrowed from http://learnwebgl.brown37.net/rendering/render_example_02.html
      precision mediump int;
      precision mediump float;

      varying vec4 v_vertex_color;

      void main() {
        gl_FragColor = v_vertex_color;
      }
    `;
  }

}
