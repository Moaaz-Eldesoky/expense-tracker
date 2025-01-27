import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { budgetItem } from '../interfaces/budgetItem.interface';
import { expense } from '../interfaces/expenseItem.interface';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-expense',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss',
})
export class AddExpenseComponent {
  @Input() showCategoryList = false;
  @Input() budList: budgetItem[] = [];
  expense!: expense;
  @Output() newExpense: EventEmitter<expense> = new EventEmitter<expense>();
  expenseForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    budName: new FormControl('', [Validators.required]),
  });
  addExpense() {
    if (!this.expenseForm.errors) {
      this.expense = {
        ...this.expenseForm.value,
        color: this.budList.find(
          (e) => e.name == this.expenseForm.value.budName
        )?.color,
        createdAt: new Date().toISOString(),
        id: Math.floor(Math.random() * 1000000), // Generate a random ID for the expense
      };
      this.newExpense.emit(this.expense);
    }
    console.log(this.expense);
  }
}
