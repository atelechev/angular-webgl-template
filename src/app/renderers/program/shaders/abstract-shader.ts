
/**
 * Base abstract class for all shaders.
 */
export abstract class AbstractShader {


  constructor(protected readonly gl: WebGLRenderingContext) {

  }

  public get(): WebGLShader {
    const shader = this.gl.createShader(this.getType());
    this.gl.shaderSource(shader, this.getSource());
    this.gl.compileShader(shader);
    const success = this.gl.getShaderParameter(shader, WebGLRenderingContext.COMPILE_STATUS);
    if (success) {
      return shader;
    } else {
      console.log(`${this.getStringShaderType()} shader compilation log:`);
      console.log(this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      throw new Error(`Failed to create shader type=${this.getType()}.`);
    }
  }

  private getStringShaderType(): string {
    if (this.getType() === WebGLRenderingContext.VERTEX_SHADER) {
      return 'vertex';
    }
    if (this.getType() === WebGLRenderingContext.FRAGMENT_SHADER) {
      return 'fragment';
    }
    return 'unknown';
  }

  abstract getSource(): string;

  abstract getType(): number;

}
