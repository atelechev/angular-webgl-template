import { AbstractShader } from './abstract-shader';

/**
 * Base class for fragment shaders.
 */
export abstract class FragmentShader extends AbstractShader {

  constructor(gl: WebGLRenderingContext) {
    super(gl);
  }

  public getType(): number {
    return WebGLRenderingContext.FRAGMENT_SHADER;
  }

}
