import { Injectable } from '@angular/core';
import { budgetItem } from '../interfaces/budgetItem.interface';
import { expense } from '../interfaces/expenseItem.interface';

@Injectable({
  providedIn: 'root',
})
export class BudgetExpenseService {
  budgetList: budgetItem[] = [];
  expenseList: expense[] = [];
  tempbudgets: object[] = [];
  tempExpenses: object[] = [];
  constructor() {}
  updateBudgets() {
    let data = localStorage.getItem('budgets');
    if (data) {
      this.tempbudgets = JSON.parse(data);
    } else {
      this.tempbudgets = [];
    }
    this.budgetList.forEach((item) => {
      if (!this.tempbudgets.some((tempItem: any) => tempItem.id === item.id)) {
        this.tempbudgets.push(item);
      }
    });
    localStorage.setItem('budgets', JSON.stringify(this.tempbudgets));
  }
  updataExpenses() {
    let data = localStorage.getItem('expenses');
    if (data) {
      this.tempExpenses = JSON.parse(data);
    } else {
      this.tempExpenses = [];
    }
    this.expenseList.forEach((item) => {
      if (!this.tempExpenses.some((tempItem: any) => tempItem.id === item.id)) {
        this.tempExpenses.push(item);
      }
      this.tempExpenses = this.tempExpenses.filter((tempItem: any) =>
        this.expenseList.some((item) => item.id === tempItem.id)
      );
    });
    localStorage.setItem('expenses', JSON.stringify(this.tempExpenses));
  }
  loadBudgets() {
    const data = localStorage.getItem('budgets');
    this.budgetList = data ? JSON.parse(data) : [];
    return this.budgetList;
  }
  loadExpenses() {
    const exData = localStorage.getItem('expenses');
    this.expenseList = exData ? JSON.parse(exData) : [];
    return this.expenseList;
  }
}

//update functions is not handel delete operations
