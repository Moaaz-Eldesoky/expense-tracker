import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { BudgetCardComponent } from '../budget-card/budget-card.component';
import { ExpenseItemsComponent } from '../expense-items/expense-items.component';
import { budgetItem } from '../interfaces/budgetItem.interface';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { BudgetExpenseService } from '../services/budget-expense.service';
import { expense } from '../interfaces/expenseItem.interface';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddExpenseComponent,
    BudgetCardComponent,
    ExpenseItemsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  budgetList: budgetItem[] = [];
  expList: expense[] = [];

  constructor(private BudExp: BudgetExpenseService) {
    this.BudExp.budgetListSubject.subscribe(
      (budgets) => (this.budgetList = budgets)
    );
    this.BudExp.expenseListSubject.subscribe(
      (expenses) => (this.expList = expenses)
    );
  }

  createBudgetForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    amount: new FormControl('', [Validators.required]),
  });

  addBudget() {
    if (!this.createBudgetForm.errors) {
      const newBudget = {
        ...this.createBudgetForm.value,
        id: this.budgetList.length + 1,
        color: '#' + ((Math.random() * 0xffffff) << 0).toString(16),
        createdAt: new Date().toISOString(),
      };
      this.budgetList.push(newBudget);
      this.BudExp.budgetListSubject.next(this.budgetList);
      this.BudExp.updateBudgets();
      this.createBudgetForm.reset();
    }
  }

  updateEx(e: any) {
    this.expList = e;
    this.BudExp.expenseListSubject.next(this.expList);
    this.BudExp.updateExpenses();
  }
}
