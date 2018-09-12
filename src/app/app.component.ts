import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DimensionsService } from './services/dimensions.service';
import { TemplateProgram } from './renderers/program/template-program';


@Component({
  selector: `app-template`,
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {

  @ViewChild('mainCanvas')
  private canvas: ElementRef;

  private gl: WebGLRenderingContext;

  private program: TemplateProgram;

  constructor(private readonly dimensions: DimensionsService) {

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

  private initPrograms(): void {
    // there might be more than one program implementations to initialize
    this.program = new TemplateProgram(this.gl);
  }

  private clearViewport(): void {
    /*
     Clearing the viewport is left at this level (not in Program impl), because
     there might be more than one program for a single application, but the viewport
     is reset once per render() call.
     */
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  private render(): void {
    const animate = () => {
      this.clearViewport();
      this.program.render();
      requestAnimationFrame(animate);
    };
    animate();
  }

  public ngAfterViewInit(): void {
    this.updateCanvasSize();
    this.initRenderingContext();
    this.adjustCanvasToViewportSize();
    this.initPrograms();
    this.render();
  }

}

