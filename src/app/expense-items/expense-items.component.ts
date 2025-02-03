import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { expense } from '../interfaces/expenseItem.interface';
import { BudgetExpenseService } from '../services/budget-expense.service';
import { budgetItem } from '../interfaces/budgetItem.interface';

@Component({
  selector: 'app-expense-items',
  imports: [CommonModule],
  templateUrl: './expense-items.component.html',
  styleUrl: './expense-items.component.scss',
})
export class ExpenseItemsComponent {
  @Input() detailsComp = false;
  ExpList: expense[] = [];
  budgetExpenses: expense[] = [];
  @Input() currentBudget!: budgetItem;

  constructor(private ExBud: BudgetExpenseService) {}
  ngOnInit() {
    this.loadExpenses();
    if (!this.detailsComp) {
      this.loadBudgetExpenses();
    }
  }
  ngOnChange(changes: SimpleChanges): void {
    console.log('ngOnChanges triggered');
    console.log('mooooooooooooooooo' + changes);
  }

  loadExpenses() {
    this.ExBud.expenseListSubject.subscribe(
      (expenses) => (this.ExpList = expenses)
    );
  }
  loadBudgetExpenses() {
    this.ExBud.expenseListSubject.subscribe(
      (expenses) =>
        (this.budgetExpenses = expenses.filter(
          (expense) => expense.budName == this.currentBudget.name
        ))
    );
  }
  removeItem(id: number) {
    this.ExpList = this.ExpList.filter((e) => e.id != id);
    this.ExBud.expenseListSubject.next(this.ExpList);
    console.log('from remove item' + JSON.stringify(this.ExpList));
    this.ExBud.updateExpenses();
    this.ExBud.calculate();
    this.ExBud.calcProgress();
  }
}
