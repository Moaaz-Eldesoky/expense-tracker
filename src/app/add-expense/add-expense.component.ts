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
import { BudgetExpenseService } from '../services/budget-expense.service';

@Component({
  selector: 'app-add-expense',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss',
})
export class AddExpenseComponent {
  @Input() detailsBudList = false;
  @Input() budgetName!: string;
  budgetList: budgetItem[] = [];
  expense!: expense;
  expenseForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    budName: new FormControl(
      '',
      this.detailsBudList ? [] : [Validators.required]
    ),
  });

  constructor(private BudExp: BudgetExpenseService) {}
  ngOnInit() {
    this.BudExp.budgetListSubject.subscribe(
      (budgets) => (this.budgetList = budgets)
    );
  }
  addExpense() {
    if (!this.expenseForm.errors) {
      if (
        this.BudExp.checkRemaining(
          this.expenseForm.get('budName')?.value
            ? this.expenseForm.get('budName')?.value
            : this.budgetName
        ) >= this.expenseForm.get('amount')?.value
      ) {
        this.expense = {
          ...this.expenseForm.value,
          budName: this.detailsBudList
            ? this.expenseForm.get('budName')?.value
            : this.budgetName,

          color: this.detailsBudList
            ? this.budgetList.find(
                (e) => e.name == this.expenseForm.get('budName')?.value
              )?.color
            : this.budgetList.find((e) => e.name == this.budgetName)?.color,
          createdAt: new Date().toISOString(),
          id: Math.floor(Math.random() * 1000000), // Generate a random ID for the expense
        };
        this.BudExp.expenseListSubject.next([
          ...this.BudExp.expenseListSubject.getValue(),
          this.expense,
        ]);
        this.BudExp.updateExpenses();
        this.BudExp.calculate();
        this.BudExp.calcProgress();
      } else {
        alert('Sorry the remaining budget is not enough');
      }
    }
  }
}
