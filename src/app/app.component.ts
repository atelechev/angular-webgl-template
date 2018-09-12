import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DimensionsService } from './services/dimensions.service';
import { TemplateRenderer } from './renderers/template-renderer';


@Component({
  selector: `app-template`,
  templateUrl: './app.component.html',
  providers: [
    TemplateRenderer
  ]
})
export class AppComponent implements AfterViewInit {

  @ViewChild('mainCanvas')
  private canvas: ElementRef;

  private gl: WebGLRenderingContext;

  constructor(private readonly dimensions: DimensionsService,
              private readonly renderer: TemplateRenderer) {
  }

  private updateCanvasSize(): void {
    this.canvas.nativeElement.width = this.dimensions.getWidth();
    this.canvas.nativeElement.height = this.dimensions.getHeight();
  }

  private initRenderingContext(): void {
    this.gl = this.canvas.nativeElement.getContext('webgl');
    if (!this.gl) {
      throw new Error('Failed to initialize WebGL rendering context.');
    }
    this.gl.enable(WebGLRenderingContext.DEPTH_TEST);
  }

  private adjustCanvasToViewportSize(): void {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
  }

  private bindRenderingContext(): void {
    this.renderer.setGraphicsContext(this.gl);
  }

  private clearViewport(): void {
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  private render(): void {
    const animate = () => {
      this.clearViewport();
      this.renderer.render();
      requestAnimationFrame(animate);
    };
    animate();
  }

  public ngAfterViewInit(): void {
    this.updateCanvasSize();
    this.initRenderingContext();
    this.adjustCanvasToViewportSize();
    this.bindRenderingContext();
    this.render();
  }

}

