import { VertexShader } from './shaders/vertex-shader';
import { FragmentShader } from './shaders/fragment-shader';

const RC = WebGLRenderingContext;

/**
 * Base class wrapping a WebGL program with vertex and fragment shaders.
 */
export abstract class Program {

  private readonly program: WebGLProgram;

  constructor(protected readonly gl: WebGLRenderingContext,
              private readonly vertexShader: VertexShader,
              private readonly fragmentShader: FragmentShader) {
    this.program = gl.createProgram();
    this.attachShaders();
    this.linkProgram();
  }

  private linkProgram(): void {
    this.gl.linkProgram(this.program);
    const success = this.gl.getProgramParameter(this.program, RC.LINK_STATUS);
    if (!success) {
      this.gl.deleteProgram(this.program);
      throw new Error('Failed to create WebGL program.');
    }
  }

  private attachShaders(): void {
    this.gl.attachShader(this.program, this.vertexShader.get());
    this.gl.attachShader(this.program, this.fragmentShader.get());
  }

  /**
   * Returns the wrapped WebGL program.
   */
  public get(): WebGLProgram {
    return this.program;
  }

  /**
   * Returns the location of the uniform value having the specified name.
   *
   * @param name the name of the uniform value
   */
  protected getUniformLocation(name: string): WebGLUniformLocation {
    return this.gl.getUniformLocation(this.program, name);
  }

  /**
   * Shortcut method, called to enable the underlying WebGL program.
   */
  public use(): void {
    this.gl.useProgram(this.program);
  }

  /**
   * Binds the specified buffer to the specified shader attribute.
   *
   * @param buffer the buffer to bind
   * @param attrName the name of the attribute to bind the buffer to
   * @param nbValuesPerGroup the number of values corresponding to a group that represents a vertex (generally, 2 or 3)
   */
  protected bindBuffer(buffer: WebGLBuffer, attrName: string, nbValuesPerGroup: number): void {
    this.use();
    this.gl.bindBuffer(RC.ARRAY_BUFFER, buffer);
    const attrLocation = this.gl.getAttribLocation(this.get(), attrName);
    if (attrLocation < 0) {
      throw new Error(`buffer not found: ${attrName}`);
    }
    this.gl.vertexAttribPointer(attrLocation, nbValuesPerGroup, RC.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(attrLocation);
  }

}
