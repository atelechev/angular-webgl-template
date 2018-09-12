import { AbstractRenderer } from './abstract-renderer';
import { TemplateProgram } from './program/template-program';
import { DimensionsService } from '../services/dimensions.service';
import { TemplateCube } from '../model/template-cube';
import { Injectable } from '@angular/core';
import { mat4 } from 'gl-matrix';

const RC = WebGLRenderingContext;

/**
 * Example of a renderer implementation for the template.
 */
@Injectable()
export class TemplateRenderer extends AbstractRenderer<TemplateProgram> {

  private shape: TemplateCube;

  private rotationAngle: number;

  private rotationStep: number;

  private verticesBuffer: WebGLBuffer;

  private colorsBuffer: WebGLBuffer;

  constructor(dimension: DimensionsService) {
    super(dimension);
    this.rotationAngle = 0;
    this.rotationStep = this.toRadians(0.15);
  }

  private toRadians(angle: number): number {
    return angle * Math.PI / 180.0;
  }

  protected initProgram(): TemplateProgram {
    return new TemplateProgram(this.gl);
  }

  protected initShapes(): void {
    this.shape = new TemplateCube(0.6);
    this.verticesBuffer = this.createBuffer(this.shape.getVertices());
    this.colorsBuffer = this.createBuffer(this.shape.getColors());
  }

  protected bindDataBuffers(): void {
    this.getProgram().bindVerticesBuffer(this.verticesBuffer);
    this.getProgram().bindColorsBuffer(this.colorsBuffer);
  }

  private createBuffer(coords: Array<number>): WebGLBuffer {
    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(RC.ARRAY_BUFFER, buffer);
    this.gl.bufferData(RC.ARRAY_BUFFER, new Float32Array(coords), RC.STATIC_DRAW);
    return buffer;
  }

  private updateTransformMatrix(): void {
    this.rotationAngle += this.rotationStep;
    const transformX = mat4.fromXRotation(mat4.create(), this.rotationAngle);
    const transformY = mat4.fromYRotation(mat4.create(), this.rotationAngle);
    const transform = mat4.multiply(mat4.create(), transformX, transformY);
    this.getProgram().setTransformMatrix(transform);
  }

  public render(): void {
    this.useProgram();
    this.updateTransformMatrix();
    this.bindAllBuffers();
    this.gl.drawArrays(RC.TRIANGLES, 0, this.shape.getVerticesCount());
  }

}
