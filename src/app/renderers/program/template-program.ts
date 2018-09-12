import { Program } from './program';
import { TemplateVertexShader } from './shaders/template-vertex-shader';
import { TemplateFragmentShader } from './shaders/template-fragment-shader';

/**
 * Example of Program implementation.
 */
export class TemplateProgram extends Program {

  private transformMatrixLocation: WebGLUniformLocation;

  constructor(gl: WebGLRenderingContext) {
    super(gl, new TemplateVertexShader(gl), new TemplateFragmentShader(gl));
    this.use();
    this.transformMatrixLocation = this.getUniformLocation('u_Transform');
  }

  /**
   * Sets the u_Transform uniform to the specified matrix.
   *
   * @param matrix the matrix to use
   */
  public setTransformMatrix(matrix: any): void {
    this.gl.uniformMatrix4fv(this.transformMatrixLocation, false, matrix);
  }

  /**
   * For the template project, binds the buffer to a_Vertex attribute.
   *
   * @param vertices the buffer to bind
   */
  public bindVerticesBuffer(vertices: WebGLBuffer): void {
    this.bindBuffer(vertices, 'a_Vertex', 3);
  }

  /**
   * For the template project, binds the buffer to a_Color attribute.
   *
   * @param colors the buffer to bind
   */
  public bindColorsBuffer(colors: WebGLBuffer): void {
    this.bindBuffer(colors, 'a_Color', 3);
  }

}
