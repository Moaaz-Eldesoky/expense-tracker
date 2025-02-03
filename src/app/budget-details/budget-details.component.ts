import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { ActivatedRoute } from '@angular/router';
import { BudgetCardComponent } from '../budget-card/budget-card.component';
import { ExpenseItemsComponent } from '../expense-items/expense-items.component';
import { BudgetExpenseService } from '../services/budget-expense.service';
import { budgetItem } from '../interfaces/budgetItem.interface';

@Component({
  selector: 'app-budget-details',
  imports: [
    CommonModule,
    AddExpenseComponent,
    BudgetCardComponent,
    ExpenseItemsComponent,
  ],
  templateUrl: './budget-details.component.html',
  styleUrl: './budget-details.component.scss',
})
export class BudgetDetailsComponent implements OnInit {
  cardId: any;
  currentbudget!: budgetItem | undefined;
  constructor(
    private route: ActivatedRoute,
    private budEX: BudgetExpenseService
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.cardId = +params['id']; // The '+' converts the string to a number
      this.budEX.budgetListSubject.subscribe(
        (budgets) =>
          (this.currentbudget = budgets.find((e) => e.id === this.cardId))
      );
    });
  }
}
