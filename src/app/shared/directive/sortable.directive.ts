import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { sortableTypes } from '@app/models/sortableTypes';

//export type SortColumn = keyof sellingProduct | '';
export type SortColumn = keyof sortableTypes | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

export interface SortEvent {
	column: SortColumn;
	direction: SortDirection;
}


@Directive({
    selector: 'th[sortable]',
    host: {
        '[class.asc]': 'direction === "asc"',
        '[class.desc]': 'direction === "desc"',
        '(click)': 'rotate()',
    },
    standalone: true,
})
export class SortableDirective {

  @Input() sortable: SortColumn = '';
	@Input() direction: SortDirection = '';
	@Output() sort = new EventEmitter<SortEvent>();

	rotate() {
		this.direction = rotate[this.direction];
		this.sort.emit({ column: this.sortable, direction: this.direction });
	}
  constructor() { }

}
