import { Injectable } from '@angular/core';
import { budgetItem } from '../interfaces/budgetItem.interface';
import { expense } from '../interfaces/expenseItem.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BudgetExpenseService {
  budgetListSubject = new BehaviorSubject<budgetItem[]>([]);
  budgetList$ = this.budgetListSubject.asObservable();
  expenseListSubject = new BehaviorSubject<expense[]>([]);
  expenseList$ = this.expenseListSubject.asObservable();

  remaining!: number;

  tempbudgets: object[] = [];
  tempExpenses: object[] = [];
  constructor() {
    this.loadBudgets();
    this.loadExpenses();
    this.calculate();
  }

  updateBudgets() {
    let data = localStorage.getItem('budgets');
    if (data) {
      this.tempbudgets = JSON.parse(data);
    } else {
      this.tempbudgets = [];
    }
    this.budgetListSubject.getValue().forEach((item) => {
      if (!this.tempbudgets.some((tempItem: any) => tempItem.id === item.id)) {
        this.tempbudgets.push(item);
      }
    });
    localStorage.setItem('budgets', JSON.stringify(this.tempbudgets));
  }

  updateExpenses() {
    let data = localStorage.getItem('expenses');
    if (data) {
      this.tempExpenses = JSON.parse(data);
    } else {
      this.tempExpenses = [];
    }
    this.expenseListSubject.getValue().forEach((item) => {
      if (!this.tempExpenses.some((tempItem: any) => tempItem.id === item.id)) {
        this.tempExpenses.push(item);
      }
      this.tempExpenses = this.tempExpenses.filter((tempItem: any) =>
        this.expenseListSubject
          .getValue()
          .some((item) => item.id === tempItem.id)
      );
    });
    localStorage.setItem('expenses', JSON.stringify(this.tempExpenses));
    this.tempExpenses = [];
  }

  loadBudgets() {
    const data = localStorage.getItem('budgets');
    const budgets = data ? JSON.parse(data) : [];
    this.budgetListSubject.next(budgets);
  }
  loadExpenses() {
    const exData = localStorage.getItem('expenses');
    const expenses = exData ? JSON.parse(exData) : [];
    this.expenseListSubject.next(expenses);
  }
  calculate() {
    this.budgetListSubject.getValue().forEach((budget) => {
      const expenses = this.expenseListSubject
        .getValue()
        .filter((expense) => expense.budName === budget.name);
      const totalExpenses = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );
      budget.spent = totalExpenses;
    });
    localStorage.setItem(
      'budgets',
      JSON.stringify(this.budgetListSubject.getValue())
    );
  }

  BudExpRename(oldName: string, newName: string) {
    this.expenseListSubject.getValue().map((exp) => {
      if (exp.budName == oldName) {
        exp.budName = newName;
      }
    });
    localStorage.setItem(
      'expenses',
      JSON.stringify(this.expenseListSubject.getValue())
    );
    this.budgetListSubject.getValue().map((bud) => {
      if (bud.name == oldName) {
        bud.name = newName;
      }
      localStorage.setItem(
        'budgets',
        JSON.stringify(this.budgetListSubject.getValue())
      );
    });
  }

  checkRemaining(name: string) {
    const budSpent = this.budgetListSubject
      .getValue()
      .find((e) => e.name == name)?.spent;
    const budAmount = this.budgetListSubject
      .getValue()
      .find((e) => e.name == name)?.amount;
    const remain = (budAmount ?? 0) - (budSpent ?? 0);
    return remain;
  }
  calcProgress() {
    this.budgetListSubject.getValue().forEach((budget) => {
      const progressValue =
        ((budget?.spent ?? 0) / (budget?.amount ?? 1)) * 100;
      budget.progress = progressValue;
    });
  }
}
// need to update this function
