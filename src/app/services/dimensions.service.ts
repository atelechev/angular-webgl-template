import { Injectable } from '@angular/core';

/**
 * Provides accessors to the size properties of the canvas with rendered graphics.
 */
@Injectable()
export class DimensionsService {

  private width: number;

  private height: number;

  constructor() {
    this.width = 512;
    this.height = this.width;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public setWidth(w: number): void {
    this.width = w;
  }

  public setHeight(h: number): void {
    this.height = h;
  }

}
