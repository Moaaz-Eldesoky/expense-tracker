import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { budgetItem } from '../interfaces/budgetItem.interface';
import { expense } from '../interfaces/expenseItem.interface';

@Component({
  selector: 'app-expense-items',
  imports: [CommonModule],
  templateUrl: './expense-items.component.html',
  styleUrl: './expense-items.component.scss',
})
export class ExpenseItemsComponent {
  cards: number[] = [1, 2, 3];
  @Input() showCat = false;
  @Input() currentItem!: budgetItem;
  @Input() ExpList: expense[] = [];
  @Output() updatedEx: EventEmitter<expense[]> = new EventEmitter();
  removeItem(id: number) {
    console.log('list before remove item is : ' + this.ExpList);
    this.ExpList = this.ExpList.filter((e) => e.id != id);
    this.updatedEx.emit(this.ExpList);
    console.log('list after remove item is : ' + this.ExpList);
  }
}
