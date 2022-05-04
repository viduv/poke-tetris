import {Pipe, PipeTransform} from '@angular/core';
import {Tile} from "../../../gameplay.service";

@Pipe({
  name: 'removeLockLines'
})
export class RemoveLockLinesPipe implements PipeTransform {

  transform(grid: Tile[] | null, lockLine: number): Tile[] {
    if (grid == null)
      return [];
    // console.log(grid.filter((value, id) => id >= lockLine * 10).fill({
    //   solid: true,
    //   color: "grey"
    // }, 20 * 10 - lockLine * 10, 20 * 10))
    return grid.filter((value, id) => id >= lockLine * 10).fill({
      solid: true,
      color: "grey"
    }, 20 * 10 - lockLine * 10, 20 * 10);
  }

}
