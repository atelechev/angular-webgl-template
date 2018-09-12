import { Program } from './program/program';
import { DimensionsService } from '../services/dimensions.service';

/**
 * Base class for renderers implementations.
 * A renderer handles the rendering instructions of a single program.
 * For each Program implementation, there should be a dedicated renderer.
 */
export abstract class AbstractRenderer<P extends Program> {

  private program: P;

  protected gl: WebGLRenderingContext;

  constructor(protected readonly dimension: DimensionsService) {

  }

  /**
   * Sets the WebGL rendering context.
   * This method must be called once the WebGLRenderingContext reference is available.
   *
   * @param gl the WebGL rendering context to set
   */
  public setGraphicsContext(gl: WebGLRenderingContext): void {
    this.gl = gl;
    this.program = this.initProgram();
    this.useProgram();
    this.initShapes();
  }

  protected getProgram(): P {
    return this.program;
  }

  /**
   * Executes the instructions to bind data buffers for the underlying WebGL program.
   */
  protected abstract bindDataBuffers(): void;

  /**
   * Binds all buffers for the underlying WebGL program.
   */
  protected bindAllBuffers(): void {
    this.bindDataBuffers();
  }

  protected useProgram(): void {
    this.program.use();
  }

  /**
   * Creates and returns an instance of the WebGL program for this renderer.
   */
  protected abstract initProgram(): P;

  /**
   * Initializes the members that represent the shapes/geometries to render.
   */
  protected abstract initShapes(): void;

  public abstract render(): void;

}
