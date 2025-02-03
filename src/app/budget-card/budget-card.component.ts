import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { budgetItem } from '../interfaces/budgetItem.interface';
import { BudgetExpenseService } from '../services/budget-expense.service';

@Component({
  selector: 'app-budget-card',
  imports: [CommonModule],
  templateUrl: './budget-card.component.html',
  styleUrl: './budget-card.component.scss',
})
export class BudgetCardComponent implements OnInit {
  constructor(private router: Router, private budExp: BudgetExpenseService) {}
  @Input() viewDetailsBtn = false;
  @Input() deleteBudgetBtn = false;
  @Input() renameBudgetBtn = false;
  @Input() currentCard!: budgetItem;
  budgetList: budgetItem[] = [];
  disRename: boolean = true;

  viewDetails() {
    this.router.navigate(['/details', this.currentCard.id]);
  }
  @ViewChild('inputField', { static: false }) inputElement!: ElementRef;

  ngOnInit() {
    this.budExp.budgetListSubject.subscribe(
      (budgets) => (this.budgetList = budgets)
    );
    this.budExp.calcProgress();
  }
  activeRename() {
    this.disRename = false;
    setTimeout(() => {
      const input = this.inputElement.nativeElement;
      input.focus(); // Focus the input
    }, 10);
  }
  renameBudget(e: any) {
    this.budExp.BudExpRename(this.currentCard.name, e.value);
  }
  deleteBudget() {}
}
