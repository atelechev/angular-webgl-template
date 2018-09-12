
/**
 * Model class for the cube animation rendered in the template.
 */
export class TemplateCube {

  private vertices: Array<number>;

  private colors: Array<number>;

  private verticesCount: number;

  constructor(private size: number) {
    this.initCoordinatesBuffers();
    this.initColorsBuffer();
  }

  private initColorsBuffer(): void {
    const r = [ 1, 0, 0 ];
    const g = [ 0, 1, 0 ];
    const b = [ 0, 0, 1 ];
    const y = [ 1, 1, 0 ];
    const c = [ 0, 1, 1 ];
    const w = [ 1, 1, 1 ];
    const colorsData = [
      r, g, b, y, c, w
    ];
    let vertexColors = [];
    for (let side = 0; side < colorsData.length; side++) {
      for (let vertex = 0; vertex < 6; vertex++) {
        vertexColors = vertexColors.concat(colorsData[side]);
      }
    }
    this.colors = vertexColors;
  }

  private initCoordinatesBuffers(): void {
    const absCoord = this.size / 2;
    const verticesData = [
      // front face
       -absCoord, -absCoord, -absCoord,
        absCoord, -absCoord,  absCoord,
       -absCoord, -absCoord,  absCoord,

       -absCoord, -absCoord, -absCoord,
        absCoord, -absCoord, -absCoord,
        absCoord, -absCoord,  absCoord,

      // right side
        absCoord, -absCoord, -absCoord,
        absCoord,  absCoord,  absCoord,
        absCoord, -absCoord,  absCoord,

        absCoord, -absCoord, -absCoord,
        absCoord,  absCoord, -absCoord,
        absCoord,  absCoord,  absCoord,

      // back side
        absCoord,  absCoord, -absCoord,
       -absCoord,  absCoord,  absCoord,
        absCoord,  absCoord,  absCoord,

        absCoord,  absCoord, -absCoord,
       -absCoord,  absCoord, -absCoord,
       -absCoord,  absCoord,  absCoord,

      // left side
       -absCoord,  absCoord, -absCoord,
       -absCoord, -absCoord,  absCoord,
       -absCoord,  absCoord,  absCoord,

       -absCoord,  absCoord, -absCoord,
       -absCoord, -absCoord, -absCoord,
       -absCoord, -absCoord,  absCoord,

      // bottom side
        absCoord, -absCoord, -absCoord,
       -absCoord,  absCoord, -absCoord,
        absCoord,  absCoord, -absCoord,

        absCoord, -absCoord, -absCoord,
       -absCoord, -absCoord, -absCoord,
       -absCoord,  absCoord, -absCoord,

      // top side
       -absCoord, -absCoord,  absCoord,
        absCoord,  absCoord,  absCoord,
       -absCoord,  absCoord,  absCoord,

       -absCoord, -absCoord,  absCoord,
        absCoord, -absCoord,  absCoord,
        absCoord,  absCoord,  absCoord
    ];
    this.verticesCount = verticesData.length / 3;
    this.vertices = verticesData;
  }

  public getVertices(): Array<number> {
    return this.vertices;
  }

  public getColors(): Array<number> {
    return this.colors;
  }

  public getVerticesCount(): number {
    return this.verticesCount;
  }

}
