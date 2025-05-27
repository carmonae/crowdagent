import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

interface TagI {
  tag: string;
}

@Component({
  selector: 'app-tag-project',
  templateUrl: './tag-project.component.html',
  styleUrls: ['./tag-project.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class TagProjectComponent implements OnInit {
  @Input() possibleTags: TagI[] = [];
  @Input() currentlySelectedTags: TagI[] = [];
  @Output() newTags: EventEmitter<TagI[]> = new EventEmitter<TagI[]>();

  public selectedItems: any[] = [];
  public tagsChecklistForm!: FormGroup;
  private theTags: any[] = [];

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log('tag-project.tag=', this.possibleTags);
    console.log(
      'tag-project.currentlySelectedTags=',
      this.currentlySelectedTags
    );
    this.tagsChecklistForm = this.fb.group({
      theTagControls: this.buildTags(),
    });
  }

  isChecked(tag: string): boolean {
    let result = false;
    if (this.currentlySelectedTags) {
      result =
        this.currentlySelectedTags.find((entry) => entry.tag == tag) !=
        undefined;
    }
    return result;
  }

  checkboxChanged(event: any): void {
    console.log(event);
    const tagName = event.target.name;
    let entry: number = -1;
    if (this.currentlySelectedTags) {
      entry = this.currentlySelectedTags.findIndex((entry) =>
        entry.tag ? entry.tag === tagName : false
      );
    }

    if (entry >= 0) {
      this.currentlySelectedTags.splice(entry, 1);
    } else {
      this.currentlySelectedTags.push({ tag: tagName });
    }
  }

  acceptTags(): void {
    this.newTags.emit(this.currentlySelectedTags);
    this.activeModal.close();
  }

  buildTags() {
    const arr: any = this.possibleTags.map((tag) => {
      return this.fb.control('false');
    });
    return this.fb.array(arr);
  }

  get getTags() {
    return this.tagsChecklistForm.get('theTags');
  }
}
