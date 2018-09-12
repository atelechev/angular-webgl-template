import { VertexShader } from './vertex-shader';

/**
 * Example of a basic vertex shader.
 */
export class TemplateVertexShader extends VertexShader {

  constructor(gl: WebGLRenderingContext) {
    super(gl);
  }

  public getSource(): string {
    return `
    // sample shader code borrowed from http://learnwebgl.brown37.net/rendering/render_example_02.html
      precision mediump int;
      precision mediump float;

      uniform   mat4 u_Transform;

      attribute vec3 a_Vertex;
      attribute vec3 a_Color;

      varying vec4 v_vertex_color;

      void main() {
        gl_Position = u_Transform * vec4(a_Vertex, 1.0);

        v_vertex_color = vec4(a_Color, 1.0);
      }
    `;
  }

}
