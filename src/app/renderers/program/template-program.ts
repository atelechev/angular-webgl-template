import { Program } from './program';
import { TemplateVertexShader } from './shaders/template-vertex-shader';
import { TemplateFragmentShader } from './shaders/template-fragment-shader';
import { TemplateCube } from '../../model/template-cube';
import { mat4 } from 'gl-matrix';

/**
 * Example of Program implementation.
 */
export class TemplateProgram extends Program {

  private shape: TemplateCube;

  private rotationAngle: number;

  private rotationStep: number;

  private verticesBuffer: WebGLBuffer;

  private colorsBuffer: WebGLBuffer;

  private transformMatrixLocation: WebGLUniformLocation;

  constructor(gl: WebGLRenderingContext) {
    super(gl, new TemplateVertexShader(gl), new TemplateFragmentShader(gl));
    this.rotationAngle = 0;
    this.rotationStep = this.toRadians(0.15);
    this.use();
    this.transformMatrixLocation = this.getUniformLocation('u_Transform');
  }

  private toRadians(angle: number): number {
    return angle * Math.PI / 180.0;
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

  protected initShapes(): void {
    this.shape = new TemplateCube(0.6);
    this.verticesBuffer = this.createDataBuffer(this.shape.getVertices());
    this.colorsBuffer = this.createDataBuffer(this.shape.getColors());
  }

  protected bindDataBuffers(): void {
    this.bindVerticesBuffer(this.verticesBuffer);
    this.bindColorsBuffer(this.colorsBuffer);
  }

  private updateTransformMatrix(): void {
    this.rotationAngle += this.rotationStep;
    const transformX = mat4.fromXRotation(mat4.create(), this.rotationAngle);
    const transformY = mat4.fromYRotation(mat4.create(), this.rotationAngle);
    const transform = mat4.multiply(mat4.create(), transformX, transformY);
    this.setTransformMatrix(transform);
  }

  public render(): void {
    this.use();
    this.updateTransformMatrix();
    this.bindAllBuffers();
    this.gl.drawArrays(WebGLRenderingContext.TRIANGLES, 0, this.shape.getVerticesCount());
  }

}
