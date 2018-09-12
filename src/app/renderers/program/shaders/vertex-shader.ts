import { AbstractShader } from './abstract-shader';

/**
 * Base class for vertex shaders.
 */
export abstract class VertexShader extends AbstractShader {

  constructor(gl: WebGLRenderingContext) {
    super(gl);
  }

  public getType(): number {
    return WebGLRenderingContext.VERTEX_SHADER;
  }

}
